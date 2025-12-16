/**
 * @fileoverview Mouse Trail Hook - Mecha Cyberpunk Style
 * @description Tracks mouse movement and creates HUD targeting particle trail effect
 */

import { useEffect, useRef, useState, useCallback } from 'react';

export interface Particle {
    id: number;
    x: number;
    y: number;
    opacity: number;
    size: number;
    type: 'hexagon' | 'reticle' | 'data' | 'spark';
    rotation: number;
}

const MAX_PARTICLES = 40;
const PARTICLE_LIFETIME = 900;
const MIN_DISTANCE = 5;

/**
 * Hook that tracks mouse movement and generates mecha HUD particle trail
 */
export function useMouseTrail() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const particleIdRef = useRef(0);
    const lastPositionRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    const createParticle = useCallback((x: number, y: number) => {
        // Randomly select particle type for variety
        const types: Particle['type'][] = ['hexagon', 'reticle', 'data', 'spark'];
        const type = types[Math.floor(Math.random() * types.length)];

        const newParticle: Particle = {
            id: particleIdRef.current++,
            x,
            y,
            opacity: 1,
            size: type === 'spark' ? Math.random() * 6 + 8 : Math.random() * 14 + 12,
            type,
            rotation: Math.random() * 360,
        };

        setParticles((prev) => {
            const updated = [...prev, newParticle];
            if (updated.length > MAX_PARTICLES) {
                return updated.slice(-MAX_PARTICLES);
            }
            return updated;
        });

        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, PARTICLE_LIFETIME);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            const dx = clientX - lastPositionRef.current.x;
            const dy = clientY - lastPositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > MIN_DISTANCE) {
                lastPositionRef.current = { x: clientX, y: clientY };

                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                }

                rafRef.current = requestAnimationFrame(() => {
                    createParticle(clientX, clientY);
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [createParticle]);

    return particles;
}
