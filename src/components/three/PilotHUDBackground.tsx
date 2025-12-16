/**
 * @fileoverview Pilot HUD Background Component
 * @description Gundam pilot helmet view with targeting systems, radar, and status displays
 * @optimizations memo components, reduced intervals, CSS animations where possible
 */

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, memo } from 'react';

interface PilotHUDBackgroundProps {
    className?: string;
}

// Memoized tick marks - static content
const PowerGaugeTickMarks = memo(function PowerGaugeTickMarks() {
    return (
        <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <g key={i}>
                    <line x1="8" y1={25 + i * 18.75} x2="12" y2={25 + i * 18.75}
                        stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" />
                    <line x1="28" y1={25 + i * 18.75} x2="32" y2={25 + i * 18.75}
                        stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" />
                </g>
            ))}
        </>
    );
});

/**
 * Vertical Power Gauge - Like the left side gauge in reference
 */
const VerticalPowerGauge = memo(function VerticalPowerGauge() {
    const [powerLevel, setPowerLevel] = useState(397);

    useEffect(() => {
        // Slower interval for better performance
        const interval = setInterval(() => {
            setPowerLevel(prev => Math.max(350, Math.min(420, prev + Math.floor(Math.random() * 10 - 5))));
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-64"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
        >
            {/* Power value display */}
            <div className="absolute -top-8 left-0 right-0 text-center">
                <span className="text-lg font-mono font-bold text-cyan-400">{powerLevel}</span>
            </div>

            <svg viewBox="0 0 40 200" className="w-full h-full">
                {/* Outer frame */}
                <path d="M5 10 L5 190 L35 190 L35 10 L25 0 L15 0 Z"
                    fill="rgba(34, 211, 238, 0.05)"
                    stroke="rgba(34, 211, 238, 0.4)"
                    strokeWidth="1.5" />

                {/* Inner gauge track */}
                <rect x="12" y="20" width="16" height="160" fill="rgba(0,0,0,0.4)" />

                {/* Power fill */}
                <motion.rect
                    x="14" y="25" width="12"
                    fill="url(#powerGradient)"
                    initial={{ height: 0 }}
                    animate={{ height: 150 * (powerLevel / 500) }}
                    style={{ transformOrigin: 'bottom' }}
                    transform="translate(0, 155) scale(1, -1)"
                />

                {/* Tick marks - memoized */}
                <PowerGaugeTickMarks />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="powerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.9)" />
                        <stop offset="50%" stopColor="rgba(34, 211, 238, 0.7)" />
                        <stop offset="100%" stopColor="rgba(217, 70, 239, 0.8)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Label */}
            <div className="absolute -bottom-6 left-0 right-0 text-center">
                <span className="text-[8px] font-mono text-cyan-500/60">PWR</span>
            </div>
        </motion.div>
    );
});

/**
 * Target Found Indicator - Like "TARGET FOUND" text in reference
 */
function TargetFoundIndicator() {
    return (
        <motion.div
            className="absolute right-8 bottom-1/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
        >
            <motion.div
                className="text-right"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="text-2xl md:text-3xl font-bold font-['Orbitron'] tracking-wider">
                    <span className="text-orange-500">TARGET</span>
                </div>
                <div className="text-2xl md:text-3xl font-bold font-['Orbitron'] tracking-wider -mt-1">
                    <span className="text-red-500">FOUND</span>
                </div>
            </motion.div>

            {/* Decorative brackets */}
            <svg className="absolute -left-4 top-0 w-3 h-full" viewBox="0 0 12 60">
                <path d="M12 0 L0 10 L0 50 L12 60" stroke="rgba(249, 115, 22, 0.6)" strokeWidth="2" fill="none" />
            </svg>
        </motion.div>
    );
}


/**
 * Enhanced Central Scanner with arrow rings - Like main circular HUD in reference
 */
function EnhancedCentralScanner() {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2"
            style={{ width: '380px', height: '380px', transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
        >
            <svg viewBox="0 0 380 380" className="w-full h-full">
                {/* Outermost ring with chevron arrows */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '190px 190px' }}
                >
                    <circle cx="190" cy="190" r="180" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" strokeDasharray="8 12" />
                    {/* Chevron arrows around outer ring */}
                    {[...Array(24)].map((_, i) => (
                        <g key={i} transform={`rotate(${i * 15} 190 190)`}>
                            <path d="M190 15 L195 25 L190 20 L185 25 Z" fill="rgba(34, 211, 238, 0.4)" />
                        </g>
                    ))}
                </motion.g>

                {/* Second ring - counter rotating with ticks */}
                <motion.g
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '190px 190px' }}
                >
                    <circle cx="190" cy="190" r="155" fill="none" stroke="rgba(217, 70, 239, 0.25)" strokeWidth="2" />
                    {/* Tick marks */}
                    {[...Array(36)].map((_, i) => (
                        <line key={i}
                            x1="190" y1="38" x2="190" y2="48"
                            stroke="rgba(217, 70, 239, 0.5)" strokeWidth="1"
                            transform={`rotate(${i * 10} 190 190)`}
                        />
                    ))}
                </motion.g>

                {/* Inner static rings */}
                <circle cx="190" cy="190" r="130" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />
                <circle cx="190" cy="190" r="105" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="190" cy="190" r="80" fill="none" stroke="rgba(34, 211, 238, 0.25)" strokeWidth="1.5" />
                <circle cx="190" cy="190" r="55" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />

                {/* Direction indicators at cardinal points */}
                {[0, 90, 180, 270].map((angle) => (
                    <g key={angle} transform={`rotate(${angle} 190 190)`}>
                        <path d="M190 65 L200 85 L190 75 L180 85 Z" fill="rgba(34, 211, 238, 0.5)" />
                        <line x1="190" y1="90" x2="190" y2="130" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="2" />
                    </g>
                ))}

                {/* Rotating scanner beam */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '190px 190px' }}
                >
                    <path
                        d="M190 190 L190 60 A130 130 0 0 1 280 120 Z"
                        fill="url(#scannerBeam)"
                        opacity="0.3"
                    />
                    <line x1="190" y1="190" x2="190" y2="60" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
                </motion.g>

                {/* Pulsing center */}
                <motion.circle
                    cx="190" cy="190" r="25"
                    fill="rgba(34, 211, 238, 0.1)"
                    stroke="rgba(34, 211, 238, 0.5)"
                    strokeWidth="2"
                    animate={{ r: [25, 35, 25], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <circle cx="190" cy="190" r="15" fill="none" stroke="rgba(217, 70, 239, 0.6)" strokeWidth="2" />
                <circle cx="190" cy="190" r="5" fill="rgba(34, 211, 238, 1)" />

                {/* Gradient definitions */}
                <defs>
                    <radialGradient id="scannerBeam" cx="50%" cy="0%" r="100%">
                        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.6)" />
                        <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
                    </radialGradient>
                </defs>
            </svg>
        </motion.div>
    );
}

/**
 * Targeting Reticle Component
 */
function TargetingReticle({ x, y, size = 100, delay = 0 }: { x: string; y: string; size?: number; delay?: number }) {
    return (
        <motion.div
            className="absolute"
            style={{ left: x, top: y, width: size, height: size, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay }}
        >
            {/* Outer circle */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="0.5" strokeDasharray="2 2" />

                {/* Cross hairs */}
                <line x1="50" y1="10" x2="50" y2="30" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" />
                <line x1="50" y1="70" x2="50" y2="90" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" />
                <line x1="10" y1="50" x2="30" y2="50" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" />
                <line x1="70" y1="50" x2="90" y2="50" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" />

                {/* Corner brackets */}
                <path d="M20 20 L20 30 M20 20 L30 20" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1.5" fill="none" />
                <path d="M80 20 L80 30 M80 20 L70 20" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1.5" fill="none" />
                <path d="M20 80 L20 70 M20 80 L30 80" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1.5" fill="none" />
                <path d="M80 80 L80 70 M80 80 L70 80" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1.5" fill="none" />

                {/* Center dot */}
                <circle cx="50" cy="50" r="2" fill="rgba(34, 211, 238, 0.8)" />
            </svg>
        </motion.div>
    );
}

/**
 * Radar Component
 */
function RadarDisplay({ position }: { position: 'left' | 'right' }) {
    const [enemyPing, setEnemyPing] = useState<{ x: number; y: number; active: boolean }>({ x: 50, y: 50, active: false });

    // Random enemy blip that flashes red occasionally
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        const triggerPing = () => {
            const shouldPing = Math.random() < 0.7;
            if (shouldPing) {
                const x = 20 + Math.random() * 60;
                const y = 20 + Math.random() * 60;
                setEnemyPing({ x, y, active: true });

                setTimeout(() => {
                    setEnemyPing((prev) => ({ ...prev, active: false }));
                }, 700);
            }

            timer = setTimeout(triggerPing, 2200 + Math.random() * 2000);
        };

        triggerPing();
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            className={`absolute ${position === 'left' ? 'left-4 bottom-16' : 'right-4 bottom-16'} w-44 h-44 md:w-56 md:h-56`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Outer ring with degree numbers */}
                <circle cx="100" cy="100" r="95" fill="rgba(34, 211, 238, 0.02)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" />

                {/* Degree tick marks and numbers */}
                {[...Array(36)].map((_, i) => {
                    const angle = i * 10;
                    const isMajor = angle % 30 === 0;
                    const radians = (angle - 90) * (Math.PI / 180);
                    const innerR = isMajor ? 78 : 85;
                    const outerR = 92;
                    const textR = 70;
                    const x1 = 100 + innerR * Math.cos(radians);
                    const y1 = 100 + innerR * Math.sin(radians);
                    const x2 = 100 + outerR * Math.cos(radians);
                    const y2 = 100 + outerR * Math.sin(radians);
                    const textX = 100 + textR * Math.cos(radians);
                    const textY = 100 + textR * Math.sin(radians);

                    return (
                        <g key={i}>
                            <line
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke={isMajor ? 'rgba(34, 211, 238, 0.6)' : 'rgba(34, 211, 238, 0.3)'}
                                strokeWidth={isMajor ? 2 : 1}
                            />
                            {isMajor && (
                                <text
                                    x={textX} y={textY}
                                    fill="rgba(34, 211, 238, 0.7)"
                                    fontSize="7"
                                    fontFamily="monospace"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {angle}
                                </text>
                            )}
                        </g>
                    );
                })}

                {/* Inner concentric circles */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" />
                <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" />

                {/* Cross lines */}
                <line x1="100" y1="8" x2="100" y2="192" stroke="rgba(34, 211, 238, 0.12)" strokeWidth="0.5" />
                <line x1="8" y1="100" x2="192" y2="100" stroke="rgba(34, 211, 238, 0.12)" strokeWidth="0.5" />
                <line x1="30" y1="30" x2="170" y2="170" stroke="rgba(34, 211, 238, 0.08)" strokeWidth="0.5" />
                <line x1="170" y1="30" x2="30" y2="170" stroke="rgba(34, 211, 238, 0.08)" strokeWidth="0.5" />

                {/* Friendly/neutral blips */}
                <motion.circle
                    cx="70" cy="60" r="3"
                    fill="rgba(34, 211, 238, 0.8)"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                    cx="130" cy="90" r="2.5"
                    fill="rgba(217, 70, 239, 0.8)"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                    cx="110" cy="140" r="3"
                    fill="rgba(163, 230, 53, 0.8)"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />

                {/* Enemy ping (red) with glow effect */}
                {enemyPing.active && (
                    <>
                        <motion.circle
                            cx={enemyPing.x * 2}
                            cy={enemyPing.y * 2}
                            r="6"
                            fill="rgba(239, 68, 68, 0.3)"
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        <motion.circle
                            cx={enemyPing.x * 2}
                            cy={enemyPing.y * 2}
                            r="4"
                            fill="rgba(239, 68, 68, 1)"
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                            transition={{ duration: 0.4, repeat: Infinity }}
                        />
                    </>
                )}

                {/* Center point (self) */}
                <circle cx="100" cy="100" r="4" fill="rgba(34, 211, 238, 1)" />
                <circle cx="100" cy="100" r="8" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1" />

                {/* Rotating scanner beam with gradient tail */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '100px 100px' }}
                >
                    <defs>
                        <linearGradient id={`radarSweep-${position}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
                            <stop offset="100%" stopColor="rgba(34, 211, 238, 0.5)" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M100 100 L100 20 A80 80 0 0 1 160 60 Z"
                        fill={`url(#radarSweep-${position})`}
                        opacity="0.4"
                    />
                    <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" />
                </motion.g>
            </svg>

            {/* Label */}
            <div className="absolute -top-6 left-0 right-0 text-center">
                <span className="text-[10px] font-mono text-cyan-500/60 tracking-wider">
                    {position === 'left' ? 'TACTICAL_MAP' : 'THREAT_RADAR'}
                </span>
            </div>
        </motion.div>
    );
}

/**
 * Circular gauge for mech output/weapon charge
 */
/**
 * Enhanced Circular Gauge - Like the 145% gauge in reference image
 */
function CircularGauge({ label, value, position = 'right' }: { label: string; value: number; position?: 'left' | 'right' }) {
    const isLeft = position === 'left';

    return (
        <motion.div
            className={`absolute ${isLeft ? 'left-16' : 'right-6'} ${isLeft ? 'bottom-24' : 'bottom-1/4'} w-36 h-36 md:w-44 md:h-44`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
        >
            <svg viewBox="0 0 140 140" className="w-full h-full">
                {/* Outer decorative ring */}
                <circle cx="70" cy="70" r="68" fill="none" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />

                {/* Main gauge track with tick marks */}
                <circle cx="70" cy="70" r="60" fill="rgba(34, 211, 238, 0.03)" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" />

                {/* Tick marks around the gauge */}
                {[...Array(24)].map((_, i) => (
                    <line key={i}
                        x1="70" y1="14" x2="70" y2="20"
                        stroke={i < (value / 100) * 24 ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.2)'}
                        strokeWidth="2"
                        transform={`rotate(${i * 15} 70 70)`}
                    />
                ))}

                {/* Progress arc */}
                <motion.circle
                    cx="70" cy="70" r="50"
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.7)"
                    strokeWidth="6"
                    strokeDasharray={`${Math.min(value, 100) * 3.14} 999`}
                    strokeLinecap="round"
                    transform="rotate(-90 70 70)"
                    initial={{ strokeDasharray: '0 999' }}
                    animate={{ strokeDasharray: `${Math.min(value, 100) * 3.14} 999` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Inner rings */}
                <circle cx="70" cy="70" r="42" fill="none" stroke="rgba(217, 70, 239, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
                <motion.circle
                    cx="70" cy="70" r="35"
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.4)"
                    strokeWidth="1"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '70px 70px' }}
                    strokeDasharray="8 8"
                />

                {/* Center display */}
                <circle cx="70" cy="70" r="28" fill="rgba(0, 0, 0, 0.5)" />
                <text x="70" y="68" textAnchor="middle" fill="rgba(34, 211, 238, 1)" fontSize="18" fontFamily="monospace" fontWeight="bold">
                    {value}%
                </text>
                <text x="70" y="84" textAnchor="middle" fill="rgba(148, 163, 184, 0.8)" fontSize="8" fontFamily="monospace">
                    {label}
                </text>
            </svg>
        </motion.div>
    );
}

/**
 * Status Bar Component
 */
function StatusBar({ label, value, color, position }: { label: string; value: number; color: string; position: 'left' | 'right' }) {
    return (
        <div className={`flex items-center gap-2 ${position === 'right' ? 'flex-row-reverse' : ''}`}>
            <span className="text-[10px] font-mono text-gray-500 w-12">{label}</span>
            <div className="w-20 h-1.5 bg-gray-800 overflow-hidden" style={{ clipPath: 'polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)' }}>
                <motion.div
                    className="h-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                />
            </div>
            <span className="text-[10px] font-mono" style={{ color }}>{value}%</span>
        </div>
    );
}

/**
 * Side Panel Component
 */
function SidePanel({ position }: { position: 'left' | 'right' }) {
    const isLeft = position === 'left';

    return (
        <motion.div
            className={`absolute ${isLeft ? 'left-4' : 'right-4'} top-1/4 w-36 md:w-44`}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
        >
            {/* Panel frame */}
            <div
                className="border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-sm p-3"
                style={{
                    clipPath: isLeft
                        ? 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)'
                        : 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                }}
            >
                <div className="text-[9px] font-mono text-cyan-500/60 mb-2 tracking-wider">
                    {isLeft ? '[SYSTEM_STATUS]' : '[PILOT_VITALS]'}
                </div>

                <div className="space-y-2">
                    {isLeft ? (
                        <>
                            <StatusBar label="PWR" value={98} color="#22d3ee" position={position} />
                            <StatusBar label="SYNC" value={87} color="#a855f7" position={position} />
                            <StatusBar label="ARM" value={100} color="#22c55e" position={position} />
                            <StatusBar label="SHD" value={92} color="#22d3ee" position={position} />
                        </>
                    ) : (
                        <>
                            <StatusBar label="HEART" value={72} color="#ef4444" position={position} />
                            <StatusBar label="SYNC" value={95} color="#22d3ee" position={position} />
                            <StatusBar label="FOCUS" value={88} color="#a855f7" position={position} />
                            <StatusBar label="STAM" value={81} color="#22c55e" position={position} />
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Mech profile card showing unit silhouette and ID
 */
function MechProfilePanel() {
    return (
        <motion.div
            className="absolute left-6 top-10 w-60 md:w-72 border border-cyan-500/40 bg-cyan-950/25 backdrop-blur-sm p-3"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 12px)' }}
        >
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-500/70 mb-2">
                <span>IDENT PROC: 227.09</span>
                <span>MODEL: RX-0</span>
            </div>
            <div className="relative h-28 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 via-transparent to-magenta-500/10 flex items-center justify-center">
                <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, rgba(34,211,238,0.06), rgba(34,211,238,0.06) 1px, transparent 1px, transparent 6px)' }} />
                <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(0deg, rgba(34,211,238,0.05), rgba(34,211,238,0.05) 1px, transparent 1px, transparent 6px)' }} />
                <div className="relative w-16 h-24 border border-cyan-400/60" style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 6px)' }}>
                    <div className="absolute inset-1 bg-cyan-500/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[9px] text-cyan-300">
                        <span className="mb-1">MECH</span>
                        <span className="font-bold">RX-0</span>
                        <span className="text-[8px] text-cyan-200/60">UNICORN</span>
                    </div>
                </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-['JetBrains Mono'] text-cyan-100">
                <span>UNICORN</span>
                <span className="text-magenta-300">TARGET LOCK</span>
            </div>
        </motion.div>
    );
}

/**
 * Horizon Line Component
 */
function HorizonLine() {
    return (
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* Main horizon */}
            <div className="relative h-px w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>

            {/* Tick marks */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
                {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className={`w-px ${i === 0 ? 'h-4 bg-cyan-400' : 'h-2 bg-cyan-500/40'}`} />
                        {i === 0 && (
                            <span className="text-[8px] font-mono text-cyan-400 mt-1">0°</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Speed/Altitude Indicators
 */
function FlightData() {
    const [altitude, setAltitude] = useState(15420);
    const [speed, setSpeed] = useState(342);

    useEffect(() => {
        const interval = setInterval(() => {
            setAltitude(prev => prev + Math.floor(Math.random() * 20 - 10));
            setSpeed(prev => Math.max(300, Math.min(400, prev + Math.floor(Math.random() * 10 - 5))));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Altitude - Left side */}
            <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="border-l-2 border-cyan-500/40 pl-2 py-4">
                    <div className="text-[9px] font-mono text-cyan-500/60 mb-1">ALT</div>
                    <div className="text-lg font-mono text-cyan-400 tabular-nums">{altitude.toLocaleString()}</div>
                    <div className="text-[9px] font-mono text-gray-600">METERS</div>
                </div>
            </motion.div>

            {/* Speed - Right side */}
            <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <div className="border-r-2 border-cyan-500/40 pr-2 py-4 text-right">
                    <div className="text-[9px] font-mono text-cyan-500/60 mb-1">VEL</div>
                    <div className="text-lg font-mono text-cyan-400 tabular-nums">{speed}</div>
                    <div className="text-[9px] font-mono text-gray-600">KM/H</div>
                </div>
            </motion.div>
        </>
    );
}

/**
 * Compass/Heading Indicator
 */
function CompassBar() {
    return (
        <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-64 md:w-80"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <div className="relative h-6 border border-cyan-500/30 bg-cyan-950/20 overflow-hidden">
                {/* Compass markings */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center gap-8 text-[10px] font-mono"
                    animate={{ x: [0, -20, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                    <span className="text-gray-600">270°</span>
                    <span className="text-gray-600">315°</span>
                    <span className="text-cyan-400 font-bold">N</span>
                    <span className="text-gray-600">045°</span>
                    <span className="text-gray-600">090°</span>
                </motion.div>

                {/* Center indicator */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-2 bg-magenta-400" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0.5 h-2 bg-magenta-400" />
            </div>
            <div className="text-center mt-1">
                <span className="text-[9px] font-mono text-cyan-500/60">HEADING: 358°</span>
            </div>
        </motion.div>
    );
}

/**
 * Warning Indicators
 */
function WarningPanel() {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
        >
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30">
                <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] font-mono text-green-400">SYSTEMS NOMINAL</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30">
                <motion.div
                    className="w-2 h-2 rounded-full bg-cyan-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[10px] font-mono text-cyan-400">NEURAL LINK ACTIVE</span>
            </div>
        </motion.div>
    );
}

/**
 * Telemetry strip for quick mech stats
 */
function TelemetryStrip() {
    const items = [
        { label: 'CORE TEMP', value: '62°C' },
        { label: 'REACTOR', value: '145%' },
        { label: 'SHIELD', value: '92%' },
        { label: 'AMMO', value: '73%' },
    ];

    return (
        <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-cyan-950/30 border border-cyan-500/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
        >
            {items.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 text-[10px] font-mono text-cyan-100">
                    <span className="text-cyan-500/60">{label}</span>
                    <span className="text-magenta-300 font-semibold">{value}</span>
                    <div className="w-8 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                </div>
            ))}
        </motion.div>
    );
}

/**
 * Floating Energy Particles - Auto loop effect
 */
function FloatingParticles() {
    const particles = useMemo(() => {
        return [...Array(40)].map((_, i) => ({
            id: i,
            startX: Math.random() * 100,
            startY: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: 8 + Math.random() * 12,
            delay: Math.random() * 5,
            type: ['hexagon', 'circle', 'diamond'][Math.floor(Math.random() * 3)] as 'hexagon' | 'circle' | 'diamond',
            color: ['cyan', 'magenta', 'green'][Math.floor(Math.random() * 3)] as 'cyan' | 'magenta' | 'green',
        }));
    }, []);

    const colorMap = {
        cyan: 'rgba(34, 211, 238, 0.6)',
        magenta: 'rgba(217, 70, 239, 0.6)',
        green: 'rgba(163, 230, 53, 0.5)',
    };

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.startX}%`,
                        top: `${p.startY}%`,
                    }}
                    animate={{
                        y: [0, -150, -300],
                        x: [0, Math.random() * 60 - 30, Math.random() * 100 - 50],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1, 0.3],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'linear',
                    }}
                >
                    {p.type === 'hexagon' && (
                        <svg width={p.size * 4} height={p.size * 4} viewBox="0 0 24 24">
                            <polygon
                                points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
                                fill="none"
                                stroke={colorMap[p.color]}
                                strokeWidth="1"
                            />
                        </svg>
                    )}
                    {p.type === 'circle' && (
                        <div
                            style={{
                                width: p.size * 3,
                                height: p.size * 3,
                                borderRadius: '50%',
                                border: `1px solid ${colorMap[p.color]}`,
                                boxShadow: `0 0 ${p.size}px ${colorMap[p.color]}`,
                            }}
                        />
                    )}
                    {p.type === 'diamond' && (
                        <div
                            style={{
                                width: p.size * 2,
                                height: p.size * 2,
                                backgroundColor: colorMap[p.color],
                                transform: 'rotate(45deg)',
                            }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
}

/**
 * Energy Pulse Waves - Expanding rings effect
 */
function EnergyPulseWaves() {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-cyan-500/30"
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    animate={{
                        width: [100, 800],
                        height: [100, 800],
                        opacity: [0.5, 0],
                        borderWidth: [2, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.3,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
}

/**
 * Data Stream Lines - Vertical flowing data
 */
function DataStreamLines() {
    const streams = useMemo(() => {
        return [...Array(15)].map((_, i) => ({
            id: i,
            x: 5 + (i * 6.5),
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 3,
            height: 50 + Math.random() * 100,
        }));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            {streams.map((stream) => (
                <motion.div
                    key={stream.id}
                    className="absolute w-px"
                    style={{
                        left: `${stream.x}%`,
                        height: stream.height,
                        background: 'linear-gradient(to bottom, transparent, rgba(34, 211, 238, 0.8), transparent)',
                    }}
                    animate={{
                        top: ['-10%', '110%'],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: stream.duration,
                        repeat: Infinity,
                        delay: stream.delay,
                        ease: 'linear',
                    }}
                />
            ))}
        </div>
    );
}

/**
 * Holographic Grid Effect
 */
function HolographicGrid() {
    return (
        <motion.div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
            }}
            animate={{
                backgroundPosition: ['0px 0px', '50px 50px'],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
            }}
        />
    );
}

/**
 * Floating Tech Debris - Space debris floating
 */
function FloatingDebris() {
    const debris = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 3 + Math.random() * 8,
            duration: 15 + Math.random() * 20,
            rotationDuration: 5 + Math.random() * 10,
        }));
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {debris.map((d) => (
                <motion.div
                    key={d.id}
                    className="absolute"
                    style={{
                        left: `${d.x}%`,
                        top: `${d.y}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 80 - 40, 0],
                    }}
                    transition={{
                        duration: d.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: d.rotationDuration,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        <div
                            className="border border-cyan-500/30 bg-cyan-500/5"
                            style={{
                                width: d.size,
                                height: d.size,
                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                            }}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}

/**
 * Energy Core Pulse - Central glowing effect
 */
function EnergyCorePulse() {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
                className="relative"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Core glow */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 200,
                        height: 200,
                        left: -100,
                        top: -100,
                        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                />
                {/* Secondary glow */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 300,
                        height: 300,
                        left: -150,
                        top: -150,
                        background: 'radial-gradient(circle, rgba(217, 70, 239, 0.1) 0%, transparent 60%)',
                    }}
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                    }}
                />
            </motion.div>
        </div>
    );
}

/**
 * Scanning Beam Effect
 */
function ScanningBeam() {
    return (
        <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{
                background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.5) 20%, rgba(34, 211, 238, 0.8) 50%, rgba(34, 211, 238, 0.5) 80%, transparent)',
                boxShadow: '0 0 20px 2px rgba(34, 211, 238, 0.4)',
            }}
            animate={{
                top: ['0%', '100%'],
                opacity: [0, 0.6, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 3,
            }}
        />
    );
}

/**
 * Circuit Trace Animation
 */
function CircuitTraces() {
    const traces = useMemo(() => [
        { id: 1, path: 'M0,50 L100,50 L100,150 L200,150', x: '5%', y: '20%' },
        { id: 2, path: 'M0,0 L80,0 L80,100 L150,100', x: '70%', y: '60%' },
        { id: 3, path: 'M50,0 L50,80 L150,80 L150,150', x: '20%', y: '70%' },
        { id: 4, path: 'M0,30 L60,30 L60,0 L120,0', x: '80%', y: '25%' },
    ], []);

    return (
        <div className="absolute inset-0 pointer-events-none opacity-30">
            {traces.map((trace) => (
                <svg
                    key={trace.id}
                    className="absolute"
                    style={{ left: trace.x, top: trace.y }}
                    width="200"
                    height="150"
                    viewBox="0 0 200 150"
                >
                    <path
                        d={trace.path}
                        fill="none"
                        stroke="rgba(34, 211, 238, 0.3)"
                        strokeWidth="1"
                    />
                    <motion.circle
                        r="3"
                        fill="rgba(34, 211, 238, 0.8)"
                        animate={{
                            offsetDistance: ['0%', '100%'],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: trace.id * 0.8,
                            ease: 'linear',
                        }}
                        style={{
                            offsetPath: `path('${trace.path}')`,
                        }}
                    />
                </svg>
            ))}
        </div>
    );
}

/**
 * Main Pilot HUD Background Component
 */
export function PilotHUDBackground({ className = '' }: PilotHUDBackgroundProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Space background - Deep space gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

            {/* === AUTO LOOP EFFECTS === */}
            {/* Floating energy particles */}
            <FloatingParticles />

            {/* Energy pulse waves from center */}
            <EnergyPulseWaves />

            {/* Vertical data stream lines */}
            <DataStreamLines />

            {/* Moving holographic grid */}
            <HolographicGrid />

            {/* Floating tech debris */}
            <FloatingDebris />

            {/* Central energy core pulse */}
            <EnergyCorePulse />

            {/* Horizontal scanning beam */}
            <ScanningBeam />

            {/* Circuit trace animations */}
            <CircuitTraces />

            {/* Vignette effect - Cockpit frame shadow */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
                }}
            />

            {/* Helmet rim effect - Cockpit frame */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top rim curve - Cockpit canopy */}
                <div
                    className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-gray-900/95 via-gray-900/70 to-transparent"
                    style={{ borderRadius: '0 0 50% 50%' }}
                />
                {/* Bottom cockpit panel */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/90 to-transparent"
                />
                {/* Side cockpit frames */}
                <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-gray-900/80 to-transparent" />
                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-gray-900/80 to-transparent" />

                {/* Cockpit frame lines */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    {/* Top frame arc */}
                    <path
                        d="M 0 80 Q 50% 20, 100% 80"
                        stroke="rgba(71, 85, 105, 0.5)"
                        strokeWidth="2"
                        fill="none"
                        style={{ vectorEffect: 'non-scaling-stroke' }}
                    />
                    {/* Bottom frame */}
                    <line x1="0" y1="95%" x2="100%" y2="95%" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="3" />
                </svg>
            </div>

            {/* Enhanced Central scanner */}
            <EnhancedCentralScanner />

            {/* Vertical power gauge */}
            <VerticalPowerGauge />

            {/* Targeting reticles */}
            <TargetingReticle x="25%" y="35%" size={120} delay={0} />
            <TargetingReticle x="75%" y="40%" size={80} delay={0.5} />
            <TargetingReticle x="50%" y="60%" size={150} delay={1} />
            <TargetingReticle x="15%" y="70%" size={60} delay={1.5} />
            <TargetingReticle x="85%" y="65%" size={70} delay={2} />

            {/* Circular gauges - Enhanced like reference */}
            <CircularGauge label="REACTOR" value={145} position="right" />

            {/* Radar displays */}
            <RadarDisplay position="left" />
            <RadarDisplay position="right" />

            {/* Mech profile */}
            <MechProfilePanel />

            {/* Side panels */}
            <SidePanel position="left" />
            <SidePanel position="right" />

            {/* Horizon line */}
            <HorizonLine />

            {/* Flight data */}
            <FlightData />

            {/* Compass */}
            <CompassBar />

            {/* Warning panel */}
            <WarningPanel />

            {/* Telemetry strip */}
            <TelemetryStrip />

            {/* Corner frame decorations */}
            <svg className="absolute top-4 left-4 w-16 h-16 text-cyan-500/40">
                <path d="M0 40 L0 0 L40 0" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 30 L10 10 L30 10" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute top-4 right-4 w-16 h-16 text-cyan-500/40">
                <path d="M64 40 L64 0 L24 0" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M54 30 L54 10 L34 10" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-4 left-4 w-16 h-16 text-cyan-500/40">
                <path d="M0 24 L0 64 L40 64" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M10 34 L10 54 L30 54" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-4 right-4 w-16 h-16 text-cyan-500/40">
                <path d="M64 24 L64 64 L24 64" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M54 34 L54 54 L34 54" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>

            {/* Scan lines effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)'
                }}
            />
        </div>
    );
}
