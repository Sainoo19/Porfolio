/**
 * @fileoverview 3D Card Component
 * @description Interactive card with 3D tilt and hover effects
 */

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Card3DProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
}

/**
 * Interactive 3D card with tilt and glow on hover
 */
export function Card3D({
    children,
    className = '',
    glowColor = 'rgba(99, 102, 241, 0.3)',
}: Card3DProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotationX = (y - centerY) / 10;
        const rotationY = (centerX - x) / 10;

        setRotateX(rotationX);
        setRotateY(rotationY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovering(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: isHovering ? rotateX : 0,
                rotateY: isHovering ? rotateY : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
            className={`relative ${className}`}
        >
            <motion.div
                animate={{
                    boxShadow: isHovering
                        ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`
                        : 'none',
                }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </motion.div>

            {/* Shine/light effect on hover */}
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    }}
                />
            )}
        </motion.div>
    );
}
