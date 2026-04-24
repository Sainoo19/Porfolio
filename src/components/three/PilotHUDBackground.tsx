/**
 * @fileoverview Pilot HUD Background Component — Gundam Cockpit Helmet View
 *
 * Complete cockpit HUD rendered as a 2D overlay. Features:
 *  - Gundam-style boot-up sequence with synthesised sound (Web Audio API)
 *  - BATTLE MODE toggle that shifts the entire palette to red neon
 *  - Visor frame with chromatic aberration & glass reflections
 *  - Central targeting optic, tactical radar, system panels
 *  - Atmospheric FX: floating particles, data streams, holographic grid
 *
 * Performance: CSS keyframe animations for loops; Framer Motion only for
 * entrance transitions & mode colour shifts. Memoised static content.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo, memo, useCallback, useRef } from 'react';

/* ================================================================
   TYPES & CONSTANTS
   ================================================================ */

interface PilotHUDBackgroundProps {
    className?: string;
    isBattle: boolean;
}

/** Palette tokens that change with battle mode */
export interface HUDPalette {
    primary: string;       // main glow  e.g. rgba(34,211,238,…)
    primaryHex: string;    // #hex form
    accent: string;        // secondary glow
    accentHex: string;
    dim: string;           // muted text / lines
    bg: string;            // panel background tint
    scanBeam: string;
    alertBg: string;
    alertBorder: string;
    alertText: string;
    label: string;         // NORMAL | BATTLE
}

export const CYAN_PALETTE: HUDPalette = {
    primary: 'rgba(34,211,238,',
    primaryHex: '#22d3ee',
    accent: 'rgba(217,70,239,',
    accentHex: '#d946ef',
    dim: 'rgba(34,211,238,0.35)',
    bg: 'rgba(6,20,35,0.7)',
    scanBeam: 'rgba(34,211,238,0.6)',
    alertBg: 'rgba(34,211,238,0.06)',
    alertBorder: 'rgba(34,211,238,0.35)',
    alertText: 'rgba(34,211,238,0.85)',
    label: 'NORMAL',
};

export const RED_PALETTE: HUDPalette = {
    primary: 'rgba(255,50,50,',
    primaryHex: '#ff3232',
    accent: 'rgba(255,160,30,',
    accentHex: '#ffa01e',
    dim: 'rgba(255,50,50,0.35)',
    bg: 'rgba(35,6,6,0.7)',
    scanBeam: 'rgba(255,50,50,0.6)',
    alertBg: 'rgba(255,50,50,0.08)',
    alertBorder: 'rgba(255,50,50,0.45)',
    alertText: 'rgba(255,50,50,0.9)',
    label: 'BATTLE',
};

/* ================================================================
   WEB AUDIO — SOUND DISABLED PER USER REQUEST
   ================================================================ */

/* ================================================================
   BOOT SEQUENCE
   ================================================================ */

interface BootLine {
    text: string;
    delay: number;    // ms from start
    type: 'system' | 'ok' | 'warn' | 'header';
}

const BOOT_LINES: BootLine[] = [
    { text: '> INITIALIZING PILOT NEURAL LINK...', delay: 200, type: 'system' },
    { text: '> REACTOR CORE .................. ONLINE', delay: 600, type: 'ok' },
    { text: '> PSYCHO-FRAME SYNC ............ 97.3%', delay: 1000, type: 'ok' },
    { text: '> WEAPONS SYSTEM ............... ARMED', delay: 1400, type: 'warn' },
    { text: '> MINOVSKY PARTICLE SCATTER .... NOMINAL', delay: 1800, type: 'ok' },
    { text: '> HELMET VISOR HUD ............. ACTIVE', delay: 2200, type: 'ok' },
    { text: '> ALL SYSTEMS .................. GREEN', delay: 2600, type: 'ok' },
    { text: '', delay: 2900, type: 'header' },
    { text: '   ██ UNICORN GUNDAM  —  RX-0  ██', delay: 3000, type: 'header' },
    { text: '       PILOT LINK ESTABLISHED', delay: 3300, type: 'header' },
];

const BOOT_TOTAL_DURATION = 4200; // ms until HUD fades in

function BootSequence({ onComplete, palette }: { onComplete: () => void; palette: HUDPalette }) {
    const [visibleLines, setVisibleLines] = useState<number>(0);
    const [progress, setProgress] = useState(0);
    const hasPlayedRef = useRef(false);

    useEffect(() => {
        // Play power-up hum once on mount
        if (!hasPlayedRef.current) {
            hasPlayedRef.current = true;
        }

        // Reveal lines one by one
        const timers: ReturnType<typeof setTimeout>[] = [];
        BOOT_LINES.forEach((line, i) => {
            timers.push(setTimeout(() => {
                setVisibleLines(i + 1);
            }, line.delay));
        });

        // Progress bar
        const pInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 1.5, 100));
        }, BOOT_TOTAL_DURATION / 70);

        // Finish
        timers.push(setTimeout(() => {
            onComplete();
        }, BOOT_TOTAL_DURATION));

        return () => {
            timers.forEach(clearTimeout);
            clearInterval(pInterval);
        };
    }, [onComplete]);

    const p = palette;

    return (
        <motion.div
            className="absolute inset-0 z-[100] flex items-center justify-center"
            style={{ background: '#020810' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Scan line overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.08) 2px, rgba(34,211,238,0.08) 4px)' }} />

            <div className="w-full max-w-lg px-6">
                {/* Unit header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="text-[10px] font-mono tracking-[0.3em] mb-1" style={{ color: p.dim }}>
                        ANAHEIM ELECTRONICS — MOBILE SUIT OS
                    </div>
                    <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${p.primaryHex}60, transparent)` }} />
                </motion.div>

                {/* Boot log */}
                <div className="font-mono text-xs space-y-1 mb-8 min-h-[220px]">
                    {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}
                            style={{
                                color: line.type === 'ok' ? '#4ade80'
                                    : line.type === 'warn' ? '#fbbf24'
                                    : line.type === 'header' ? p.primaryHex
                                    : '#94a3b8',
                                textShadow: line.type === 'header' ? `0 0 12px ${p.primaryHex}80` : undefined,
                                fontSize: line.type === 'header' ? '14px' : undefined,
                                fontWeight: line.type === 'header' ? 700 : undefined,
                            }}
                        >
                            {line.text}
                        </motion.div>
                    ))}
                    {/* Blinking cursor */}
                    {visibleLines < BOOT_LINES.length && (
                        <span className="inline-block w-2 h-3 animate-pulse" style={{ backgroundColor: p.primaryHex }} />
                    )}
                </div>

                {/* Progress bar */}
                <div className="relative h-2 border" style={{ borderColor: `${p.primaryHex}50`, background: 'rgba(0,0,0,0.5)' }}>
                    <motion.div
                        className="absolute inset-y-0 left-0"
                        style={{
                            background: `linear-gradient(90deg, ${p.primaryHex}, ${p.accentHex})`,
                            boxShadow: `0 0 12px ${p.primaryHex}80`,
                        }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.05 }}
                    />
                </div>
                <div className="flex justify-between mt-1 text-[9px] font-mono" style={{ color: p.dim }}>
                    <span>BOOT SEQUENCE</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                
                {/* Skip Button */}
                <motion.button
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2 border font-mono text-xs tracking-[0.2em] cursor-pointer"
                    style={{
                        color: p.primaryHex,
                        borderColor: `${p.primaryHex}50`,
                        background: `${p.primaryHex}10`,
                        clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)',
                    }}
                    onClick={onComplete}
                    whileHover={{ scale: 1.05, background: `${p.primaryHex}20` }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    [ SKIP SEQUENCE ]
                </motion.button>
            </div>
        </motion.div>
    );
}

/* ================================================================
   BATTLE MODE BUTTON
   ================================================================ */

export function BattleModeButton({ isBattle, onToggle, palette: p, className = '' }: { isBattle: boolean; onToggle?: () => void; palette: HUDPalette; className?: string }) {
    return (
        <motion.button
            className={`px-5 py-2 border font-mono text-xs tracking-[0.2em] flex items-center gap-3 backdrop-blur-md cursor-pointer pointer-events-auto transition-colors duration-500 hover:brightness-125 ${className}`}
            onClick={onToggle}
            style={{
                color: p.primaryHex,
                borderColor: `${p.primaryHex}60`,
                background: `${p.primaryHex}10`,
                clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)',
                textShadow: `0 0 8px ${isBattle ? 'rgba(255,50,50,0.6)' : 'rgba(34,211,238,0.5)'}`,
            }}
            whileHover={{ scale: 1.06, boxShadow: `0 0 25px ${isBattle ? 'rgba(255,50,50,0.4)' : 'rgba(34,211,238,0.3)'}` }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Pulsing indicator dot */}
            <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isBattle ? '#ff3232' : '#22d3ee' }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: isBattle ? 0.6 : 1.5, repeat: Infinity }}
            />
            <span>{isBattle ? '◆ BATTLE MODE' : '◇ NORMAL MODE'}</span>
        </motion.button>
    );
}

/* ================================================================
   VISOR FRAME — Helmet glass, vignette, chromatic aberration
   ================================================================ */

const VisorFrame = memo(function VisorFrame({ palette: p }: { palette: HUDPalette }) {
    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            {/* Heavy vignette */}
            <div className="absolute inset-0" style={{
                background: `radial-gradient(ellipse 70% 65% at center, rgba(0,0,0,0) 30%, rgba(2,6,23,0.75) 80%, rgba(0,0,0,0.95) 100%)`,
            }} />

            {/* Top/bottom frame darkness */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/90 via-slate-950/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/90 via-slate-950/60 to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent" />

            {/* Visor curved border */}
            <div className="absolute top-1/2 left-1/2 w-[94vw] max-w-[1500px] h-[93vh] -translate-x-1/2 -translate-y-1/2 rounded-[52px] border" style={{ borderColor: `${p.primaryHex}30` }} />
            <div className="absolute top-1/2 left-1/2 w-[90vw] max-w-[1400px] h-[89vh] -translate-x-1/2 -translate-y-1/2 rounded-[44px] border" style={{ borderColor: `${p.primaryHex}15` }} />

            {/* Glass reflection streak */}
            <div className="absolute top-8 right-[10%] w-72 h-24 opacity-60"
                style={{
                    background: 'linear-gradient(130deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 40%, transparent 70%)',
                    filter: 'blur(1px)',
                    clipPath: 'polygon(6% 0, 100% 0, 94% 100%, 0 100%)',
                }}
            />

            {/* Chromatic aberration — thin colour-shifted borders on edges */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Red shift left edge */}
                <div className="absolute top-0 bottom-0 left-0 w-3 opacity-30"
                    style={{ background: 'linear-gradient(to right, rgba(255,0,0,0.3), transparent)' }} />
                {/* Blue shift right edge */}
                <div className="absolute top-0 bottom-0 right-0 w-3 opacity-30"
                    style={{ background: 'linear-gradient(to left, rgba(0,100,255,0.3), transparent)' }} />
                {/* Top aberration */}
                <div className="absolute top-0 left-0 right-0 h-2 opacity-20"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,0,100,0.3), transparent)' }} />
            </div>

            {/* Visor arch lines — use viewBox coordinates, not percentages */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                <path d="M 80 110 Q 500 20, 920 110" stroke={`${p.primaryHex}40`} strokeWidth="2" fill="none" />
                <path d="M 140 890 Q 500 970, 860 890" stroke={`${p.primaryHex}25`} strokeWidth="1.5" fill="none" />
                <line x1="500" y1="60" x2="500" y2="140" stroke={`${p.primaryHex}30`} strokeWidth="2" />
                <line x1="500" y1="860" x2="500" y2="940" stroke={`${p.primaryHex}30`} strokeWidth="2" />
                <line x1="60" y1="500" x2="140" y2="500" stroke={`${p.primaryHex}30`} strokeWidth="2" />
                <line x1="860" y1="500" x2="940" y2="500" stroke={`${p.primaryHex}30`} strokeWidth="2" />
            </svg>
        </div>
    );
});

/* ================================================================
   TOP STATUS BAR
   ================================================================ */

function TopStatusBar({ palette: p }: { palette: HUDPalette; isBattle: boolean }) {
    return (
        <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div
                className="flex items-center gap-3 px-5 py-1.5 border backdrop-blur-sm text-[10px] font-mono"
                style={{
                    background: p.bg,
                    borderColor: `${p.primaryHex}45`,
                    color: p.primaryHex,
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)',
                    textShadow: `0 0 6px ${p.primaryHex}60`,
                }}
            >
                <span style={{ opacity: 0.6 }}>PILOT_LINK</span>
                <span style={{ color: '#4ade80' }}>STABLE</span>
                <span style={{ opacity: 0.25 }}>|</span>
                <span style={{ opacity: 0.6 }}>MODE</span>
                <motion.span
                    animate={{ color: p.primaryHex }}
                    transition={{ duration: 0.4 }}
                >
                    {p.label}
                </motion.span>
                <span style={{ opacity: 0.25 }}>|</span>
                <span>RX-0 UNICORN</span>
            </div>
        </motion.div>
    );
}

/* ================================================================
   COMPASS HEADING BAR
   ================================================================ */

function CompassBar({ palette: p }: { palette: HUDPalette }) {
    return (
        <motion.div
            className="absolute top-10 left-1/2 -translate-x-1/2 w-56 md:w-72 z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <div className="relative h-5 border overflow-hidden" style={{ borderColor: `${p.primaryHex}30`, background: p.bg }}>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-6 text-[9px] font-mono"
                    animate={{ x: [0, -16, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                    <span style={{ color: `${p.primaryHex}50` }}>270°</span>
                    <span style={{ color: `${p.primaryHex}50` }}>315°</span>
                    <span style={{ color: p.primaryHex, fontWeight: 700 }}>N</span>
                    <span style={{ color: `${p.primaryHex}50` }}>045°</span>
                    <span style={{ color: `${p.primaryHex}50` }}>090°</span>
                </motion.div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-1.5" style={{ background: p.accentHex }} />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0.5 h-1.5" style={{ background: p.accentHex }} />
            </div>
            <div className="text-center mt-0.5">
                <span className="text-[8px] font-mono" style={{ color: `${p.primaryHex}50` }}>HEADING: 358°</span>
            </div>
        </motion.div>
    );
}

/* ================================================================
   CENTRAL TARGETING OPTIC
   ================================================================ */

function CentralTargetingOptic({ palette: p }: { palette: HUDPalette }) {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
        >
            <div className="relative w-44 h-44 md:w-56 md:h-56">
                {/* Outer spinning octagon */}
                <motion.div
                    className="absolute inset-0 border"
                    style={{
                        borderColor: `${p.primaryHex}40`,
                        clipPath: 'polygon(16% 0, 84% 0, 100% 16%, 100% 84%, 84% 100%, 16% 100%, 0 84%, 0 16%)',
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                />
                {/* Inner counter-rotating octagon */}
                <motion.div
                    className="absolute inset-4 border"
                    style={{
                        borderColor: `${p.accentHex}30`,
                        clipPath: 'polygon(18% 0, 82% 0, 100% 18%, 100% 82%, 82% 100%, 18% 100%, 0 82%, 0 18%)',
                    }}
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />

                {/* Crosshairs */}
                <div className="absolute left-1/2 top-1/2 w-24 md:w-28 h-px -translate-x-1/2 -translate-y-1/2"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.primaryHex}70, transparent)` }} />
                <div className="absolute left-1/2 top-1/2 h-24 md:h-28 w-px -translate-x-1/2 -translate-y-1/2"
                    style={{ background: `linear-gradient(to bottom, transparent, ${p.primaryHex}70, transparent)` }} />

                {/* Corner brackets */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                    <path d="M35 35 L35 55 M35 35 L55 35" stroke={`${p.primaryHex}70`} strokeWidth="2" fill="none" />
                    <path d="M165 35 L165 55 M165 35 L145 35" stroke={`${p.primaryHex}70`} strokeWidth="2" fill="none" />
                    <path d="M35 165 L35 145 M35 165 L55 165" stroke={`${p.primaryHex}70`} strokeWidth="2" fill="none" />
                    <path d="M165 165 L165 145 M165 165 L145 165" stroke={`${p.primaryHex}70`} strokeWidth="2" fill="none" />
                    {/* Center pulsing circle */}
                    <circle cx="100" cy="100" r="5" fill={`${p.primaryHex}90`}>
                        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="100" cy="100" r="2" fill={p.primaryHex} />
                </svg>

                {/* Label */}
                <div className="absolute left-1/2 top-[64%] -translate-x-1/2 text-[8px] font-mono tracking-wider whitespace-nowrap"
                    style={{ color: `${p.primaryHex}80` }}>
                    TARGET VECTOR ACQUIRED
                </div>
            </div>
        </motion.div>
    );
}

/* ================================================================
   TACTICAL RADAR (bottom-left)
   ================================================================ */

export const TacticalRadar = memo(function TacticalRadar({ palette: p }: { palette: HUDPalette }) {
    const [blips, setBlips] = useState<{ x: number; y: number; id: number }[]>([]);

    useEffect(() => {
        const gen = () => {
            const count = 2 + Math.floor(Math.random() * 3);
            setBlips(Array.from({ length: count }, (_, i) => ({
                id: i,
                x: 30 + Math.random() * 40,
                y: 30 + Math.random() * 40,
            })));
        };
        gen();
        const iv = setInterval(gen, 3500);
        return () => clearInterval(iv);
    }, []);

    return (
        <motion.div
            className="absolute left-3 bottom-14 w-40 h-40 md:w-52 md:h-52 z-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
        >
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Frame */}
                <rect x="5" y="5" width="190" height="190" fill={`${p.primaryHex}1A`} stroke={`${p.primaryHex}90`} strokeWidth="2" />
                {/* Title */}
                <rect x="5" y="5" width="190" height="16" fill={`${p.primaryHex}30`} />
                <text x="100" y="17" fill={`${p.primaryHex}`} fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle" style={{ textShadow: `0 0 6px ${p.primaryHex}` }}>
                    TACTICAL_RADAR
                </text>

                {/* Circles - made significantly brighter */}
                <circle cx="100" cy="110" r="75" fill="none" stroke={`${p.primaryHex}70`} strokeWidth="2" />
                <circle cx="100" cy="110" r="50" fill="none" stroke={`${p.primaryHex}50`} strokeWidth="2" />
                <circle cx="100" cy="110" r="25" fill={`${p.primaryHex}15`} stroke={`${p.primaryHex}50`} strokeWidth="2" />

                {/* Cross */}
                <line x1="100" y1="30" x2="100" y2="190" stroke={`${p.primaryHex}40`} strokeWidth="1.5" />
                <line x1="20" y1="110" x2="180" y2="110" stroke={`${p.primaryHex}40`} strokeWidth="1.5" />

                {/* Self */}
                <circle cx="100" cy="110" r="5" fill={p.primaryHex} style={{ filter: `drop-shadow(0 0 8px ${p.primaryHex})` }} />
                <circle cx="100" cy="110" r="10" fill="none" stroke={`${p.primaryHex}`} strokeWidth="2" />

                {/* Sweep beam */}
                <g>
                    <animateTransform attributeName="transform" type="rotate" from="0 100 110" to="360 100 110" dur="4s" repeatCount="indefinite" />
                    <line x1="100" y1="110" x2="100" y2="35" stroke={`${p.primaryHex}`} strokeWidth="3" style={{ filter: `drop-shadow(0 0 6px ${p.primaryHex})` }} />
                    <path d="M100 110 L100 40 A70 70 0 0 1 155 65 Z" fill={`${p.primaryHex}40`} />
                </g>

                {/* Enemy blips */}
                {blips.map(b => (
                    <g key={b.id}>
                        <circle cx={60 + b.x} cy={60 + b.y} r="3.5" fill={p.label === 'BATTLE' ? '#ffffff' : '#ff2222'}>
                            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={60 + b.x} cy={60 + b.y} r="7" fill="none" stroke={p.label === 'BATTLE' ? '#ffffff' : '#ff2222'} strokeOpacity="0.6">
                            <animate attributeName="r" values="6;11;6" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                    </g>
                ))}

                {/* Friendly blips removed to make radar fully dynamic */}
            </svg>
        </motion.div>
    );
});

/* ================================================================
   STATUS BAR + SIDE PANELS
   ================================================================ */

function StatusBarItem({ label, value, barColor, palette: p }: {
    label: string; value: number; barColor: string; palette: HUDPalette;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono w-10" style={{ color: `${p.primaryHex}60` }}>{label}</span>
            <div className="w-16 h-1.5 overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <motion.div
                    className="h-full"
                    style={{ backgroundColor: barColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                />
            </div>
            <span className="text-[9px] font-mono" style={{ color: barColor }}>{value}%</span>
        </div>
    );
}

function SidePanel({ position, palette: p }: { position: 'left' | 'right'; palette: HUDPalette }) {
    const isLeft = position === 'left';

    return (
        <motion.div
            className={`absolute ${isLeft ? 'left-3' : 'right-3'} top-1/4 w-32 md:w-40 z-40`}
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
        >
            <div
                className="border backdrop-blur-sm p-2.5"
                style={{
                    background: p.bg,
                    borderColor: `${p.primaryHex}30`,
                    clipPath: isLeft
                        ? 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'
                        : 'polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                }}
            >
                <div className="text-[8px] font-mono mb-2 tracking-wider" style={{ color: `${p.primaryHex}60` }}>
                    {isLeft ? '[SYSTEM_STATUS]' : '[PILOT_VITALS]'}
                </div>
                <div className="space-y-1.5">
                    {isLeft ? (
                        <>
                            <StatusBarItem label="PWR" value={98} barColor={p.primaryHex} palette={p} />
                            <StatusBarItem label="SYNC" value={87} barColor={p.accentHex} palette={p} />
                            <StatusBarItem label="ARM" value={100} barColor="#22c55e" palette={p} />
                            <StatusBarItem label="SHD" value={92} barColor={p.primaryHex} palette={p} />
                        </>
                    ) : (
                        <>
                            <StatusBarItem label="HEART" value={72} barColor="#ef4444" palette={p} />
                            <StatusBarItem label="SYNC" value={95} barColor={p.primaryHex} palette={p} />
                            <StatusBarItem label="FOCUS" value={88} barColor={p.accentHex} palette={p} />
                            <StatusBarItem label="STAM" value={81} barColor="#22c55e" palette={p} />
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ================================================================
   CIRCULAR GAUGE (right side)
   ================================================================ */

function CircularGauge({ label, value, palette: p }: { label: string; value: number; palette: HUDPalette }) {
    return (
        <motion.div
            className="absolute right-4 bottom-1/4 w-32 h-32 md:w-40 md:h-40 z-40"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
        >
            <svg viewBox="0 0 140 140" className="w-full h-full">
                <circle cx="70" cy="70" r="65" fill="none" stroke={`${p.primaryHex}20`} strokeWidth="1" />
                <circle cx="70" cy="70" r="56" fill={`${p.primaryHex}05`} stroke={`${p.primaryHex}40`} strokeWidth="1.5" />

                {/* Tick marks */}
                {[...Array(24)].map((_, i) => (
                    <line key={i}
                        x1="70" y1="16" x2="70" y2="22"
                        stroke={i < (Math.min(value, 150) / 150) * 24 ? `${p.primaryHex}C0` : `${p.primaryHex}25`}
                        strokeWidth="2"
                        transform={`rotate(${i * 15} 70 70)`}
                    />
                ))}

                {/* Arc */}
                <motion.circle
                    cx="70" cy="70" r="48"
                    fill="none"
                    stroke={p.primaryHex}
                    strokeWidth="5"
                    strokeDasharray={`${Math.min(value, 150) / 150 * 301} 999`}
                    strokeLinecap="round"
                    transform="rotate(-90 70 70)"
                    initial={{ strokeDasharray: '0 999' }}
                    animate={{ strokeDasharray: `${Math.min(value, 150) / 150 * 301} 999` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ filter: `drop-shadow(0 0 4px ${p.primaryHex})` }}
                />

                {/* Center */}
                <circle cx="70" cy="70" r="26" fill="rgba(0,0,0,0.5)" />
                <text x="70" y="68" textAnchor="middle" fill={p.primaryHex} fontSize="16" fontFamily="monospace" fontWeight="bold">
                    {value}%
                </text>
                <text x="70" y="82" textAnchor="middle" fill={`${p.primaryHex}80`} fontSize="7" fontFamily="monospace">
                    {label}
                </text>
            </svg>
        </motion.div>
    );
}

/* ================================================================
   BOTTOM WARNING INDICATORS
   ================================================================ */

function WarningIndicators({ palette: p, isBattle }: { palette: HUDPalette; isBattle: boolean }) {
    return (
        <motion.div
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <div className="flex items-center gap-2 px-3 py-1 border" style={{
                background: isBattle ? 'rgba(255,50,50,0.08)' : 'rgba(34,211,238,0.05)',
                borderColor: isBattle ? 'rgba(255,50,50,0.4)' : 'rgba(34,211,238,0.3)',
            }}>
                <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: isBattle ? '#ff3232' : '#4ade80' }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: isBattle ? 0.5 : 2, repeat: Infinity }}
                />
                <span className="text-[9px] font-mono" style={{ color: isBattle ? '#ff6060' : '#4ade80' }}>
                    {isBattle ? 'COMBAT ALERT — ENGAGE' : 'SYSTEMS NOMINAL'}
                </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 border" style={{
                background: p.alertBg,
                borderColor: p.alertBorder,
            }}>
                <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: p.primaryHex }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[9px] font-mono" style={{ color: p.alertText }}>
                    NEURAL LINK ACTIVE
                </span>
            </div>
        </motion.div>
    );
}

/* ================================================================
   BOTTOM TELEMETRY STRIP
   ================================================================ */

function TelemetryStrip({ palette: p }: { palette: HUDPalette }) {
    const items = [
        { label: 'CORE TEMP', value: '62°C' },
        { label: 'REACTOR', value: '145%' },
        { label: 'SHIELD', value: '92%' },
        { label: 'AMMO', value: '73%' },
    ];

    return (
        <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 border backdrop-blur-sm z-40"
            style={{
                background: p.bg,
                borderColor: `${p.primaryHex}30`,
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
        >
            {items.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-1.5 text-[9px] font-mono">
                    <span style={{ color: `${p.primaryHex}60` }}>{label}</span>
                    <span style={{ color: p.accentHex, fontWeight: 600 }}>{value}</span>
                    <div className="w-6 h-px" style={{ background: `linear-gradient(90deg, ${p.primaryHex}50, transparent)` }} />
                </div>
            ))}
        </motion.div>
    );
}

/* ================================================================
   HELMET EDGE WARNINGS
   ================================================================ */

const HelmetEdgeWarnings = memo(function HelmetEdgeWarnings({ palette: p }: { palette: HUDPalette }) {
    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            <div className="absolute left-0.5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2">
                <div className="h-32 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${p.primaryHex}50, transparent)` }} />
                <span className="text-[8px] font-mono [writing-mode:vertical-rl]" style={{ color: `${p.primaryHex}60` }}>
                    CAUTION::BLIND_ZONE
                </span>
                <div className="h-32 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${p.primaryHex}40, transparent)` }} />
            </div>
            <div className="absolute right-0.5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2">
                <div className="h-32 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${p.primaryHex}50, transparent)` }} />
                <span className="text-[8px] font-mono [writing-mode:vertical-rl]" style={{ color: `${p.primaryHex}60` }}>
                    THREAT_SCAN::ACTIVE
                </span>
                <div className="h-32 w-px" style={{ background: `linear-gradient(to bottom, transparent, ${p.primaryHex}40, transparent)` }} />
            </div>
        </div>
    );
});

/* ================================================================
   CORNER FRAME DECORATIONS
   ================================================================ */

const CornerDecorations = memo(function CornerDecorations({ palette: p }: { palette: HUDPalette }) {
    const color = `${p.primaryHex}50`;
    return (
        <>
            <svg className="absolute top-3 left-3 w-14 h-14 z-40" style={{ color }}>
                <path d="M0 36 L0 0 L36 0" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M8 26 L8 8 L26 8" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute top-3 right-3 w-14 h-14 z-40" style={{ color }}>
                <path d="M56 36 L56 0 L20 0" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M48 26 L48 8 L30 8" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-3 left-3 w-14 h-14 z-40" style={{ color }}>
                <path d="M0 20 L0 56 L36 56" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M8 30 L8 48 L26 48" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-3 right-3 w-14 h-14 z-40" style={{ color }}>
                <path d="M56 20 L56 56 L20 56" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M48 30 L48 48 L30 48" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
        </>
    );
});

/* ================================================================
   ATMOSPHERIC FX — CSS-animated background effects
   ================================================================ */

/** Floating energy particles — CSS-only loop */
const FloatingParticlesFX = memo(function FloatingParticlesFX({ palette: p }: { palette: HUDPalette }) {
    const particles = useMemo(() =>
        [...Array(30)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: 2 + Math.random() * 4,
            dur: `${8 + Math.random() * 12}s`,
            delay: `${Math.random() * 6}s`,
            color: [p.primaryHex, p.accentHex, '#a3e635'][Math.floor(Math.random() * 3)],
            shape: ['circle', 'diamond', 'hex'][Math.floor(Math.random() * 3)],
        })), [p.primaryHex, p.accentHex]
    );

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {particles.map(pt => (
                <div
                    key={pt.id}
                    className="absolute hud-float-particle"
                    style={{
                        left: pt.left,
                        top: pt.top,
                        width: pt.size,
                        height: pt.size,
                        animationDuration: pt.dur,
                        animationDelay: pt.delay,
                        ...(pt.shape === 'circle'
                            ? { borderRadius: '50%', border: `1px solid ${pt.color}80`, boxShadow: `0 0 ${pt.size}px ${pt.color}40` }
                            : pt.shape === 'diamond'
                                ? { backgroundColor: `${pt.color}60`, transform: 'rotate(45deg)' }
                                : { border: `1px solid ${pt.color}60`, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }
                        ),
                    }}
                />
            ))}
        </div>
    );
});

/** Data stream lines — CSS-only vertical lines flowing down */
const DataStreamsFX = memo(function DataStreamsFX({ palette: p }: { palette: HUDPalette }) {
    const streams = useMemo(() =>
        [...Array(12)].map((_, i) => ({
            id: i,
            left: `${6 + i * 7.5}%`,
            height: 40 + Math.random() * 80,
            dur: `${3 + Math.random() * 4}s`,
            delay: `${Math.random() * 3}s`,
        })), []
    );

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-10">
            {streams.map(s => (
                <div
                    key={s.id}
                    className="absolute w-px hud-data-stream"
                    style={{
                        left: s.left,
                        height: s.height,
                        background: `linear-gradient(to bottom, transparent, ${p.primaryHex}C0, transparent)`,
                        animationDuration: s.dur,
                        animationDelay: s.delay,
                    }}
                />
            ))}
        </div>
    );
});

/** Holographic grid — CSS animated */
const HolographicGrid = memo(function HolographicGrid({ palette: p }: { palette: HUDPalette }) {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-15 z-10 hud-grid-move"
            style={{
                backgroundImage: `
                    linear-gradient(${p.primaryHex}18 1px, transparent 1px),
                    linear-gradient(90deg, ${p.primaryHex}18 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
            }}
        />
    );
});

/** Scanning beam */
function ScanningBeam({ palette: p }: { palette: HUDPalette }) {
    return (
        <div
            className="absolute left-0 right-0 h-px pointer-events-none z-20 hud-scan-beam"
            style={{
                background: `linear-gradient(90deg, transparent, ${p.primaryHex}50 20%, ${p.primaryHex}C0 50%, ${p.primaryHex}50 80%, transparent)`,
                boxShadow: `0 0 18px 2px ${p.primaryHex}50`,
            }}
        />
    );
}

/** Energy pulse rings from center */
const EnergyPulseWaves = memo(function EnergyPulseWaves({ palette: p }: { palette: HUDPalette }) {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            {[0, 1, 2].map(i => (
                <div
                    key={i}
                    className="absolute rounded-full hud-pulse-ring"
                    style={{
                        border: `1.5px solid ${p.primaryHex}30`,
                        animationDelay: `${i * 1.4}s`,
                    }}
                />
            ))}
        </div>
    );
});

/* ================================================================
   SCAN LINES OVERLAY
   ================================================================ */

const ScanlineOverlay = memo(function ScanlineOverlay() {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-50 opacity-[0.08]"
            style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.06) 2px, rgba(34,211,238,0.06) 4px)',
            }}
        />
    );
});

/* ================================================================
   CSS KEYFRAMES (injected once)
   ================================================================ */

const HUDStyles = memo(function HUDStyles() {
    return (
        <style>{`
            @keyframes hud-float {
                0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
                10%  { opacity: 0.7; }
                90%  { opacity: 0.7; }
                100% { transform: translateY(-200px) rotate(180deg); opacity: 0; }
            }
            .hud-float-particle {
                animation: hud-float linear infinite;
            }

            @keyframes hud-stream {
                0%   { top: -10%; opacity: 0; }
                10%  { opacity: 1; }
                90%  { opacity: 1; }
                100% { top: 110%; opacity: 0; }
            }
            .hud-data-stream {
                animation: hud-stream linear infinite;
            }

            @keyframes hud-grid-shift {
                0%   { background-position: 0px 0px; }
                100% { background-position: 50px 50px; }
            }
            .hud-grid-move {
                animation: hud-grid-shift 8s linear infinite;
            }

            @keyframes hud-scan {
                0%   { top: 0%; opacity: 0; }
                5%   { opacity: 0.6; }
                95%  { opacity: 0.6; }
                100% { top: 100%; opacity: 0; }
            }
            .hud-scan-beam {
                animation: hud-scan 7s linear infinite;
                animation-delay: 3s;
            }

            @keyframes hud-pulse {
                0%   { width: 80px; height: 80px; opacity: 0.5; }
                100% { width: 700px; height: 700px; opacity: 0; }
            }
            .hud-pulse-ring {
                animation: hud-pulse 4.5s ease-out infinite;
            }

            /* Smooth colour transition for HUD elements */
            .hud-themed-container svg *,
            .hud-themed-container svg,
            .hud-themed-container div,
            .hud-themed-container text,
            .hud-themed-container span {
                transition: stroke 0.6s ease-out, fill 0.6s ease-out, color 0.6s ease-out, background-color 0.6s ease-out, border-color 0.6s ease-out, text-shadow 0.6s ease-out;
            }
        `}</style>
    );
});

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export const PilotHUDBackground = memo(function PilotHUDBackground({ className = '', isBattle }: PilotHUDBackgroundProps) {
    const [booted, setBooted] = useState(false);

    const palette = isBattle ? RED_PALETTE : CYAN_PALETTE;

    const handleBootComplete = useCallback(() => {
        setBooted(true);
    }, []);

    return (
        <div className={`absolute inset-0 overflow-hidden hud-themed-container ${className}`}>
            {/* Inject CSS keyframes */}
            <HUDStyles />

            {/* Space background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

            {/* === BOOT SEQUENCE === */}
            <AnimatePresence>
                {!booted && (
                    <BootSequence onComplete={handleBootComplete} palette={CYAN_PALETTE} />
                )}
            </AnimatePresence>

            {/* === MAIN HUD (visible after boot) === */}
            {booted && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                >
                    {/* --- Atmospheric background FX --- */}
                    <FloatingParticlesFX palette={palette} />
                    <DataStreamsFX palette={palette} />
                    <HolographicGrid palette={palette} />
                    <EnergyPulseWaves palette={palette} />
                    <ScanningBeam palette={palette} />

                    {/* Central vignette */}
                    <div className="absolute inset-0 z-20" style={{
                        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
                    }} />

                    {/* --- Visor frame --- */}
                    <VisorFrame palette={palette} />

                    {/* --- HUD Elements --- */}
                    <TopStatusBar palette={palette} isBattle={isBattle} />
                    <CompassBar palette={palette} />
                    <CentralTargetingOptic palette={palette} />
                    <TacticalRadar palette={palette} />
                    <SidePanel position="left" palette={palette} />
                    <SidePanel position="right" palette={palette} />
                    <CircularGauge label="REACTOR" value={145} palette={palette} />
                    <TelemetryStrip palette={palette} />
                    <WarningIndicators palette={palette} isBattle={isBattle} />
                    <HelmetEdgeWarnings palette={palette} />
                    <CornerDecorations palette={palette} />

                    {/* Battle mode button rendered outside this container */}

                    {/* Scan lines */}
                    <ScanlineOverlay />
                </motion.div>
            )}
        </div>
    );
});
