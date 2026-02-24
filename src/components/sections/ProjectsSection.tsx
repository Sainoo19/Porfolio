/**
 * @fileoverview Projects Section Component - Mecha HUD Deployed Systems
 * @description Project showcase as deployed mecha systems with HUD styling
 */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Users, Calendar, Folder, Cpu } from 'lucide-react';
import { SectionTitle, TechBadge, Button } from '../ui';
import { PROJECTS } from '../../constants';
import { SCALE_VARIANTS, STAGGER_CONTAINER_VARIANTS } from '../../constants';
import type { Project } from '../../types';

interface ProjectCardProps {
    project: Project;
    index: number;
}

/**
 * Individual project card - Deployed System Panel with HUD style
 */
function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const systemId = `SYS-${String(index + 1).padStart(3, '0')}-${project.id.toUpperCase().slice(0, 4)}`;

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
            className="group relative h-full flex flex-col"
        >
            <motion.div
                animate={{
                    boxShadow: isHovered
                        ? '0 25px 50px -12px rgba(34, 211, 238, 0.2), 0 0 30px rgba(34, 211, 238, 0.1)'
                        : '0 10px 40px -15px rgba(0, 0, 0, 0.3)',
                }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 h-full flex flex-col"
                style={{
                    clipPath: 'polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))',
                    background: 'linear-gradient(to bottom right, rgba(8, 47, 73, 0.5), rgba(15, 23, 42, 0.7))'
                }}
            >
                {/* Corner brackets */}
                <svg className="absolute top-2 left-2 w-6 h-6 text-cyan-500/40 group-hover:text-cyan-400 transition-colors z-20">
                    <path d="M0 20 L0 0 L20 0" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
                <svg className="absolute top-2 right-2 w-6 h-6 text-cyan-500/40 group-hover:text-cyan-400 transition-colors z-20">
                    <path d="M20 20 L20 0 L0 0" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
                <svg className="absolute bottom-2 left-2 w-6 h-6 text-cyan-500/40 group-hover:text-cyan-400 transition-colors z-20">
                    <path d="M0 0 L0 20 L20 20" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
                <svg className="absolute bottom-2 right-2 w-6 h-6 text-cyan-500/40 group-hover:text-cyan-400 transition-colors z-20">
                    <path d="M20 0 L20 20 L0 20" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>

                {/* Scan line effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent animate-scan-line" />
                </div>

                {/* Project header */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-magenta-500/10">
                    {/* HUD grid background */}
                    <div className="absolute inset-0 bg-hud-grid opacity-30" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
                            className="w-32 h-32 border border-dashed border-cyan-500/30 flex items-center justify-center"
                            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                        >
                            <Cpu className="w-10 h-10 text-cyan-400" />
                        </motion.div>
                    </div>

                    {/* Overlay on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent flex items-end justify-center pb-4"
                    >
                        <div className="flex gap-3">
                            {project.links.github ? (
                                <motion.a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-colors"
                                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                                >
                                    <Github size={18} />
                                </motion.a>
                            ) : (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-3 py-2 bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-400 text-xs font-mono uppercase flex items-center gap-2"
                                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                                    title="Source code not available due to company policy"
                                >
                                    <Github size={14} />
                                    <span>Restricted</span>
                                </motion.div>
                            )}
                            {project.links.demo && (
                                <motion.a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-colors"
                                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                                >
                                    <ExternalLink size={18} />
                                </motion.a>
                            )}
                            {project.links.documentation && (
                                <motion.a
                                    href={project.links.documentation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-magenta-500/10 backdrop-blur-sm border border-magenta-500/30 text-magenta-400 hover:bg-magenta-500 hover:text-slate-900 transition-colors"
                                    style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                                >
                                    <Folder size={18} />
                                </motion.a>
                            )}
                        </div>
                    </motion.div>

                    {/* Team size badge */}
                    <div
                        className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 flex items-center gap-2"
                        style={{ clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
                    >
                        <Users size={12} className="text-cyan-400" />
                        <span className="text-white text-xs font-mono">CREW:{project.teamSize}</span>
                    </div>

                    {/* Role badge */}
                    <div
                        className="absolute top-4 left-4 px-2 py-1 bg-magenta-500/80 backdrop-blur-sm border border-magenta-400/50 max-w-[calc(100%-120px)]"
                        style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                    >
                        <span className="text-white text-[10px] font-mono uppercase truncate block">{project.role}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* System ID header */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-cyan-500/10">
                        <span className="text-[10px] font-mono text-cyan-600">{systemId}</span>
                        <span className="text-[10px] font-mono text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            DEPLOYED
                        </span>
                    </div>

                    <h3 className="text-xl font-['Orbitron'] font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono mb-3">
                        <Calendar size={12} className="text-cyan-600" />
                        <span>OPS_PERIOD: {project.startDate} - {project.endDate}</span>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 font-['Rajdhani']">
                        {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="space-y-3 mb-4 flex-1">
                        <div>
                            <p className="text-[10px] text-cyan-600 mb-2 font-mono">[FRONTEND_SYS]</p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.frontend.map((tech) => (
                                    <TechBadge key={tech} name={tech} size="sm" />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-cyan-600 mb-2 font-mono">[BACKEND_SYS]</p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.backend.map((tech) => (
                                    <TechBadge key={tech} name={tech} size="sm" variant="outline" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="pt-4 border-t border-cyan-500/10">
                        <p className="text-[10px] text-cyan-600 mb-2 font-mono">[KEY_OUTPUTS]</p>
                        <ul className="space-y-1">
                            {project.highlights.slice(0, 2).map((highlight, i) => (
                                <li key={i} className="text-gray-400 text-sm flex items-start gap-2 font-['Rajdhani']">
                                    <span className="text-cyan-500 font-mono text-xs">&gt;</span>
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
                    className="absolute inset-0 -z-10"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}
                />
            )}
        </motion.div>
    );
}

/**
 * Projects section - Deployed Systems Registry
 */
export function ProjectsSection() {
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

    return (
        <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
            {/* HUD Background grid */}
            <div className="absolute inset-0 bg-hud-grid opacity-20" />

            {/* Background decorations */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-magenta-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-500 mb-2">
                        <span className="text-gray-600">&lt;</span>
                        DEPLOYED_SYSTEMS
                        <span className="text-gray-600">/&gt;</span>
                    </div>
                    <SectionTitle
                        title="Mission Archived"
                        subtitle="Deployed systems demonstrating technical capability and leadership"
                    />
                    <div className="flex justify-center items-center gap-4 mt-4 text-[10px] font-mono">
                        <span className="text-gray-500">TOTAL_SYSTEMS: <span className="text-cyan-400">{PROJECTS.length}</span></span>
                        <span className="text-cyan-500/30">|</span>
                        <span className="text-gray-500">STATUS: <span className="text-green-400">ALL_OPERATIONAL</span></span>
                    </div>
                </div>

                {/* Projects grid */}
                <motion.div
                    variants={STAGGER_CONTAINER_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {displayedProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* View More Button */}
                {PROJECTS.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'SHOW LESS' : `VIEW MORE (${PROJECTS.length - 3})`}
                        </Button>
                    </motion.div>
                )}

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6 font-['Rajdhani']">
                        <span className="text-cyan-500 font-mono">&gt;</span> Access full system repository for additional deployments
                    </p>
                    {/* <Button
                        variant="secondary"
                        size="lg"
                        leftIcon={<Github size={18} />}
                        onClick={() => window.open('https://github.com/Sainoo19', '_blank')}
                    >
                        ACCESS REPOSITORY
                    </Button> */}
                </motion.div>

                {/* Bottom status bar */}
                <div className="mt-8 pt-4 border-t border-cyan-500/10 flex items-center justify-center gap-6 text-[10px] font-mono text-gray-600">
                    <span>ARCHIVE_VERSION: 2.0</span>
                    <span className="text-cyan-500/30">◆</span>
                    <span>LAST_SYNC: 2024</span>
                    <span className="text-cyan-500/30">◆</span>
                    <span>ACCESS: <span className="text-green-400">PUBLIC</span></span>
                </div>
            </div>
        </section>
    );
}
