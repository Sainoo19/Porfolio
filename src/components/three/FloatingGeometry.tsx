/**
 * @fileoverview Floating Geometry 3D Component
 * @description Animated 3D geometric shapes with rotation and floating effects
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
    position?: [number, number, number];
    scale?: number;
    color?: string;
    wireframe?: boolean;
    distort?: number;
    speed?: number;
}

/**
 * Floating 3D geometry with distortion effects
 */
export function FloatingGeometry({
    position = [0, 0, 0],
    scale = 1,
    color = '#6366f1',
    wireframe = false,
    distort = 0.3,
    speed = 2,
}: FloatingGeometryProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
        meshRef.current.rotation.y += 0.005;
    });

    return (
        <Float
            speed={speed}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            floatingRange={[-0.1, 0.1]}
        >
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshDistortMaterial
                    color={color}
                    wireframe={wireframe}
                    distort={distort}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

/**
 * Floating Torus geometry
 */
export function FloatingTorus({
    position = [0, 0, 0],
    scale = 1,
    color = '#a855f7',
}: FloatingGeometryProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        meshRef.current.rotation.x = time * 0.5;
        meshRef.current.rotation.y = time * 0.3;
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <torusGeometry args={[1, 0.3, 16, 100]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}

/**
 * Floating Octahedron geometry
 */
export function FloatingOctahedron({
    position = [0, 0, 0],
    scale = 1,
    color = '#06b6d4',
}: FloatingGeometryProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.elapsedTime;
        meshRef.current.rotation.x = time * 0.4;
        meshRef.current.rotation.z = time * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    wireframe
                    metalness={0.7}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    );
}
