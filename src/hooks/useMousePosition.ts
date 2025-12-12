/**
 * @fileoverview Mouse position hook
 * @description Track mouse position for interactive 3D effects and parallax
 */

import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
    x: number;
    y: number;
    normalizedX: number; // -1 to 1
    normalizedY: number; // -1 to 1
}

/**
 * Custom hook for tracking mouse position
 * @returns Current mouse position with normalized coordinates
 */
export function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
    });

    const handleMouseMove = useCallback((event: MouseEvent) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        setMousePosition({
            x: clientX,
            y: clientY,
            normalizedX: (clientX / innerWidth) * 2 - 1,
            normalizedY: -(clientY / innerHeight) * 2 + 1,
        });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return mousePosition;
}
