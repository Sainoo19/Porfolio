/**
 * @fileoverview Glowing Sphere 3D Component
 * @description Animated sphere with glow effect for hero section
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface GlowingSphereProps {
    position?: [number, number, number];
    scale?: number;
    color?: string;
    pulseSpeed?: number;
}

/**
 * Glowing sphere with pulse animation
 */
export function GlowingSphere({
    position = [0, 0, 0],
    scale = 1,
    color = '#6366f1',
    pulseSpeed = 1,
}: GlowingSphereProps) {
    const sphereRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!sphereRef.current || !glowRef.current) return;

        const time = state.clock.elapsedTime;
        const pulse = Math.sin(time * pulseSpeed) * 0.1 + 1;

        sphereRef.current.scale.setScalar(scale * pulse);
        glowRef.current.scale.setScalar(scale * pulse * 1.5);
    });

    return (
        <group position={position}>
            {/* Inner sphere */}
            <Sphere ref={sphereRef} args={[1, 64, 64]}>
                <meshStandardMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* Outer glow */}
            <Sphere ref={glowRef} args={[1, 32, 32]}>
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </Sphere>
        </group>
    );
}

/**
 * Orbiting rings around a point
 */
export function OrbitRing({
    radius = 2,
    color = '#6366f1',
    speed = 1,
    tilt = 0,
}: {
    radius?: number;
    color?: string;
    speed?: number;
    tilt?: number;
}) {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!ringRef.current) return;
        ringRef.current.rotation.z = state.clock.elapsedTime * speed;
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2 + tilt, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
    );
}
