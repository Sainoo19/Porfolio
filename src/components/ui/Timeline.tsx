/**
 * @fileoverview Timeline Component - Mecha HUD Mission Log
 * @description Animated vertical timeline with HUD styling for experience/education
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { STAGGER_CONTAINER_VARIANTS, SLIDE_LEFT_VARIANTS } from '../../constants';

interface TimelineItemData {
    id: string;
    date: string;
    title: string;
    subtitle: string;
    description: string[];
    achievements?: { title: string; description: string }[];
    technologies?: string[];
    logo?: string;
}

interface TimelineProps {
    items: TimelineItemData[];
}

/**
 * Timeline item component - Mission Entry with HUD style
 */
function TimelineItem({ item, index }: { item: TimelineItemData; index: number }) {
    const isEven = index % 2 === 0;
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const missionId = `MSN-${String(index + 1).padStart(3, '0')}`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX((y - centerY) / 15);
        setRotateY((centerX - x) / 15);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            variants={SLIDE_LEFT_VARIANTS}
            className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
        >
            {/* Timeline dot - HUD Diamond */}
            <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 z-10 hidden md:block"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                animate={{
                    boxShadow: isHovered
                        ? '0 0 20px rgba(34, 211, 238, 0.8)'
                        : '0 0 0px rgba(34, 211, 238, 0)'
                }}
            />

            {/* Mobile dot */}
            <div
                className="absolute left-0 top-0 w-4 h-4 bg-cyan-500 z-10 md:hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            />

            {/* Date Badge */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} hidden md:block`}
            >
                <motion.span
                    className="text-cyan-400 font-mono text-xs px-3 py-1 border border-cyan-500/30 bg-cyan-500/10 inline-block"
                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                    animate={{
                        scale: isHovered ? 1.05 : 1,
                        borderColor: isHovered ? 'rgba(34, 211, 238, 0.5)' : 'rgba(34, 211, 238, 0.3)'
                    }}
                >
                    {item.date}
                </motion.span>
            </motion.div>

            {/* Content with 3D effect - Mission Panel */}
            <motion.div
                ref={cardRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                }}
                className={`md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} pl-8 md:pl-0`}
            >
                {/* Mobile date */}
                <span
                    className="text-cyan-400 font-mono text-xs px-3 py-1 border border-cyan-500/30 bg-cyan-500/10 md:hidden inline-block mb-3"
                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                >
                    {item.date}
                </span>

                <motion.div
                    className="relative overflow-hidden border border-cyan-500/20 transition-colors duration-300 group"
                    style={{
                        clipPath: 'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
                        background: 'linear-gradient(to bottom right, rgba(8, 47, 73, 0.5), rgba(15, 23, 42, 0.7))'
                    }}
                    animate={{
                        borderColor: isHovered ? 'rgba(34, 211, 238, 0.5)' : 'rgba(34, 211, 238, 0.2)',
                        boxShadow: isHovered
                            ? '0 25px 50px -12px rgba(34, 211, 238, 0.2), 0 0 30px rgba(34, 211, 238, 0.1)'
                            : '0 10px 40px -15px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {/* Corner brackets */}
                    <svg className="absolute top-2 left-2 w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                        <path d="M0 16 L0 0 L16 0" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                    <svg className="absolute top-2 right-2 w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                        <path d="M16 16 L16 0 L0 0" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                    <svg className="absolute bottom-2 left-2 w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                        <path d="M0 0 L0 16 L16 16" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                    <svg className="absolute bottom-2 right-2 w-5 h-5 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
                        <path d="M16 0 L16 16 L0 16" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>

                    {/* Scan line effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent animate-scan-line" />
                    </div>

                    {/* Shine effect */}
                    {isHovered && (
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: '200%', opacity: 0.2 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                            style={{ transform: 'skewX(-20deg)' }}
                        />
                    )}

                    {/* Panel content */}
                    <div className="p-6">
                        {/* Mission ID header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-500/10">
                            <span className="text-[10px] font-mono text-cyan-600">{missionId}</span>
                            <span className="text-[10px] font-mono text-green-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                COMPLETED
                            </span>
                        </div>

                        <div className="flex items-start gap-5 mb-3">
                            {item.logo && (
                                <motion.div
                                    className="relative h-16 w-16 flex-shrink-0 border border-cyan-500/20 bg-slate-900/50 p-2"
                                    style={{ clipPath: 'polygon(0 6px, 6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px))' }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src={item.logo}
                                        alt={`${item.subtitle} logo`}
                                        className="h-full w-full object-contain"
                                    />
                                </motion.div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-xl font-['Orbitron'] font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-cyan-400 font-['Rajdhani'] font-semibold text-lg">{item.subtitle}</p>
                            </div>
                        </div>

                        {/* Responsibilities */}
                        <ul className="space-y-2 mb-4">
                            {item.description.slice(0, 3).map((desc, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2 font-['Rajdhani']">
                                    <span className="text-cyan-500 font-mono text-xs mt-0.5">&gt;</span>
                                    {desc}
                                </li>
                            ))}
                        </ul>

                        {/* Achievements */}
                        {item.achievements && item.achievements.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-cyan-500/10">
                                <p className="text-[10px] uppercase tracking-wider text-cyan-600 font-mono mb-2">
                                    [ACHIEVEMENTS]
                                </p>
                                {item.achievements.map((achievement, i) => (
                                    <div key={i} className="mb-2">
                                        <p className="text-cyan-300 text-sm font-['Rajdhani'] flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-magenta-400" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                                            {achievement.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Technologies */}
                        {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-cyan-500/10">
                                <span className="text-[10px] font-mono text-gray-600 mr-2">TECH_STACK:</span>
                                {item.technologies.map((tech) => (
                                    <motion.span
                                        key={tech}
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        className="px-2 py-0.5 text-[10px] font-mono border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 cursor-default"
                                        style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

/**
 * Animated timeline component - Mission Log Display
 */
export function Timeline({ items }: TimelineProps) {
    return (
        <motion.div
            variants={STAGGER_CONTAINER_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
        >
            {/* Center line - HUD style */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full hidden md:block">
                <div className="w-full h-full bg-gradient-to-b from-cyan-500 via-magenta-500 to-transparent" />
                {/* Line decorations */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-cyan-500 bg-slate-900"
                    style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </div>

            {/* Mobile line */}
            <div className="absolute left-[7px] top-0 w-px h-full md:hidden">
                <div className="w-full h-full bg-gradient-to-b from-cyan-500 via-magenta-500 to-transparent" />
            </div>

            <div className="space-y-12">
                {items.map((item, index) => (
                    <TimelineItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </motion.div>
    );
}
