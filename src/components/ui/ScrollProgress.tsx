/**
 * @fileoverview Scroll Progress Bar Component - Mecha HUD Navigation
 * @description Animated progress bar showing scroll position with HUD styling
 */

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Scroll progress bar - HUD style targeting indicator
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            {/* Main progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-magenta-500 origin-left z-[100]"
                style={{ scaleX }}
            />
            {/* Glow effect */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-cyan-500/50 via-cyan-400/50 to-magenta-500/50 origin-left z-[99] blur-sm"
                style={{ scaleX }}
            />
        </>
    );
}
