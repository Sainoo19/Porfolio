/**
 * @fileoverview Hero Scene 3D Component
 * @description Main 3D scene for the hero section with all visual elements
 */

import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ParticleField } from './ParticleField';
import { FloatingGeometry, FloatingTorus, FloatingOctahedron } from './FloatingGeometry';
import { GlowingSphere, OrbitRing } from './GlowingSphere';

interface HeroSceneProps {
    className?: string;
}

function HelmetCameraFeedOverlay() {
    return (
        <div className="pointer-events-none absolute inset-0 z-20">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-mono text-cyan-300 border border-cyan-500/40 bg-slate-950/55 backdrop-blur-sm"
                style={{ clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)' }}>
                MAIN_CAMERA_FEED :: PILOT_HELMET_LINK ONLINE
            </div>

            <div className="absolute left-1/2 top-1/2 w-56 h-56 md:w-72 md:h-72 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 border border-cyan-400/35" style={{ clipPath: 'polygon(18% 0, 82% 0, 100% 18%, 100% 82%, 82% 100%, 18% 100%, 0 82%, 0 18%)' }} />
                <div className="absolute inset-6 border border-magenta-400/20" style={{ clipPath: 'polygon(16% 0, 84% 0, 100% 16%, 100% 84%, 84% 100%, 16% 100%, 0 84%, 0 16%)' }} />
                <div className="absolute left-1/2 top-1/2 w-24 h-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
                <div className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent" />
                <div className="absolute left-1/2 top-[62%] -translate-x-1/2 text-[9px] font-mono text-cyan-300/70 tracking-wider">AIM ASSIST / CALIBRATED</div>
            </div>

            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M 9% 10% L 16% 10% L 16% 14%" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="2" fill="none" />
                <path d="M 91% 10% L 84% 10% L 84% 14%" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="2" fill="none" />
                <path d="M 9% 90% L 16% 90% L 16% 86%" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="2" fill="none" />
                <path d="M 91% 90% L 84% 90% L 84% 86%" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="2" fill="none" />
            </svg>

            <div className="absolute left-6 bottom-6 text-[9px] font-mono text-cyan-300/75">
                <div>VISOR_LATENCY: 3.2ms</div>
                <div>ENV_LIGHT_COMP: ON</div>
                <div>TARGET_PREDICTION: ACTIVE</div>
            </div>

            <motion.div
                className="absolute left-0 right-0 h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.75), transparent)',
                    boxShadow: '0 0 14px rgba(34, 211, 238, 0.5)',
                }}
                animate={{ top: ['15%', '82%', '15%'], opacity: [0, 0.9, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.2) 2px, rgba(34, 211, 238, 0.2) 3px)',
                }}
            />
        </div>
    );
}

/**
 * Subtle cockpit head movement to simulate pilot helmet camera motion.
 */
function PilotCameraRig() {
    useFrame(({ clock, camera }) => {
        const t = clock.getElapsedTime();
        camera.position.x = Math.sin(t * 0.18) * 0.08;
        camera.position.y = Math.cos(t * 0.24) * 0.06;
        camera.position.z = 6;
        camera.rotation.y = Math.sin(t * 0.15) * 0.02;
        camera.rotation.x = Math.cos(t * 0.12) * 0.015;
    });

    return null;
}

/**
 * Scene content component containing all 3D elements
 */
function SceneContent() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.25} />
            <directionalLight position={[8, 10, 6]} intensity={0.9} color="#d1f5ff" />
            <pointLight position={[-8, 4, -8]} intensity={0.45} color="#22d3ee" />
            <pointLight position={[10, -6, 8]} intensity={0.35} color="#d946ef" />

            {/* Background particles */}
            <ParticleField count={1800} size={0.012} color="#22d3ee" speed={0.2} />
            <ParticleField count={900} size={0.008} color="#d946ef" speed={0.15} />

            {/* Central glowing sphere */}
            <GlowingSphere position={[0, 0, 0]} scale={0.75} color="#22d3ee" pulseSpeed={0.75} />

            {/* Orbiting rings */}
            <OrbitRing radius={1.5} color="#22d3ee" speed={0.45} tilt={0.3} />
            <OrbitRing radius={2} color="#d946ef" speed={-0.3} tilt={-0.5} />
            <OrbitRing radius={2.5} color="#67e8f9" speed={0.35} tilt={0.8} />

            {/* Floating geometric shapes */}
            <FloatingGeometry
                position={[-3, 1.5, -2]}
                scale={0.5}
                color="#22d3ee"
                distort={0.4}
            />
            <FloatingGeometry
                position={[3, -1, -1]}
                scale={0.4}
                color="#d946ef"
                wireframe
                distort={0.3}
            />
            <FloatingTorus position={[-2.5, -1.5, 1]} scale={0.3} color="#67e8f9" />
            <FloatingOctahedron position={[2.5, 2, 0]} scale={0.35} color="#c084fc" />

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
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={55} />
                <PilotCameraRig />

                <Suspense fallback={<LoadingFallback />}>
                    <SceneContent />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                    autoRotate={false}
                    maxPolarAngle={Math.PI / 1.45}
                    minPolarAngle={Math.PI / 2.6}
                />
            </Canvas>

            {/* Helmet visor overlays to make the scene feel like an in-cockpit POV */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0) 42%, rgba(2,6,23,0.72) 100%)' }} />
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-950/95 via-slate-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent" />
                <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-slate-950/85 to-transparent" />
                <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-slate-950/85 to-transparent" />
            </div>

            <HelmetCameraFeedOverlay />
        </div>
    );
}
