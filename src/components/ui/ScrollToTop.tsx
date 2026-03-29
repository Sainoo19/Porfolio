/**
 * @fileoverview Scroll To Top Button Component - Mecha HUD Navigation
 * @description Floating button to scroll back to top with HUD styling
 */

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/**
 * Floating scroll to top button - HUD style
 */
export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 400 !== isVisible) {
            setIsVisible(latest > 400);
        }
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-4 bg-cyan-500/12 border border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/35 hover:bg-cyan-500/20 transition-all group backdrop-blur-sm"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                    aria-label="Scroll to top"
                >
                    <ArrowUp
                        size={24}
                        className="group-hover:-translate-y-1 transition-transform"
                    />

                    {/* Pulse ring effect */}
                    <span
                        className="absolute inset-0 bg-cyan-400/12 animate-ping"
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    />

                    {/* Glow effect */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                        animate={{
                            boxShadow: [
                                '0 0 0 0 rgba(34, 211, 238, 0.28)',
                                '0 0 0 10px rgba(34, 211, 238, 0)',
                            ],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
