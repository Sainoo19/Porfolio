/**
 * @fileoverview About Section Component
 * @description Personal introduction and background information
 */

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';
import { SectionTitle, GlassCard } from '../ui';
import { PERSONAL_INFO, EDUCATION, CERTIFICATIONS } from '../../constants';
import { SLIDE_UP_VARIANTS, STAGGER_CONTAINER_VARIANTS, SCALE_VARIANTS } from '../../constants';

const HIGHLIGHTS = [
    {
        icon: Code2,
        title: 'Full-Stack Developer',
        description: 'Expertise in .NET, React, and modern web technologies',
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-500/20',
    },
    {
        icon: Briefcase,
        title: 'Project Coordinator',
        description: 'Experience managing Agile workflows and cross-functional teams',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
    },
    {
        icon: GraduationCap,
        title: 'Software Engineering',
        description: `Van Lang University - GPA: ${EDUCATION[0].gpa}/4`,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/20',
    },
    {
        icon: Award,
        title: 'Certifications',
        description: 'ECBA & CAPM certifications in progress',
        color: 'text-pink-400',
        bgColor: 'bg-pink-500/20',
    },
];

/**
 * About section with personal introduction
 */
export function AboutSection() {
    return (
        <section id="about" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
                <SectionTitle
                    title="About Me"
                    subtitle="Get to know me better - my background, skills, and what drives me"
                />

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left side - Image/Avatar placeholder with animation */}
                    <motion.div
                        variants={SCALE_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] animate-pulse">
                                <div className="w-full h-full bg-gray-900 rounded-3xl" />
                            </div>

                            {/* Avatar placeholder with gradient */}
                            <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                                <div className="text-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-dashed border-indigo-500/50 flex items-center justify-center"
                                    >
                                        <span className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                            NVT
                                        </span>
                                    </motion.div>
                                    <p className="text-gray-400 text-sm">
                                        {PERSONAL_INFO.name}
                                    </p>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-4 -right-4 px-4 py-2 bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl"
                            >
                                <span className="text-indigo-400 text-sm font-medium">Open to Work</span>
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-4 -left-4 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl"
                            >
                                <span className="text-purple-400 text-sm font-medium">2+ Years Exp</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right side - Text content */}
                    <motion.div
                        variants={STAGGER_CONTAINER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <motion.div variants={SLIDE_UP_VARIANTS}>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Software Engineer & Project Coordinator
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {PERSONAL_INFO.summary}
                            </p>
                        </motion.div>

                        {/* Highlights grid */}
                        <motion.div
                            variants={SLIDE_UP_VARIANTS}
                            className="grid grid-cols-2 gap-4 mt-8"
                        >
                            {HIGHLIGHTS.map((highlight, index) => (
                                <motion.div
                                    key={highlight.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-lg ${highlight.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <highlight.icon className={highlight.color} size={24} />
                                    </div>
                                    <h4 className="text-white font-semibold text-lg mb-1.5">{highlight.title}</h4>
                                    <p className="text-gray-400 text-base">{highlight.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Certifications in progress */}
                        <motion.div variants={SLIDE_UP_VARIANTS}>
                            <GlassCard className="mt-8">
                                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Award className="text-indigo-400" size={22} />
                                    Certifications in Progress
                                </h4>
                                <div className="space-y-3">
                                    {CERTIFICATIONS.map((cert) => (
                                        <div key={cert.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-300 font-medium text-base">{cert.name}</p>
                                                <p className="text-gray-500 text-sm">{cert.issuer}</p>
                                            </div>
                                            <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full">
                                                {cert.status === 'in-progress' ? 'In Progress' : cert.status}
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
}
