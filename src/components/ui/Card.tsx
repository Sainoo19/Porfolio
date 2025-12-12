/**
 * @fileoverview Card Component
 * @description Animated card with hover effects
 */

import { motion } from 'framer-motion';
import type { CardProps } from '../../types';
import { HOVER_LIFT } from '../../constants';

/**
 * Animated card component
 */
export function Card({
    children,
    className = '',
    hoverable = true,
    bordered = false,
    gradient = false,
}: CardProps) {
    const baseStyles = 'rounded-2xl p-6 transition-all duration-300';
    const hoverStyles = hoverable ? 'hover:shadow-xl hover:shadow-indigo-500/10' : '';
    const borderStyles = bordered ? 'border border-white/10' : '';
    const bgStyles = gradient
        ? 'bg-gradient-to-br from-white/10 to-white/5'
        : 'bg-white/5';

    return (
        <motion.div
            whileHover={hoverable ? HOVER_LIFT : undefined}
            className={`${baseStyles} ${bgStyles} ${hoverStyles} ${borderStyles} ${className}`}
        >
            {children}
        </motion.div>
    );
}
