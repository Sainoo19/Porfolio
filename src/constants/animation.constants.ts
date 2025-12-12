/**
 * @fileoverview Animation constants and variants
 * @description Reusable Framer Motion animation configurations
 */

import type { Variants, Transition } from 'framer-motion';

// ============================================
// TRANSITION PRESETS
// ============================================

export const SPRING_TRANSITION: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
};

export const SMOOTH_TRANSITION: Transition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96],
};

export const BOUNCE_TRANSITION: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
};

// ============================================
// ANIMATION VARIANTS
// ============================================

export const FADE_IN_VARIANTS: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: SMOOTH_TRANSITION,
    },
};

export const SLIDE_UP_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: SMOOTH_TRANSITION,
    },
};

export const SLIDE_DOWN_VARIANTS: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: SMOOTH_TRANSITION,
    },
};

export const SLIDE_LEFT_VARIANTS: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: SMOOTH_TRANSITION,
    },
};

export const SLIDE_RIGHT_VARIANTS: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: SMOOTH_TRANSITION,
    },
};

export const SCALE_VARIANTS: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: BOUNCE_TRANSITION,
    },
};

export const ROTATE_VARIANTS: Variants = {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: SPRING_TRANSITION,
    },
};

// ============================================
// STAGGER CONTAINER VARIANTS
// ============================================

export const STAGGER_CONTAINER_VARIANTS: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const STAGGER_FAST_VARIANTS: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const HOVER_SCALE = {
    scale: 1.05,
    transition: { duration: 0.2 },
};

export const HOVER_LIFT = {
    y: -8,
    transition: { duration: 0.3 },
};

export const HOVER_GLOW = {
    boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
    transition: { duration: 0.3 },
};

// ============================================
// TAP ANIMATIONS
// ============================================

export const TAP_SCALE = {
    scale: 0.95,
};

// ============================================
// PAGE TRANSITION VARIANTS
// ============================================

export const PAGE_VARIANTS: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

// ============================================
// TEXT ANIMATION VARIANTS
// ============================================

export const TEXT_REVEAL_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: 'easeOut',
        },
    }),
};

export const LETTER_ANIMATION_VARIANTS: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 200,
        },
    },
};

// ============================================
// 3D SCENE CONFIGURATIONS
// ============================================

export const DEFAULT_SCENE_CONFIG = {
    cameraPosition: [0, 0, 5] as [number, number, number],
    ambientLightIntensity: 0.5,
    enableOrbitControls: true,
    backgroundColor: '#0a0a0f',
};

export const PARTICLE_CONFIG = {
    count: 5000,
    size: 0.015,
    speed: 0.5,
    color: '#6366f1',
    opacity: 0.6,
};

// ============================================
// SCROLL TRIGGER CONFIGURATIONS
// ============================================

export const SCROLL_TRIGGER_CONFIG = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-50px',
};

export const SCROLL_TRIGGER_REPEAT_CONFIG = {
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: '-100px',
};
