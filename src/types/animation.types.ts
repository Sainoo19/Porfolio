/**
 * @fileoverview Animation type definitions
 * @description Types for Framer Motion animations and 3D scene configurations
 */

import type { Variants, Transition } from 'framer-motion';

export interface AnimationConfig {
    readonly initial: string;
    readonly animate: string;
    readonly exit?: string;
    readonly variants: Variants;
    readonly transition?: Transition;
}

export interface ScrollAnimationConfig {
    readonly threshold: number;
    readonly triggerOnce?: boolean;
    readonly rootMargin?: string;
}

export interface ParticleConfig {
    readonly count: number;
    readonly size: number;
    readonly speed: number;
    readonly color: string;
    readonly opacity: number;
}

export interface Scene3DConfig {
    readonly cameraPosition: [number, number, number];
    readonly ambientLightIntensity: number;
    readonly enableOrbitControls: boolean;
    readonly backgroundColor: string;
}

export type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';

export interface StaggerConfig {
    readonly staggerChildren: number;
    readonly delayChildren?: number;
}
