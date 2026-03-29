/**
 * @fileoverview About Section Component - Mecha HUD Style
 * @description Personal introduction with pilot profile display
 */

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code2, Shield, Cpu, Activity } from 'lucide-react';
import { SectionTitle, GlassCard } from '../ui';
import { PERSONAL_INFO, EDUCATION, CERTIFICATIONS } from '../../constants';
import { SLIDE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS, SCALE_VARIANTS } from '../../constants';
import avatarImage from '../../assets/avatar/avatar.jpg';

const HIGHLIGHTS = [
    {
        icon: Code2,
        title: 'Full-Stack Developer',
        description: 'Expertise in .NET, React, and modern web technologies',
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/20',
        borderColor: 'border-cyan-500/30',
    },
    {
        icon: Briefcase,
        title: 'Project Coordinator',
        description: 'Experience managing Agile workflows and cross-functional teams',
        color: 'text-magenta-400',
        bgColor: 'bg-magenta-500/20',
        borderColor: 'border-magenta-500/30',
    },
    {
        icon: GraduationCap,
        title: 'Software Engineering',
        description: `Van Lang University - GPA: ${EDUCATION[0].gpa}/4.0`,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/20',
        borderColor: 'border-cyan-500/30',
    },
    {
        icon: Award,
        title: 'Certifications',
        description: 'ECBA & CAPM certifications in progress',
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500/30',
    },
];

import { memo } from 'react';

/**
 * About section with pilot profile
 */
export const AboutSection = memo(function AboutSection() {
    return (
        <section id="about" className="relative py-16 md:py-20 overflow-hidden">
            {/* HUD Grid Background */}
            <div className="absolute inset-0 bg-hud-grid opacity-30" />

            {/* Background decorations - Cyberpunk colors */}
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-magenta-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                <SectionTitle
                    title="Pilot Profile"
                    subtitle="System operator information and capability assessment"
                    sectionId="ABT-001"
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Pilot ID Card */}
                    <motion.div
                        variants={SCALE_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-sm mx-auto">
                            {/* HUD frame */}
                            <div className="absolute inset-0 border-2 border-cyan-500/40"
                                style={{ clipPath: 'polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))' }}
                            >
                                {/* Top border glow */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                            </div>

                            {/* Avatar Image */}
                            <div className="absolute inset-4 overflow-hidden"
                                style={{ clipPath: 'polygon(0 15px, 15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px))' }}
                            >
                                <motion.img
                                    src={avatarImage}
                                    alt={PERSONAL_INFO.name}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    whileHover={{ scale: 1.05 }}
                                />
                                {/* Scan line overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent pointer-events-none"
                                    animate={{ opacity: [0.3, 0.1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-cyan-500/10" />
                            </div>

                            {/* Corner brackets */}
                            <svg className="absolute top-0 left-0 w-8 h-8 text-cyan-500" viewBox="0 0 32 32" fill="none">
                                <path d="M0 12 L0 0 L12 0" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <svg className="absolute top-0 right-0 w-8 h-8 text-cyan-500" viewBox="0 0 32 32" fill="none">
                                <path d="M32 12 L32 0 L20 0" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <svg className="absolute bottom-0 left-0 w-8 h-8 text-cyan-500" viewBox="0 0 32 32" fill="none">
                                <path d="M0 20 L0 32 L12 32" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <svg className="absolute bottom-0 right-0 w-8 h-8 text-cyan-500" viewBox="0 0 32 32" fill="none">
                                <path d="M32 20 L32 32 L20 32" stroke="currentColor" strokeWidth="2" />
                            </svg>

                            {/* Floating status badges - HUD style */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-4 -right-4 px-3 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/40 flex items-center gap-2"
                                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
                            >
                                <Activity size={14} className="text-green-400" />
                                <span className="text-cyan-400 text-xs font-mono uppercase">Status: Active</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-4 -left-4 px-3 py-2 bg-magenta-500/10 backdrop-blur-sm border border-magenta-500/40 flex items-center gap-2"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                            >
                                <Shield size={14} className="text-magenta-400" />
                                <span className="text-magenta-400 text-xs font-mono uppercase">Exp: 2+ Years</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right side - Pilot Data */}
                    <motion.div
                        variants={STAGGER_CONTAINER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <motion.div variants={SLIDE_UP_VARIANTS}>
                            <div className="flex items-center gap-3 mb-3">
                                <Cpu className="text-cyan-400" size={22} />
                                <span className="text-sm font-mono text-cyan-400 tracking-widest">PILOT_DESIGNATION</span>
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 font-['Orbitron'] uppercase tracking-wide">
                                Software Engineer & Project Coordinator
                            </h3>
                            <p className="text-gray-200 text-base md:text-lg leading-relaxed font-['Rajdhani']">
                                {PERSONAL_INFO.summary}
                            </p>
                        </motion.div>

                        {/* Capability Assessment Grid */}
                        <motion.div
                            variants={SLIDE_UP_VARIANTS}
                            className="grid grid-cols-2 gap-3 mt-6"
                        >
                            {HIGHLIGHTS.map((highlight, index) => (
                                <motion.div
                                    key={highlight.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className={`p-3 bg-gray-900/50 backdrop-blur-sm border ${highlight.borderColor} hover:border-cyan-400/60 transition-all group`}
                                    style={{ clipPath: 'polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
                                >
                                    <div className={`w-10 h-10 ${highlight.bgColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border ${highlight.borderColor}`}
                                        style={{ clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)' }}
                                    >
                                        <highlight.icon className={highlight.color} size={18} />
                                    </div>
                                    <h4 className="text-white font-semibold text-sm mb-1 font-['Orbitron'] uppercase tracking-wide">{highlight.title}</h4>
                                    <p className="text-gray-300 text-sm font-['Rajdhani']">{highlight.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Certifications in progress - HUD style */}
                        <motion.div variants={SLIDE_UP_VARIANTS}>
                            <GlassCard className="mt-6">
                                <h4 className="text-base font-semibold text-cyan-400 mb-3 flex items-center gap-2 font-['Orbitron'] uppercase tracking-wide">
                                    <Award className="text-magenta-400" size={18} />
                                    Training Modules
                                </h4>
                                <div className="space-y-2">
                                    {CERTIFICATIONS.map((cert) => (
                                        <div key={cert.id} className="flex items-center justify-between p-2 bg-gray-950/50 border border-cyan-500/20">
                                            <div>
                                                <p className="text-white font-medium text-base font-['Rajdhani']">{cert.name}</p>
                                                <p className="text-gray-400 text-sm font-mono">{cert.issuer}</p>
                                            </div>
                                            <span className="px-3 py-1 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 font-mono uppercase">
                                                {cert.status === 'in-progress' ? 'Loading...' : cert.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});
