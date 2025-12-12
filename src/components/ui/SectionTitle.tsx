/**
 * @fileoverview Section Title Component
 * @description Animated section titles with gradient text
 */

import { motion } from 'framer-motion';
import { SLIDE_UP_VARIANTS } from '../../constants';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

/**
 * Animated section title with gradient text
 */
export function SectionTitle({
    title,
    subtitle,
    align = 'center',
    className = '',
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                    {title}
                </span>
            </h2>
            {subtitle && (
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}

            {/* Decorative line */}
            <div className={`flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'} mt-6`}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
            </div>
        </motion.div>
    );
}
