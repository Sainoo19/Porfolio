/**
 * @fileoverview Glass Card Component
 * @description Glassmorphism card with blur effects and 3D hover
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { CardProps } from '../../types';
import { SCALE_VARIANTS } from '../../constants';

/**
 * Glassmorphism card component with 3D tilt effect
 */
export function GlassCard({
    children,
    className = '',
    hoverable = true,
}: CardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || !hoverable) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX((y - centerY) / 25);
        setRotateY((centerX - x) / 25);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            variants={SCALE_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: hoverable ? rotateX : 0,
                rotateY: hoverable ? rotateY : 0,
                scale: isHovered && hoverable ? 1.02 : 1,
                y: isHovered && hoverable ? -5 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
            className={`
        relative overflow-hidden rounded-3xl p-8
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/10
        shadow-2xl shadow-black/20
        transition-colors duration-500
        before:absolute before:inset-0 before:-z-10
        before:bg-gradient-to-br before:from-indigo-500/10 before:to-purple-500/10
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100
        hover:border-white/20
        ${className}
      `}
        >
            {/* Dynamic glow on hover */}
            <motion.div
                className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"
                animate={{ opacity: isHovered ? 0.8 : 0.5 }}
            />
            <motion.div
                className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
                animate={{ opacity: isHovered ? 0.8 : 0.5 }}
            />

            {/* Shine effect on hover */}
            {isHovered && hoverable && (
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: 0.3, x: '200%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -z-0 pointer-events-none"
                    style={{ transform: 'skewX(-20deg)' }}
                />
            )}

            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
