/**
 * @fileoverview Tech Badge Component - Mecha HUD Module Tag
 * @description Badge for displaying technology/skill tags with HUD styling
 */

import { motion } from 'framer-motion';

interface TechBadgeProps {
    name: string;
    variant?: 'default' | 'outline' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const VARIANT_STYLES = {
    default: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    outline: 'bg-transparent border-cyan-500/20 text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300',
    glow: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/20',
} as const;

const SIZE_STYLES = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
} as const;

/**
 * Tech badge component - HUD Module Tag
 */
export function TechBadge({
    name,
    variant = 'default',
    size = 'md',
    className = '',
}: TechBadgeProps) {
    return (
        <motion.span
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            style={{
                clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)'
            }}
            className={`
        inline-flex items-center gap-1.5 border font-mono uppercase tracking-wider
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
 * Animated tech stack display - Module Array
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
