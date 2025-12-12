/**
 * @fileoverview Projects Section Component
 * @description Project showcase with cards and filters
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Users, Calendar, Folder } from 'lucide-react';
import { SectionTitle, GlassCard, TechBadge, Button } from '../ui';
import { PROJECTS } from '../../constants';
import { SCALE_VARIANTS, STAGGER_CONTAINER_VARIANTS } from '../../constants';
import type { Project } from '../../types';

interface ProjectCardProps {
    project: Project;
    index: number;
}

/**
 * Individual project card component with 3D hover effect
 */
function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX((y - centerY) / 20);
        setRotateY((centerX - x) / 20);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={cardRef}
            variants={SCALE_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
            className="group relative"
        >
            <motion.div
                animate={{
                    boxShadow: isHovered
                        ? '0 25px 50px -12px rgba(99, 102, 241, 0.25), 0 0 30px rgba(99, 102, 241, 0.15)'
                        : '0 10px 40px -15px rgba(0, 0, 0, 0.3)',
                }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-indigo-500/50 transition-all duration-500"
            >
                {/* Project thumbnail/header */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
                            className="w-32 h-32 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center"
                        >
                            <Folder className="w-12 h-12 text-indigo-400" />
                        </motion.div>
                    </div>

                    {/* Overlay on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent flex items-end justify-center pb-4"
                    >
                        <div className="flex gap-3">
                            {project.links.github && (
                                <motion.a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-indigo-500 transition-colors"
                                >
                                    <Github size={20} />
                                </motion.a>
                            )}
                            {project.links.demo && (
                                <motion.a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-indigo-500 transition-colors"
                                >
                                    <ExternalLink size={20} />
                                </motion.a>
                            )}
                            {project.links.documentation && (
                                <motion.a
                                    href={project.links.documentation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white hover:bg-purple-500 transition-colors"
                                >
                                    <Folder size={20} />
                                </motion.a>
                            )}
                        </div>
                    </motion.div>

                    {/* Team size badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-2">
                        <Users size={14} className="text-indigo-400" />
                        <span className="text-white text-sm">Team of {project.teamSize}</span>
                    </div>

                    {/* Role badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-indigo-500/80 backdrop-blur-sm rounded-full">
                        <span className="text-white text-sm font-medium">{project.role}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                        {project.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar size={14} />
                        <span>{project.startDate} - {project.endDate}</span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="space-y-3 mb-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-2">Frontend</p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.frontend.map((tech) => (
                                    <TechBadge key={tech} name={tech} size="sm" />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-2">Backend</p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.backend.map((tech) => (
                                    <TechBadge key={tech} name={tech} size="sm" variant="outline" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-xs text-gray-500 mb-2">Key Highlights</p>
                        <ul className="space-y-1">
                            {project.highlights.slice(0, 2).map((highlight, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                    <span className="text-indigo-400 mt-1">•</span>
                                    <span className="line-clamp-1">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Glow effect on hover */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 -z-10 rounded-3xl"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}
                />
            )}
        </motion.div>
    );
}

/**
 * Projects section with showcase cards
 */
export function ProjectsSection() {
    return (
        <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Featured Projects"
                    subtitle="A selection of projects I've worked on, showcasing my technical and leadership skills"
                />

                {/* Projects grid */}
                <motion.div
                    variants={STAGGER_CONTAINER_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6">
                        Want to see more of my work? Check out my GitHub profile.
                    </p>
                    <Button
                        variant="secondary"
                        size="lg"
                        leftIcon={<Github size={20} />}
                        onClick={() => window.open('https://github.com/Sainoo19', '_blank')}
                    >
                        View GitHub Profile
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
