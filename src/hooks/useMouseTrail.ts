/**
 * @fileoverview Mouse Trail Hook
 * @description Tracks mouse movement and creates particle trail effect
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    opacity: number;
    size: number;
}

const MAX_PARTICLES = 30;
const PARTICLE_LIFETIME = 1200;
const MIN_DISTANCE = 3;

/**
 * Hook that tracks mouse movement and generates particles for smoke trail effect
 */
export function useMouseTrail() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const particleIdRef = useRef(0);
    const lastPositionRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    const createParticle = useCallback((x: number, y: number) => {
        const newParticle: Particle = {
            id: particleIdRef.current++,
            x,
            y,
            opacity: 1,
            size: Math.random() * 8 + 4,
        };

        setParticles((prev) => {
            const updated = [...prev, newParticle];
            // Keep only the last MAX_PARTICLES
            if (updated.length > MAX_PARTICLES) {
                return updated.slice(-MAX_PARTICLES);
            }
            return updated;
        });

        // Auto-remove particle after lifetime
        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, PARTICLE_LIFETIME);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Calculate distance from last position
            const dx = clientX - lastPositionRef.current.x;
            const dy = clientY - lastPositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Create particle if moved enough distance
            if (distance > MIN_DISTANCE) {
                lastPositionRef.current = { x: clientX, y: clientY };

                // Use RAF for smooth animation
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
