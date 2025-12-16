/**
 * @fileoverview Section Title Component - Mecha HUD Style
 * @description Cyberpunk HUD section headers
 */

import { motion } from 'framer-motion';
import { SLIDE_UP_VARIANTS } from '../../constants';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
    sectionId?: string;
}

/**
 * HUD-style section title
 */
export function SectionTitle({
    title,
    subtitle,
    align = 'center',
    className = '',
    sectionId = 'SEC',
}: SectionTitleProps) {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <motion.div
            variants={SLIDE_UP_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className={`mb-16 ${alignmentClasses[align]} ${className}`}
        >
            {/* HUD Section indicator */}
            <div className={`flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
                    <span className="text-xs font-mono text-cyan-400/60 tracking-widest">[{sectionId}]</span>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-['Orbitron'] uppercase tracking-wider">
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-magenta-400 bg-clip-text text-transparent">
                    {title}
                </span>
            </h2>
            {subtitle && (
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-['Rajdhani']">
                    {subtitle}
                </p>
            )}

            {/* HUD Decorative line */}
            <div className={`flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'} mt-6`}>
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-3 h-3 border border-cyan-500/60"
                        style={{ clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }}
                        animate={{ rotate: [0, 180, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="w-24 h-px bg-gradient-to-r from-cyan-500 via-magenta-500 to-cyan-500" />
                    <motion.div
                        className="w-3 h-3 border border-magenta-500/60"
                        style={{ clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }}
                        animate={{ rotate: [360, 180, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
