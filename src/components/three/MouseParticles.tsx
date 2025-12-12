/**
 * @fileoverview Mouse Particles Component
 * @description Renders animated smoke/particle trail following mouse movement
 */

import { motion } from 'framer-motion';
import { useMouseTrail } from '../../hooks/useMouseTrail';

/**
 * Component that renders mouse trail particles with smoke effect
 */
export function MouseParticles() {
    const particles = useMouseTrail();

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        x: particle.x - particle.size / 2,
                        y: particle.y - particle.size / 2,
                        scale: 1,
                        opacity: 0.8,
                    }}
                    animate={{
                        y: particle.y - 60 - Math.random() * 40,
                        x: particle.x + (Math.random() - 0.5) * 60,
                        scale: 2.5,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1.2,
                        ease: 'easeOut',
                    }}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size * 3,
                        height: particle.size * 3,
                        background: `radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(99, 102, 241, 0.3) 40%, transparent 70%)`,
                        filter: 'blur(4px)',
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
                    }}
                />
            ))}

            {/* Secondary smaller particles for depth */}
            {particles.map((particle) => (
                <motion.div
                    key={`small-${particle.id}`}
                    initial={{
                        x: particle.x - particle.size / 4,
                        y: particle.y - particle.size / 4,
                        scale: 1,
                        opacity: 1,
                    }}
                    animate={{
                        y: particle.y - 40 - Math.random() * 30,
                        x: particle.x + (Math.random() - 0.5) * 40,
                        scale: 0,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                    }}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size * 1.5,
                        height: particle.size * 1.5,
                        background: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(167, 139, 250, 0.4) 50%, transparent 70%)`,
                        filter: 'blur(2px)',
                    }}
                />
            ))}
        </div>
    );
}
