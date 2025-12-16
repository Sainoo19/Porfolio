/**
 * @fileoverview Mouse Trail Hook - Mecha Cyberpunk Style
 * @description Tracks mouse movement and creates HUD targeting particle trail effect
 * @optimizations Throttled updates, reduced re-renders, cleanup on unmount
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

// Configuration - reduced for better performance
const MAX_PARTICLES = 25;
const PARTICLE_LIFETIME = 700;
const MIN_DISTANCE = 12;
const THROTTLE_MS = 16; // ~60fps

/**
 * Hook that tracks mouse movement and generates mecha HUD particle trail
 * Optimized with throttling and reduced particle count
 */
export function useMouseTrail() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const particleIdRef = useRef(0);
    const lastPositionRef = useRef({ x: 0, y: 0 });
    const lastTimeRef = useRef(0);
    const cleanupTimersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

    // Batch cleanup function
    const scheduleCleanup = useCallback((particleId: number) => {
        const timer = setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== particleId));
            cleanupTimersRef.current.delete(timer);
        }, PARTICLE_LIFETIME);
        cleanupTimersRef.current.add(timer);
    }, []);

    const createParticle = useCallback((x: number, y: number) => {
        // Randomly select particle type for variety
        const types: Particle['type'][] = ['hexagon', 'reticle', 'data', 'spark'];
        const type = types[Math.floor(Math.random() * types.length)];

        const newParticle: Particle = {
            id: particleIdRef.current++,
            x,
            y,
            opacity: 1,
            size: type === 'spark' ? Math.random() * 5 + 6 : Math.random() * 10 + 10,
            type,
            rotation: Math.random() * 360,
        };

        setParticles((prev) => {
            const updated = [...prev, newParticle];
            // Keep only recent particles
            return updated.length > MAX_PARTICLES ? updated.slice(-MAX_PARTICLES) : updated;
        });

        scheduleCleanup(newParticle.id);
    }, [scheduleCleanup]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = performance.now();

            // Throttle updates
            if (now - lastTimeRef.current < THROTTLE_MS) return;

            const { clientX, clientY } = e;
            const dx = clientX - lastPositionRef.current.x;
            const dy = clientY - lastPositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > MIN_DISTANCE) {
                lastPositionRef.current = { x: clientX, y: clientY };
                lastTimeRef.current = now;
                createParticle(clientX, clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            // Cleanup all pending timers
            cleanupTimersRef.current.forEach(timer => clearTimeout(timer));
            cleanupTimersRef.current.clear();
        };
    }, [createParticle]);

    return particles;
}
