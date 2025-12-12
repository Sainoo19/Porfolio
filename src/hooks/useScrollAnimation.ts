/**
 * @fileoverview Scroll animation hook
 * @description Custom hook for triggering animations on scroll using Intersection Observer
 */

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    triggerOnce?: boolean;
    rootMargin?: string;
}

interface UseScrollAnimationReturn {
    ref: React.RefObject<HTMLDivElement | null>;
    isInView: boolean;
    hasAnimated: boolean;
}

/**
 * Custom hook for detecting when an element enters the viewport
 * @param options - Configuration options for the Intersection Observer
 * @returns Object containing ref, isInView state, and hasAnimated flag
 */
export function useScrollAnimation(
    options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
    const {
        threshold = 0.1,
        triggerOnce = true,
        rootMargin = '-50px',
    } = options;

    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;

            if (entry.isIntersecting) {
                setIsInView(true);
                setHasAnimated(true);
            } else if (!triggerOnce) {
                setIsInView(false);
            }
        },
        [triggerOnce]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Skip if already animated and triggerOnce is true
        if (triggerOnce && hasAnimated) return;

        const observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
        });

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, hasAnimated, handleIntersection]);

    return { ref, isInView, hasAnimated };
}
