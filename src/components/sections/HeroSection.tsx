/**
 * @fileoverview Hero Section Component - Mecha Gundam Cyberpunk Style
 * @description Landing section with pilot helmet HUD effect
 */

import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, MapPin, FileText, Cpu, Wifi, Shield, Crosshair } from 'lucide-react';
import { HeroScene } from '../three/HeroScene';
import { PilotHUDBackground } from '../three/PilotHUDBackground';
import { TypewriterText } from '../ui';
import { Button } from '../ui';
import { PERSONAL_INFO } from '../../constants';
import { FADE_IN_VARIANTS, SLIDE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS } from '../../constants';

const ROLES = [
    'Project Coordinator',
    'Business Analyst',
    'Full-Stack Developer',
];

// Letter animation for "WOW" effect - memoized outside component
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

// Memoized floating particles - generated once
const FloatingParticles = memo(function FloatingParticles() {
    // Generate particle data once using useMemo
    const particleData = useMemo(() =>
        [...Array(12)].map((_, i) => ({
            id: i,
            initialX: Math.random() * 1000,
            initialY: Math.random() * 800,
            animateY: Math.random() * -500 - 100,
            duration: 5 + Math.random() * 5,
            delay: Math.random() * 5,
        })), []
    );

    return (
        <>
            {particleData.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 bg-cyan-400/60 rounded-full z-15"
                    initial={{ x: p.initialX, y: p.initialY }}
                    animate={{ y: [null, p.animateY], opacity: [0, 1, 0] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
                />
            ))}
        </>
    );
});

/**
 * Hero section with 3D scene and animated content
 */
export function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Throttled mouse move handler
    useEffect(() => {
        let ticking = false;

        const handleMouseMove = (e: MouseEvent) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const { clientX, clientY } = e;
                    const x = (clientX / window.innerWidth - 0.5) * 20;
                    const y = (clientY / window.innerHeight - 0.5) * 20;
                    setMousePosition({ x, y });
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleScrollDown = useCallback(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const greeting = "Hi, I'm";
    const name = PERSONAL_INFO.name.split(' ').slice(-1)[0];

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Helmet-view depth scene */}
            <HeroScene className="z-0 opacity-55" />

            {/* Pilot Helmet HUD Background */}
            <PilotHUDBackground className="z-5" />

            {/* Animated gradient background - Cyberpunk style */}
            <motion.div
                className="absolute inset-0 z-5"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(217, 70, 239, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* HUD Grid background */}
            <div className="absolute inset-0 z-5 opacity-20">
                <div className="w-full h-full bg-hud-grid" />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950 z-10 pointer-events-none" />

            {/* Floating particles - Memoized component */}
            <FloatingParticles />

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
                {/* Location badge - HUD Style */}
                <motion.div variants={FADE_IN_VARIANTS} className="mb-6">
                    <motion.span
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/5 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-sm font-mono uppercase tracking-wider"
                        style={{
                            clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
                            borderColor: 'rgba(34, 211, 238, 0.6)',
                        }}
                    >
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <MapPin size={16} className="text-magenta-400" />
                        </motion.span>
                        <span className="text-cyan-500/50">[LOC]</span> {PERSONAL_INFO.location}
                    </motion.span>
                </motion.div>

                {/* Pilot ID Header */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    className="mb-4 flex items-center justify-center gap-4"
                >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500" />
                    <span className="text-xs font-mono text-cyan-400/60 tracking-widest">PILOT_ID: NVT-001</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500" />
                </motion.div>

                {/* Animated Name with letter-by-letter reveal - HUD Style */}
                <motion.h1
                    variants={SLIDE_UP_VARIANTS}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight leading-tight font-['Orbitron']"
                >
                    {/* Greeting */}
                    <span className="block text-cyan-100 mb-2">
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

                    {/* Name with glow effect - Cyan/Magenta gradient */}
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
                        <span
                            className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-cyan-400 bg-clip-text text-transparent"
                            style={{
                                textShadow: '0 0 40px rgba(34, 211, 238, 0.5)',
                                filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.3))'
                            }}
                        >
                            {name}
                        </span>
                    </motion.span>
                </motion.h1>

                {/* Role with enhanced typewriter effect - HUD Style */}
                <motion.div variants={SLIDE_UP_VARIANTS} className="mb-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-300 font-light flex items-center justify-center gap-3 font-['Rajdhani']">
                        <span className="text-cyan-500/50">&lt;</span>
                        <span>I'm a</span>
                        <motion.span
                            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-400 font-['Orbitron']"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            <TypewriterText words={ROLES} />
                        </motion.span>
                        <span className="text-cyan-500/50">/&gt;</span>
                    </h2>
                </motion.div>

                {/* Summary with animated highlight - HUD Style */}
                <motion.p
                    variants={SLIDE_UP_VARIANTS}
                    className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed font-['Rajdhani']"
                >
                    Bridging technical expertise with project management skills to deliver
                    <motion.span
                        className="relative inline-block mx-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="relative z-10 text-cyan-400 font-semibold">exceptional results</span>
                        <motion.span
                            className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 -z-0"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            style={{ originX: 0 }}
                        />
                    </motion.span>
                    . Passionate about clean code and efficient workflows.
                </motion.p>

                {/* Status indicators - Mecha style */}
                <motion.div
                    variants={FADE_IN_VARIANTS}
                    className="flex items-center justify-center gap-6 mb-8 text-xs font-mono"
                >
                    {[
                        { icon: Cpu, label: 'SYS', status: 'READY', color: 'text-green-400' },
                        { icon: Wifi, label: 'NET', status: 'ONLINE', color: 'text-cyan-400' },
                        { icon: Shield, label: 'DEF', status: 'ACTIVE', color: 'text-magenta-400' },
                    ].map(({ icon: Icon, label, status, color }) => (
                        <motion.div
                            key={label}
                            className="flex items-center gap-2 text-gray-500"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Icon size={14} className={color} />
                            <span>{label}:</span>
                            <span className={color}>{status}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons with HUD effects */}
                <motion.div
                    variants={SLIDE_UP_VARIANTS}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="primary"
                            size="md"
                            className="text-base px-6 py-2.5 relative overflow-hidden group font-['Orbitron'] uppercase tracking-wider"
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <Crosshair size={18} className="group-hover:animate-pulse" />
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
                            size="md"
                            className="text-base px-6 py-2.5 font-['Orbitron'] uppercase tracking-wider"
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
                            className="inline-flex items-center gap-2 text-sm px-6 py-3 bg-transparent border border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 font-['Orbitron'] uppercase tracking-wider transition-all duration-300"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)'
                            }}
                        >
                            <FileText size={18} />
                            View My CV
                        </a>
                    </motion.div>
                </motion.div>

                {/* Social Links - HUD Style */}
                <motion.div variants={FADE_IN_VARIANTS} className="flex items-center justify-center gap-4">
                    {[
                        //{ icon: Github, href: 'https://github.com/Sainoo19', label: 'GitHub', color: 'hover:text-cyan-400 hover:border-cyan-500/60' },
                        //{ icon: Linkedin, href: 'https://linkedin.com/in/nvtrung19', label: 'LinkedIn', color: 'hover:text-cyan-400 hover:border-cyan-500/60' },
                        { icon: Mail, href: 'mailto:nvtrung19.work@gmail.com', label: 'Email', color: 'hover:text-magenta-400 hover:border-magenta-500/60' },
                    ].map(({ icon: Icon, href, label, color }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                                scale: 1.1,
                                y: -3,
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-3 bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 text-gray-400 ${color} transition-all`}
                            style={{
                                clipPath: 'polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
                            }}
                            aria-label={label}
                        >
                            <Icon size={20} />
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator - HUD Style */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                onClick={handleScrollDown}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-cyan-400/60 hover:text-cyan-400 transition-colors cursor-pointer group"
            >
                <motion.span
                    className="text-xs uppercase tracking-[0.2em] font-mono"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    &lt; SCROLL_DOWN /&gt;
                </motion.span>
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="p-2 border border-cyan-500/30 group-hover:border-cyan-500/60 transition-colors"
                    style={{
                        clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'
                    }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.button>

            {/* Enhanced decorative elements - Cyberpunk colors */}
            <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-magenta-500/15 rounded-full blur-[150px] pointer-events-none"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 12, repeat: Infinity }}
            />
        </section>
    );
}
