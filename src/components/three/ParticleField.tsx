/**
 * @fileoverview Particle Field 3D Component
 * @description Animated particle system for background effects
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    size?: number;
    color?: string;
    speed?: number;
}

/**
 * 3D Particle field component with animated floating particles
 */
export function ParticleField({
    count = 3000,
    size = 0.015,
    color = '#6366f1',
    speed = 0.3,
}: ParticleFieldProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate particle positions
    const { positions, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Random positions in a sphere
            const radius = Math.random() * 10 + 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Random velocities
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        return { positions, velocities };
    }, [count]);

    // Animation loop
    useFrame((state) => {
        if (!pointsRef.current) return;

        const positionArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
        const time = state.clock.elapsedTime * speed;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Add wave motion
            positionArray[i3] += Math.sin(time + i * 0.01) * 0.001;
            positionArray[i3 + 1] += Math.cos(time + i * 0.01) * 0.001;
            positionArray[i3 + 2] += Math.sin(time + i * 0.02) * 0.001;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        pointsRef.current.rotation.y = time * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}
