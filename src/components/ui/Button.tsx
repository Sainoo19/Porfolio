/**
 * @fileoverview Button Component - Mecha HUD Style
 * @description Cyberpunk HUD button with tech effects
 */

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ButtonProps } from '../../types';
import { TAP_SCALE } from '../../constants';

const VARIANT_STYLES = {
    primary: 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-gray-950 hover:from-cyan-500 hover:to-cyan-400 font-semibold',
    secondary: 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/40 hover:border-cyan-400',
    outline: 'border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400',
    ghost: 'text-cyan-400 hover:bg-cyan-500/10',
} as const;

const GLOW_COLORS = {
    primary: 'rgba(34, 211, 238, 0.5)',
    secondary: 'rgba(34, 211, 238, 0.3)',
    outline: 'rgba(34, 211, 238, 0.3)',
    ghost: 'rgba(34, 211, 238, 0.1)',
} as const;

const SIZE_STYLES = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
} as const;

/**
 * Animated button component with variants
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            disabled = false,
            leftIcon,
            rightIcon,
            className = '',
            type = 'button',
            onDrag,
            onDragStart,
            onDragEnd,
            onDragCapture,
            onDragStartCapture,
            onDragEndCapture,
            onDragOver,
            onDragLeave,
            onDrop,
            onDragOverCapture,
            onDragLeaveCapture,
            onDropCapture,
            onAnimationStart,
            onAnimationEnd,
            onAnimationIteration,
            onAnimationStartCapture,
            onAnimationEndCapture,
            onAnimationIterationCapture,
            onTransitionStart,
            onTransitionEnd,
            onTransitionStartCapture,
            onTransitionEndCapture,
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);
        const baseStyles = "relative inline-flex items-center justify-center gap-2 font-['Orbitron'] uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

        return (
            <motion.button
                ref={ref}
                type={type}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={TAP_SCALE}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{
                    boxShadow: isHovered
                        ? `0 0 30px ${GLOW_COLORS[variant]}, 0 10px 40px -10px ${GLOW_COLORS[variant]}`
                        : `0 4px 15px -3px ${GLOW_COLORS[variant]}`,
                }}
                className={`${baseStyles} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {/* Scan line effect on hover */}
                {isHovered && variant === 'primary' && (
                    <motion.span
                        initial={{ top: 0, opacity: 0 }}
                        animate={{ top: '100%', opacity: [0, 0.5, 0] }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
                    />
                )}
                {/* Corner brackets */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
                {isLoading && (
                    <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
