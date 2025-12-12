/**
 * @fileoverview Button Component
 * @description Animated button with multiple variants and glow effects
 */

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ButtonProps } from '../../types';
import { TAP_SCALE } from '../../constants';

const VARIANT_STYLES = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500',
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20',
    outline: 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10',
    ghost: 'text-white hover:bg-white/10',
} as const;

const GLOW_COLORS = {
    primary: 'rgba(99, 102, 241, 0.5)',
    secondary: 'rgba(255, 255, 255, 0.2)',
    outline: 'rgba(99, 102, 241, 0.3)',
    ghost: 'rgba(255, 255, 255, 0.1)',
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
        const baseStyles = 'relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

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
                {/* Shine effect on hover */}
                {isHovered && variant === 'primary' && (
                    <motion.span
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: '200%', opacity: 0.3 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                        style={{ transform: 'skewX(-20deg)' }}
                    />
                )}
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
