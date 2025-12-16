import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Boot sequence messages
const BOOT_SEQUENCE = [
    { text: '> HELMET INTERFACE DETECTED...', delay: 0, type: 'system' },
    { text: '> NEURAL LINK ESTABLISHING...', delay: 300, type: 'system' },
    { text: '> PILOT VITALS: OK', delay: 600, type: 'success' },
    { text: '> SYNCHRONIZATION RATE: 95.7%', delay: 900, type: 'data' },
    { text: '> LOADING COMBAT PROTOCOLS...', delay: 1200, type: 'system' },
    { text: '> REACTOR ONLINE', delay: 1500, type: 'success' },
    { text: '> WEAPONS SYSTEMS: ARMED', delay: 1700, type: 'warning' },
    { text: '> TARGETING ARRAY: CALIBRATED', delay: 1900, type: 'success' },
    { text: '> THRUSTER CHECK: NOMINAL', delay: 2100, type: 'success' },
    { text: '> ALL SYSTEMS OPERATIONAL', delay: 2400, type: 'success' },
    { text: '> WELCOME, PILOT', delay: 2700, type: 'highlight' },
];

// System stats that appear on the sides
const SYSTEM_STATS = [
    { label: 'CORE TEMP', value: '62°C', position: 'left' },
    { label: 'POWER OUTPUT', value: '145%', position: 'left' },
    { label: 'ARMOR INTEGRITY', value: '100%', position: 'left' },
    { label: 'SHIELD STATUS', value: 'ACTIVE', position: 'left' },
    { label: 'SYNC RATE', value: '95.7%', position: 'right' },
    { label: 'NEURAL LOAD', value: '47%', position: 'right' },
    { label: 'AMMO RESERVE', value: 'FULL', position: 'right' },
    { label: 'FUEL CELLS', value: '98%', position: 'right' },
];

export function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [showStats, setShowStats] = useState(false);
    const [showHUD, setShowHUD] = useState(false);

    useEffect(() => {
        // Show boot messages sequentially
        BOOT_SEQUENCE.forEach((msg, index) => {
            setTimeout(() => {
                setVisibleMessages(prev => [...prev, index]);
            }, msg.delay);
        });

        // Show stats after initial messages
        setTimeout(() => setShowStats(true), 800);

        // Show HUD elements
        setTimeout(() => setShowHUD(true), 1200);

        // Progress bar
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 8;
            });
        }, 100);

        // Hide loading screen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    const getMessageColor = (type: string) => {
        switch (type) {
            case 'success': return 'text-green-400';
            case 'warning': return 'text-yellow-400';
            case 'data': return 'text-magenta-400';
            case 'highlight': return 'text-cyan-300 font-bold text-lg';
            default: return 'text-cyan-500';
        }
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 bg-black z-50 overflow-hidden"
                >
                    {/* Scan line effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)'
                        }}
                    />

                    {/* Helmet visor effect - darkening at edges */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
                        }}
                    />

                    {/* Top HUD bar */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-16 border-b border-cyan-500/30 bg-gradient-to-b from-cyan-950/40 to-transparent"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="flex justify-between items-center h-full px-6">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="w-3 h-3 rounded-full bg-green-400"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span className="text-cyan-500/70 text-xs font-mono">SYSTEM BOOT</span>
                            </div>
                            <div className="text-cyan-400 text-xs font-mono">
                                RX-0 UNICORN
                            </div>
                            <div className="text-cyan-500/70 text-xs font-mono">
                                {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </motion.div>

                    {/* Left side stats panel */}
                    <AnimatePresence>
                        {showStats && (
                            <motion.div
                                className="absolute left-4 top-24 w-48"
                                initial={{ x: -200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm p-3"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
                                >
                                    <div className="text-[10px] font-mono text-cyan-500/60 mb-3 tracking-wider">[MECH_STATUS]</div>
                                    <div className="space-y-2">
                                        {SYSTEM_STATS.filter(s => s.position === 'left').map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                className="flex justify-between items-center"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1 + i * 0.15 }}
                                            >
                                                <span className="text-[10px] font-mono text-gray-500">{stat.label}</span>
                                                <span className="text-[11px] font-mono text-cyan-400">{stat.value}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Right side stats panel */}
                    <AnimatePresence>
                        {showStats && (
                            <motion.div
                                className="absolute right-4 top-24 w-48"
                                initial={{ x: 200, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="border border-magenta-500/30 bg-magenta-950/20 backdrop-blur-sm p-3"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
                                >
                                    <div className="text-[10px] font-mono text-magenta-500/60 mb-3 tracking-wider text-right">[PILOT_STATUS]</div>
                                    <div className="space-y-2">
                                        {SYSTEM_STATS.filter(s => s.position === 'right').map((stat, i) => (
                                            <motion.div
                                                key={stat.label}
                                                className="flex justify-between items-center"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1 + i * 0.15 }}
                                            >
                                                <span className="text-[10px] font-mono text-gray-500">{stat.label}</span>
                                                <span className="text-[11px] font-mono text-magenta-400">{stat.value}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Center boot console */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-[500px] max-w-[90vw]"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Mech unit identifier */}
                            <motion.div
                                className="text-center mb-6"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="text-cyan-500/50 text-xs font-mono tracking-[0.3em] mb-2">FEDERAL FORCES</div>
                                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-magenta-400 font-['Orbitron'] tracking-wider">
                                    RX-0 UNICORN
                                </div>
                                <div className="text-magenta-400/70 text-sm font-mono mt-1">FULL PSYCHO-FRAME PROTOTYPE</div>
                            </motion.div>

                            {/* Boot terminal */}
                            <div
                                className="border border-cyan-500/40 bg-black/80 backdrop-blur-sm p-4 font-mono text-sm"
                                style={{ clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))' }}
                            >
                                <div className="h-48 overflow-hidden">
                                    {BOOT_SEQUENCE.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            className={`${getMessageColor(msg.type)} mb-1`}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={visibleMessages.includes(index) ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {msg.text}
                                            {visibleMessages.includes(index) && index === visibleMessages.length - 1 && (
                                                <motion.span
                                                    className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                                                    animate={{ opacity: [1, 0] }}
                                                    transition={{ duration: 0.5, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Progress section */}
                            <motion.div
                                className="mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex justify-between text-xs font-mono text-cyan-500/70 mb-2">
                                    <span>BOOT SEQUENCE</span>
                                    <span>{Math.min(100, Math.round(progress))}%</span>
                                </div>
                                <div className="h-2 bg-gray-900 border border-cyan-500/30 overflow-hidden"
                                    style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                                >
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-magenta-500"
                                        style={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>

                                {/* Sub-progress bars */}
                                <div className="grid grid-cols-4 gap-2 mt-3">
                                    {['CORE', 'NEURAL', 'WEAPON', 'THRUST'].map((system, i) => (
                                        <motion.div
                                            key={system}
                                            className="text-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 1.5 + i * 0.2 }}
                                        >
                                            <div className="text-[8px] font-mono text-gray-600 mb-1">{system}</div>
                                            <div className="h-1 bg-gray-900 overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-green-500"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ delay: 1.8 + i * 0.3, duration: 0.5 }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* HUD targeting reticle */}
                    <AnimatePresence>
                        {showHUD && (
                            <motion.div
                                className="absolute inset-0 pointer-events-none flex items-center justify-center"
                                initial={{ opacity: 0, scale: 1.5 }}
                                animate={{ opacity: 0.3, scale: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <svg viewBox="0 0 200 200" className="w-[80vh] h-[80vh] max-w-[600px] max-h-[600px]">
                                    {/* Outer ring */}
                                    <motion.circle
                                        cx="100" cy="100" r="95"
                                        fill="none"
                                        stroke="rgba(34, 211, 238, 0.2)"
                                        strokeWidth="1"
                                        strokeDasharray="10 5"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        style={{ transformOrigin: '100px 100px' }}
                                    />
                                    {/* Inner rings */}
                                    <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="0.5" />
                                    <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="0.5" />
                                    {/* Cross hairs */}
                                    <line x1="100" y1="20" x2="100" y2="40" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
                                    <line x1="100" y1="160" x2="100" y2="180" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
                                    <line x1="20" y1="100" x2="40" y2="100" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
                                    <line x1="160" y1="100" x2="180" y2="100" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" />
                                    {/* Corner brackets */}
                                    <path d="M30 30 L30 50 M30 30 L50 30" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" fill="none" />
                                    <path d="M170 30 L170 50 M170 30 L150 30" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" fill="none" />
                                    <path d="M30 170 L30 150 M30 170 L50 170" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" fill="none" />
                                    <path d="M170 170 L170 150 M170 170 L150 170" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1" fill="none" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom status bar */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-12 border-t border-cyan-500/30 bg-gradient-to-t from-cyan-950/40 to-transparent"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className="flex justify-center items-center h-full gap-8">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-green-400"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                                <span className="text-green-400 text-xs font-mono">POWER</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-cyan-400"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                                />
                                <span className="text-cyan-400 text-xs font-mono">NEURAL</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-yellow-400"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                                />
                                <span className="text-yellow-400 text-xs font-mono">WEAPONS</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Ambient glow effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, transparent 70%)' }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
