/**
 * @fileoverview Timeline Component
 * @description Animated vertical timeline for experience/education with 3D effects
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
 * Timeline item component with 3D hover effect
 */
function TimelineItem({ item, index }: { item: TimelineItemData; index: number }) {
    const isEven = index % 2 === 0;
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
            {/* Timeline dot with pulse */}
            <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-gray-900 z-10 hidden md:block"
                animate={{
                    boxShadow: isHovered
                        ? '0 0 20px rgba(99, 102, 241, 0.8)'
                        : '0 0 0px rgba(99, 102, 241, 0)'
                }}
            />

            {/* Mobile dot */}
            <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-gray-900 z-10 md:hidden" />

            {/* Date */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} hidden md:block`}
            >
                <motion.span
                    className="text-indigo-400 font-mono text-sm bg-indigo-500/10 px-3 py-1 rounded-full inline-block"
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                        backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)'
                    }}
                >
                    {item.date}
                </motion.span>
            </motion.div>

            {/* Content with 3D effect */}
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
                <span className="text-indigo-400 font-mono text-sm bg-indigo-500/10 px-3 py-1 rounded-full md:hidden inline-block mb-3">
                    {item.date}
                </span>

                <motion.div
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-colors duration-300 group relative overflow-hidden"
                    animate={{
                        borderColor: isHovered ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isHovered
                            ? '0 25px 50px -12px rgba(99, 102, 241, 0.25), 0 0 30px rgba(99, 102, 241, 0.1)'
                            : '0 10px 40px -15px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    {/* Shine effect */}
                    {isHovered && (
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: '200%', opacity: 0.3 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                            style={{ transform: 'skewX(-20deg)' }}
                        />
                    )}

                    <div className="flex items-start gap-5 mb-3">
                        {item.logo && (
                            <motion.img
                                src={item.logo}
                                alt={`${item.subtitle} logo`}
                                className="h-16 w-16 rounded-xl object-contain bg-white/5 border border-white/10 p-2 flex-shrink-0"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">
                                {item.title}
                            </h3>
                            <p className="text-indigo-400 font-semibold text-lg">{item.subtitle}</p>
                        </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                        {item.description.slice(0, 3).map((desc, i) => (
                            <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                <span className="text-indigo-400 mt-1.5">•</span>
                                {desc}
                            </li>
                        ))}
                    </ul>

                    {item.achievements && item.achievements.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                                Key Achievements
                            </p>
                            {item.achievements.map((achievement, i) => (
                                <div key={i} className="mb-2">
                                    <p className="text-indigo-300 text-sm font-medium">
                                        {achievement.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {item.technologies.map((tech) => (
                                <motion.span
                                    key={tech}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="px-2 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-md cursor-default"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

/**
 * Animated timeline component
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
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden md:block" />

            {/* Mobile line */}
            <div className="absolute left-[7px] top-0 w-0.5 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent md:hidden" />

            <div className="space-y-12">
                {items.map((item, index) => (
                    <TimelineItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </motion.div>
    );
}
