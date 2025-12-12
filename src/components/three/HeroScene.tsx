/**
 * @fileoverview Hero Scene 3D Component
 * @description Main 3D scene for the hero section with all visual elements
 */

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { ParticleField } from './ParticleField';
import { FloatingGeometry, FloatingTorus, FloatingOctahedron } from './FloatingGeometry';
import { GlowingSphere, OrbitRing } from './GlowingSphere';

interface HeroSceneProps {
    className?: string;
}

/**
 * Scene content component containing all 3D elements
 */
function SceneContent() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
            <pointLight position={[10, -10, 10]} intensity={0.3} color="#a855f7" />

            {/* Background particles */}
            <ParticleField count={2000} size={0.012} color="#6366f1" speed={0.2} />
            <ParticleField count={1000} size={0.008} color="#a855f7" speed={0.15} />

            {/* Central glowing sphere */}
            <GlowingSphere position={[0, 0, 0]} scale={0.8} color="#6366f1" pulseSpeed={0.8} />

            {/* Orbiting rings */}
            <OrbitRing radius={1.5} color="#6366f1" speed={0.5} tilt={0.3} />
            <OrbitRing radius={2} color="#a855f7" speed={-0.3} tilt={-0.5} />
            <OrbitRing radius={2.5} color="#06b6d4" speed={0.4} tilt={0.8} />

            {/* Floating geometric shapes */}
            <FloatingGeometry
                position={[-3, 1.5, -2]}
                scale={0.5}
                color="#a855f7"
                distort={0.4}
            />
            <FloatingGeometry
                position={[3, -1, -1]}
                scale={0.4}
                color="#06b6d4"
                wireframe
                distort={0.3}
            />
            <FloatingTorus position={[-2.5, -1.5, 1]} scale={0.3} color="#ec4899" />
            <FloatingOctahedron position={[2.5, 2, 0]} scale={0.35} color="#f97316" />

            {/* Environment for reflections */}
            <Environment preset="night" />
        </>
    );
}

/**
 * Loading fallback for Suspense
 */
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#6366f1" wireframe />
        </mesh>
    );
}

/**
 * Main Hero Scene component
 */
export function HeroScene({ className = '' }: HeroSceneProps) {
    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={60} />

                <Suspense fallback={<LoadingFallback />}>
                    <SceneContent />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
