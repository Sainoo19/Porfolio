/**
 * @fileoverview Glass Card Component - Mecha HUD Style
 * @description Cyberpunk HUD panel with tech borders and effects
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { CardProps } from '../../types';
import { SCALE_VARIANTS } from '../../constants';

/**
 * Mecha HUD Panel component with cyberpunk styling
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
        setRotateX((y - centerY) / 30);
        setRotateY((centerX - x) / 30);
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
                clipPath: 'polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
            className={`
                relative overflow-hidden p-6
                bg-gradient-to-br from-gray-900/90 via-gray-950/95 to-gray-900/90
                backdrop-blur-xl
                border border-cyan-500/30
                transition-all duration-300
                hover:border-cyan-400/60
                hover:shadow-lg hover:shadow-cyan-500/20
                ${className}
            `}
        >
            {/* Top border glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

            {/* Bottom border glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magenta-500/50 to-transparent" />

            {/* Corner brackets */}
            <svg className="absolute top-0 left-0 w-6 h-6 text-cyan-500/60" viewBox="0 0 24 24" fill="none">
                <path d="M0 8 L0 0 L8 0" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="absolute top-0 right-0 w-6 h-6 text-cyan-500/60" viewBox="0 0 24 24" fill="none">
                <path d="M24 8 L24 0 L16 0" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-0 left-0 w-6 h-6 text-cyan-500/60" viewBox="0 0 24 24" fill="none">
                <path d="M0 16 L0 24 L8 24" stroke="currentColor" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-0 right-0 w-6 h-6 text-cyan-500/60" viewBox="0 0 24 24" fill="none">
                <path d="M24 16 L24 24 L16 24" stroke="currentColor" strokeWidth="2" />
            </svg>

            {/* Scan line on hover */}
            {isHovered && hoverable && (
                <motion.div
                    initial={{ top: 0, opacity: 0 }}
                    animate={{ top: '100%', opacity: [0, 0.5, 0] }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none"
                />
            )}

            {/* Glow effect on corners when hovered */}
            <motion.div
                className="absolute -top-12 -left-12 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"
                animate={{ opacity: isHovered ? 0.6 : 0.2 }}
            />
            <motion.div
                className="absolute -bottom-12 -right-12 w-24 h-24 bg-magenta-500/20 rounded-full blur-2xl"
                animate={{ opacity: isHovered ? 0.6 : 0.2 }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
