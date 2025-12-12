/**
 * @fileoverview Loading Screen Component
 * @description Animated loading screen shown on initial page load
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Full-screen loading animation
 */
export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        // Hide loading screen after animation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[200] bg-gray-950 flex flex-col items-center justify-center"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

                    {/* Animated logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative mb-8"
                    >
                        {/* Rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="w-24 h-24 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500"
                        />

                        {/* Inner ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-2 rounded-full border-4 border-transparent border-b-pink-500 border-l-indigo-400"
                        />

                        {/* Center text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.span
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                            >
                                NVT
                            </motion.span>
                        </div>
                    </motion.div>

                    {/* Loading text */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <p className="text-gray-400 text-sm mb-4">Loading portfolio...</p>

                        {/* Progress bar */}
                        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            />
                        </div>

                        {/* Percentage */}
                        <motion.p
                            className="text-indigo-400 text-xs mt-2 font-mono"
                        >
                            {Math.min(Math.round(progress), 100)}%
                        </motion.p>
                    </motion.div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * 400 - 200,
                                y: Math.random() * 400 - 200,
                                opacity: 0
                            }}
                            animate={{
                                y: [null, Math.random() * -100 - 50],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                            className="absolute w-2 h-2 rounded-full bg-indigo-400/50"
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
