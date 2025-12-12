/**
 * @fileoverview Experience Section Component
 * @description Work experience timeline with animations and 3D effects
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Timeline } from '../ui';
import { EXPERIENCES } from '../../constants';
import { SLIDE_UP_VARIANTS } from '../../constants';

/**
 * 3D Stat Card Component
 */
function StatCard({ stat, index }: { stat: { value: string; label: string }; index: number }) {
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
            }}
            className="relative text-center p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden cursor-pointer group"
        >
            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent 70%)',
                }}
            />

            {/* Shine effect */}
            {isHovered && (
                <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: '200%', opacity: 0.4 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                    style={{ transform: 'skewX(-20deg)' }}
                />
            )}

            <motion.div
                className="relative z-10 text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {stat.value}
            </motion.div>
            <div className="relative z-10 text-gray-400 text-sm mt-2 group-hover:text-gray-300 transition-colors">
                {stat.label}
            </div>

            {/* Border glow on hover */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{
                    boxShadow: isHovered
                        ? 'inset 0 0 0 1px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.2)'
                        : 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0px rgba(99, 102, 241, 0)'
                }}
            />
        </motion.div>
    );
}

/**
 * Experience section with animated timeline
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
        { value: '2+', label: 'Years Experience' },
        { value: '3+', label: 'Companies' },
        { value: '5+', label: 'Projects' },
        { value: '10+', label: 'Team Members Led' },
    ];

    return (
        <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/3 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                <SectionTitle
                    title="Experience"
                    subtitle="My professional journey and the roles I've taken on"
                />

                {/* Stats row with 3D cards */}
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

                {/* Timeline */}
                <Timeline items={timelineItems} />

                {/* Additional note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <motion.div
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-gray-300">
                            Currently at <span className="text-indigo-400 font-medium">Learning Chain</span> as Assistant Manager
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
