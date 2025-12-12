/**
 * @fileoverview Tech Badge Component
 * @description Badge for displaying technology/skill tags
 */

import { motion } from 'framer-motion';

interface TechBadgeProps {
    name: string;
    variant?: 'default' | 'outline' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const VARIANT_STYLES = {
    default: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    outline: 'bg-transparent border-white/20 text-gray-300 hover:border-indigo-500/50 hover:text-indigo-300',
    glow: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/50 shadow-lg shadow-indigo-500/20',
} as const;

const SIZE_STYLES = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
} as const;

/**
 * Tech badge component with hover effects
 */
export function TechBadge({
    name,
    variant = 'default',
    size = 'md',
    className = '',
}: TechBadgeProps) {
    return (
        <motion.span
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        transition-all duration-300 cursor-default
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${className}
      `}
        >
            {name}
        </motion.span>
    );
}

/**
 * Animated tech stack display
 */
export function TechStack({ technologies }: { technologies: string[] }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
        >
            {technologies.map((tech, index) => (
                <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                >
                    <TechBadge name={tech} variant="outline" />
                </motion.div>
            ))}
        </motion.div>
    );
}
