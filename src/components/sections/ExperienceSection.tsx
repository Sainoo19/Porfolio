/**
 * @fileoverview Experience Section Component - Mecha HUD Mission Log
 * @description Work experience as pilot mission history with HUD styling
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Timeline } from '../ui';
import { EXPERIENCES } from '../../constants';
import { SLIDE_UP_VARIANTS } from '../../constants';

/**
 * 3D Stat Card Component - HUD Data Panel
 */
function StatCard({ stat, index }: { stat: { value: string; label: string; code: string }; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX((y - centerY) / 10);
        setRotateY((centerX - x) / 10);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: rotateX,
                rotateY: rotateY,
                scale: isHovered ? 1.05 : 1,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))'
            }}
            className="relative text-center p-6 bg-gradient-to-br from-cyan-950/40 to-slate-950/60 backdrop-blur-sm border border-cyan-500/20 overflow-hidden cursor-pointer group hover:border-cyan-500/50 transition-all"
        >
            {/* Corner brackets */}
            <svg className="absolute top-1 left-1 w-4 h-4 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                <path d="M0 12 L0 0 L12 0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute top-1 right-1 w-4 h-4 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                <path d="M12 12 L12 0 L0 0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-1 left-1 w-4 h-4 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                <path d="M0 0 L0 12 L12 12" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-1 right-1 w-4 h-4 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                <path d="M12 0 L12 12 L0 12" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>

            {/* Scan line effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent animate-scan-line" />
            </div>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.15), transparent 70%)',
                }}
            />

            {/* Shine effect */}
            {isHovered && (
                <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '200%', opacity: 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                    style={{ transform: 'skewX(-20deg)' }}
                />
            )}

            {/* Data code */}
            <div className="relative z-10 text-[9px] font-mono text-cyan-600 mb-2">{stat.code}</div>

            <motion.div
                className="relative z-10 text-3xl md:text-4xl font-['Orbitron'] font-bold text-cyan-400"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {stat.value}
            </motion.div>
            <div className="relative z-10 text-gray-400 text-xs font-mono mt-2 group-hover:text-cyan-300 transition-colors uppercase tracking-wider">
                {stat.label}
            </div>

            {/* Border glow on hover */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    boxShadow: isHovered
                        ? 'inset 0 0 0 1px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.2)'
                        : 'inset 0 0 0 1px rgba(34, 211, 238, 0.1), 0 0 0px rgba(34, 211, 238, 0)'
                }}
            />
        </motion.div>
    );
}

/**
 * Experience section - Pilot Mission Log
 */
export function ExperienceSection() {
    const timelineItems = EXPERIENCES.map((exp) => ({
        id: exp.id,
        date: `${exp.startDate} - ${exp.endDate}`,
        title: exp.position,
        subtitle: exp.company,
        description: exp.responsibilities,
        achievements: exp.achievements,
        technologies: exp.technologies,
        logo: exp.logo,
    }));

    const stats = [
        { value: '2+', label: 'Years Active', code: 'TIME_LOGGED' },
        { value: '3+', label: 'Stations', code: 'DEPLOY_COUNT' },
        { value: '5+', label: 'Missions', code: 'OPS_COMPLETE' },
        { value: '10+', label: 'Crew Led', code: 'TEAM_SIZE' },
    ];

    return (
        <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
            {/* HUD Background grid */}
            <div className="absolute inset-0 bg-hud-grid opacity-20" />

            {/* Background decorations */}
            <div className="absolute top-1/3 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-magenta-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-500 mb-2">
                        <span className="text-gray-600">[</span>
                        MISSION_LOG
                        <span className="text-gray-600">]</span>
                    </div>
                    <SectionTitle
                        title="Mission History"
                        subtitle="Deployment record and operational experience"
                    />
                </div>

                {/* Stats row - HUD Data Panels */}
                <motion.div
                    variants={SLIDE_UP_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} stat={stat} index={index} />
                    ))}
                </motion.div>

                {/* Timeline - Mission Log */}
                <div className="relative">
                    {/* Timeline header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-500/20">
                        <span className="text-[10px] font-mono text-cyan-600 uppercase tracking-wider">
                            &lt; CHRONOLOGICAL_RECORD &gt;
                        </span>
                        <span className="text-[10px] font-mono text-gray-600">
                            ENTRIES: {EXPERIENCES.length}
                        </span>
                    </div>
                    <Timeline items={timelineItems} />
                </div>

                {/* Current status indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <motion.div
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border border-cyan-500/30"
                        style={{
                            clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)'
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75"
                                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></span>
                            <span className="relative inline-flex h-3 w-3 bg-green-500"
                                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></span>
                        </span>
                        <span className="text-gray-300 font-['Rajdhani'] text-sm">
                            <span className="text-cyan-500 font-mono text-xs">STATUS:</span> Active at{' '}
                            <span className="text-cyan-400 font-['Orbitron'] font-medium">Learning Chain</span>
                            <span className="text-gray-500 mx-2">|</span>
                            <span className="text-magenta-400">Assistant Manager</span>
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
