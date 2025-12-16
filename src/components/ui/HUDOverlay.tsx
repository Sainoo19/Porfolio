/**
 * @fileoverview HUD Overlay Component
 * @description Creates pilot helmet HUD effect overlay
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function HUDOverlay() {
    const [time, setTime] = useState(new Date());
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        }).toUpperCase();
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {/* Top left corner bracket */}
            <div className="absolute top-4 left-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path
                        d="M0 30 L0 0 L30 0"
                        stroke="rgba(34, 211, 238, 0.5)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M10 20 L10 10 L20 10"
                        stroke="rgba(34, 211, 238, 0.3)"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
                <div className="absolute top-8 left-8 text-xs font-mono text-cyan-400/60">
                    <div>SYS_ONLINE</div>
                    <div className="text-green-400/80">● ACTIVE</div>
                </div>
            </div>

            {/* Top right corner bracket */}
            <div className="absolute top-4 right-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path
                        d="M80 30 L80 0 L50 0"
                        stroke="rgba(34, 211, 238, 0.5)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M70 20 L70 10 L60 10"
                        stroke="rgba(34, 211, 238, 0.3)"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
                <div className="absolute top-8 right-8 text-xs font-mono text-cyan-400/60 text-right">
                    <div>{formatDate(time)}</div>
                    <motion.div
                        className="text-cyan-400"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        {formatTime(time)}
                    </motion.div>
                </div>
            </div>

            {/* Bottom left corner bracket */}
            <div className="absolute bottom-4 left-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path
                        d="M0 50 L0 80 L30 80"
                        stroke="rgba(34, 211, 238, 0.5)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M10 60 L10 70 L20 70"
                        stroke="rgba(34, 211, 238, 0.3)"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
                <div className="absolute bottom-8 left-8 text-xs font-mono text-cyan-400/60">
                    <div>SCROLL_Y</div>
                    <div className="text-magenta-400">{Math.round(scrollY)}px</div>
                </div>
            </div>

            {/* Bottom right corner bracket */}
            <div className="absolute bottom-4 right-4">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path
                        d="M80 50 L80 80 L50 80"
                        stroke="rgba(34, 211, 238, 0.5)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <path
                        d="M70 60 L70 70 L60 70"
                        stroke="rgba(34, 211, 238, 0.3)"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>
                <div className="absolute bottom-8 right-8 text-xs font-mono text-cyan-400/60 text-right">
                    <div>UNIT_NVT</div>
                    <div className="text-green-400">OPERATIONAL</div>
                </div>
            </div>

            {/* Center targeting reticle (subtle) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                <motion.svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="rgba(34, 211, 238, 0.3)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="10 5"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="30"
                        stroke="rgba(217, 70, 239, 0.3)"
                        strokeWidth="1"
                        fill="none"
                    />
                    <line x1="60" y1="0" x2="60" y2="20" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1" />
                    <line x1="60" y1="100" x2="60" y2="120" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="20" y2="60" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1" />
                    <line x1="100" y1="60" x2="120" y2="60" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="1" />
                </motion.svg>
            </div>

            {/* Left side data stream */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="flex flex-col gap-1 text-[10px] font-mono text-cyan-400/40">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0.2 }}
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        >
                            {`0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right side status indicators */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="flex flex-col gap-2 text-[10px] font-mono">
                    {['PWR', 'NET', 'SYS', 'MEM'].map((label, i) => (
                        <div key={label} className="flex items-center gap-2">
                            <span className="text-cyan-400/40">{label}</span>
                            <motion.div
                                className="w-12 h-1 bg-gray-800 rounded overflow-hidden"
                                initial={{ opacity: 0.5 }}
                            >
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500"
                                    animate={{ width: ['60%', '90%', '70%', '85%'] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scan line effect */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,10,16,0.4)_100%)]" />
        </div>
    );
}
