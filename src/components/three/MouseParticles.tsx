/**
 * @fileoverview Mouse Particles Component - Mecha Cyberpunk HUD Style
 * @description Renders animated HUD targeting particles following mouse movement
 */

import { motion } from 'framer-motion';
import { useMouseTrail, Particle } from '../../hooks/useMouseTrail';

/**
 * Hexagon particle - like mecha armor fragment
 */
function HexagonParticle({ particle }: { particle: Particle }) {
    return (
        <motion.div
            initial={{
                x: particle.x - particle.size / 2,
                y: particle.y - particle.size / 2,
                scale: 1,
                opacity: 0.9,
                rotate: particle.rotation,
            }}
            animate={{
                y: particle.y - 30 - Math.random() * 20,
                x: particle.x + (Math.random() - 0.5) * 40,
                scale: 0.3,
                opacity: 0,
                rotate: particle.rotation + 90,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute"
            style={{ width: particle.size, height: particle.size }}
        >
            <svg viewBox="0 0 24 24" className="w-full h-full">
                <polygon
                    points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.8)"
                    strokeWidth="1.5"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))' }}
                />
            </svg>
        </motion.div>
    );
}

/**
 * Targeting reticle particle
 */
function ReticleParticle({ particle }: { particle: Particle }) {
    return (
        <motion.div
            initial={{
                x: particle.x - particle.size / 2,
                y: particle.y - particle.size / 2,
                scale: 1.2,
                opacity: 0.8,
                rotate: 0,
            }}
            animate={{
                scale: 0.5,
                opacity: 0,
                rotate: 45,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute"
            style={{ width: particle.size, height: particle.size }}
        >
            <svg viewBox="0 0 24 24" className="w-full h-full">
                {/* Outer brackets */}
                <path d="M4 4 L4 8 M4 4 L8 4" stroke="rgba(217, 70, 239, 0.9)" strokeWidth="1.5" fill="none" />
                <path d="M20 4 L20 8 M20 4 L16 4" stroke="rgba(217, 70, 239, 0.9)" strokeWidth="1.5" fill="none" />
                <path d="M4 20 L4 16 M4 20 L8 20" stroke="rgba(217, 70, 239, 0.9)" strokeWidth="1.5" fill="none" />
                <path d="M20 20 L20 16 M20 20 L16 20" stroke="rgba(217, 70, 239, 0.9)" strokeWidth="1.5" fill="none" />
                {/* Center cross */}
                <line x1="12" y1="8" x2="12" y2="16" stroke="rgba(34, 211, 238, 0.7)" strokeWidth="1" />
                <line x1="8" y1="12" x2="16" y2="12" stroke="rgba(34, 211, 238, 0.7)" strokeWidth="1" />
                {/* Center dot */}
                <circle cx="12" cy="12" r="1.5" fill="rgba(34, 211, 238, 0.9)" />
            </svg>
        </motion.div>
    );
}

/**
 * Data fragment particle - like HUD data streaming
 */
function DataParticle({ particle }: { particle: Particle }) {
    const chars = ['0', '1', '>', '<', '/', '|', '_'];
    const char = chars[Math.floor(Math.random() * chars.length)];

    return (
        <motion.div
            initial={{
                x: particle.x,
                y: particle.y,
                opacity: 1,
            }}
            animate={{
                y: particle.y - 50,
                opacity: 0,
            }}
            transition={{ duration: 0.4, ease: 'linear' }}
            className="absolute font-mono text-cyan-400 text-xs"
            style={{
                textShadow: '0 0 6px rgba(34, 211, 238, 0.8)',
                fontSize: particle.size * 0.8,
            }}
        >
            {char}
        </motion.div>
    );
}

/**
 * Energy spark particle
 */
function SparkParticle({ particle }: { particle: Particle }) {
    const isCyan = Math.random() > 0.5;

    return (
        <motion.div
            initial={{
                x: particle.x,
                y: particle.y,
                scale: 1,
                opacity: 1,
            }}
            animate={{
                x: particle.x + (Math.random() - 0.5) * 60,
                y: particle.y + (Math.random() - 0.5) * 60,
                scale: 0,
                opacity: 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
                width: particle.size,
                height: particle.size,
                background: isCyan ? 'rgba(34, 211, 238, 1)' : 'rgba(217, 70, 239, 1)',
                boxShadow: isCyan
                    ? '0 0 8px rgba(34, 211, 238, 0.8), 0 0 16px rgba(34, 211, 238, 0.4)'
                    : '0 0 8px rgba(217, 70, 239, 0.8), 0 0 16px rgba(217, 70, 239, 0.4)',
            }}
        />
    );
}

/**
 * Component that renders mecha HUD style mouse trail particles
 */
export function MouseParticles() {
    const particles = useMouseTrail();

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {particles.map((particle) => {
                switch (particle.type) {
                    case 'hexagon':
                        return <HexagonParticle key={particle.id} particle={particle} />;
                    case 'reticle':
                        return <ReticleParticle key={particle.id} particle={particle} />;
                    case 'data':
                        return <DataParticle key={particle.id} particle={particle} />;
                    case 'spark':
                        return <SparkParticle key={particle.id} particle={particle} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}
