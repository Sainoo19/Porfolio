/**
 * @fileoverview Animated Text Component
 * @description Text animations including typewriter and letter-by-letter effects
 */

import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks';
import { LETTER_ANIMATION_VARIANTS, STAGGER_FAST_VARIANTS } from '../../constants';

interface TypewriterTextProps {
    words: string[];
    className?: string;
}

/**
 * Typewriter effect text component
 */
export function TypewriterText({ words, className = '' }: TypewriterTextProps) {
    const { text } = useTypewriter({
        words,
        typeSpeed: 80,
        deleteSpeed: 40,
        delayBetweenWords: 2500,
        loop: true,
    });

    return (
        <span className={`${className}`}>
            {text}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-[3px] h-[1em] ml-1 bg-indigo-400 align-middle"
            />
        </span>
    );
}

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

/**
 * Letter-by-letter animated text
 */
export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
    const letters = text.split('');

    return (
        <motion.span
            variants={STAGGER_FAST_VARIANTS}
            initial="hidden"
            animate="visible"
            className={`inline-block ${className}`}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={`${letter}-${index}`}
                    variants={LETTER_ANIMATION_VARIANTS}
                    custom={index + delay}
                    className="inline-block"
                    style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    gradient?: string;
}

/**
 * Gradient text component
 */
export function GradientText({
    children,
    className = '',
    gradient = 'from-indigo-400 via-purple-400 to-pink-400',
}: GradientTextProps) {
    return (
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
            {children}
        </span>
    );
}

interface GlitchTextProps {
    text: string;
    className?: string;
}

/**
 * Glitch effect text component
 */
export function GlitchText({ text, className = '' }: GlitchTextProps) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 -translate-x-[2px] translate-y-[2px] text-cyan-400 opacity-70 animate-pulse"
                aria-hidden
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 translate-x-[2px] -translate-y-[2px] text-pink-400 opacity-70 animate-pulse"
                style={{ animationDelay: '0.1s' }}
                aria-hidden
            >
                {text}
            </span>
        </span>
    );
}
