/**
 * @fileoverview Hero Section Component
 * @description Landing section with 3D background and animated text - WOW effect
 */

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, MapPin, Sparkles, FileText } from 'lucide-react';
import { HeroScene } from '../three';
import { TypewriterText, GradientText } from '../ui';
import { Button } from '../ui';
import { PERSONAL_INFO } from '../../constants';
import { FADE_IN_VARIANTS, SLIDE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from '../../constants';

const ROLES = [
    'Project Coordinator',
    'Business Analyst',
    'Full-Stack Developer',
];

// Letter animation for "WOW" effect
const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99] as const,
        },
    }),
};

// Glowing text animation
const glowVariants = {
    animate: {
        textShadow: [
            '0 0 20px rgba(99, 102, 241, 0.5)',
            '0 0 40px rgba(99, 102, 241, 0.8)',
            '0 0 60px rgba(168, 85, 247, 0.6)',
            '0 0 40px rgba(99, 102, 241, 0.8)',
            '0 0 20px rgba(99, 102, 241, 0.5)',
        ],
    },
};

/**
 * Hero section with 3D scene and animated content
 */
export function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const controls = useAnimation();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleScrollDown = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const greeting = "Hi, I'm";
    const name = PERSONAL_INFO.name.split(' ').slice(-1)[0];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Background Scene */}
            <HeroScene className="z-0" />

            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 z-5"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-10 pointer-events-none" />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-indigo-400/60 rounded-full z-15"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                    }}
                    animate={{
                        y: [null, Math.random() * -500 - 100],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                />
            ))}

            {/* Content with parallax */}
            <motion.div
                variants={STAGGER_CONTAINER_VARIANTS}
                initial="hidden"
                animate="visible"
                style={{
                    x: mousePosition.x * 0.5,
                    y: mousePosition.y * 0.5,
                }}
                className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                {/* Location badge with glow */}
                <motion.div variants={FADE_IN_VARIANTS} className="mb-8">
                    <motion.span
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 text-base"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
                            borderColor: 'rgba(99, 102, 241, 0.5)',
                        }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <MapPin size={16} className="text-indigo-400" />
                        </motion.span>
                        {PERSONAL_INFO.location}
                    </motion.span>
                </motion.div>

                {/* Animated Name with letter-by-letter reveal */}
                <motion.h1
                    variants={SLIDE_UP_VARIANTS}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight leading-tight"
                >
                    {/* Greeting */}
                    <span className="block text-white mb-2">
                        {greeting.split('').map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="inline-block"
                                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </span>

                    {/* Name with glow effect */}
                    <motion.span
                        className="inline-block pb-2"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: greeting.length * 0.05,
                            duration: 0.6,
                            ease: [0.6, -0.05, 0.01, 0.99],
                        }}
                        style={{ lineHeight: 1.2 }}
                    >
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {name}
                        </span>
                    </motion.span>
                </motion.h1>

                {/* Role with enhanced typewriter effect */}
                <motion.div variants={SLIDE_UP_VARIANTS} className="mb-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-200 font-light flex items-center justify-center gap-3">
                        <span>I'm a</span>
                        <motion.span
                            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            <TypewriterText words={ROLES} />
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Summary with animated highlight */}
                <motion.p
                    variants={SLIDE_UP_VARIANTS}
                    className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    Bridging technical expertise with project management skills to deliver
                    <motion.span
                        className="relative inline-block mx-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="relative z-10 text-white font-semibold">exceptional results</span>
                        <motion.span
                            className="absolute inset-0 bg-indigo-500/20 rounded-lg -z-0"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            style={{ originX: 0 }}
                        />
                    </motion.span>
                    . Passionate about clean code and efficient workflows.
                </motion.p>

                {/* CTA Buttons with enhanced effects */}
                <motion.div
                    variants={SLIDE_UP_VARIANTS}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            className="text-lg px-8 py-4 relative overflow-hidden group"
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Sparkles size={20} className="group-hover:animate-spin" />
                                View My Work
                            </span>
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="secondary"
                            size="lg"
                            className="text-lg px-8 py-4"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Get In Touch
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-lg px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300"
                        >
                            <FileText size={20} />
                            View My CV
                        </a>
                    </motion.div>
                </motion.div>

                {/* Social Links with hover effects */}
                <motion.div variants={FADE_IN_VARIANTS} className="flex items-center justify-center gap-5">
                    {[
                        { icon: Github, href: 'https://github.com/Sainoo19', label: 'GitHub', color: 'hover:text-white' },
                        { icon: Linkedin, href: 'https://linkedin.com/in/nvtrung19', label: 'LinkedIn', color: 'hover:text-blue-400' },
                        { icon: Mail, href: 'mailto:nvtrung19.work@gmail.com', label: 'Email', color: 'hover:text-pink-400' },
                    ].map(({ icon: Icon, href, label, color }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                scale: 1.2,
                                y: -5,
                                boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-gray-400 ${color} hover:border-indigo-500/50 transition-all`}
                            aria-label={label}
                        >
                            <Icon size={24} />
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator with enhanced animation */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                onClick={handleScrollDown}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer group"
            >
                <motion.span
                    className="text-sm uppercase tracking-[0.2em] font-medium"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Scroll Down
                </motion.span>
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="p-2 border border-white/20 rounded-full group-hover:border-indigo-500/50 transition-colors"
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.button>

            {/* Enhanced decorative elements */}
            <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px] pointer-events-none"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 12, repeat: Infinity }}
            />
        </section>
    );
}
