/**
 * @fileoverview Skills Section Component
 * @description Lists skills as 3D cards (no scores), with context of where they were used
 */

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';
import { SKILLS } from '../../constants';
import { STAGGER_CONTAINER_VARIANTS, SLIDE_UP_VARIANTS, SCALE_VARIANTS } from '../../constants';
import type { SkillCategory } from '../../types';

const SKILL_CATEGORIES: { key: SkillCategory | 'all'; label: string; color: string }[] = [
    { key: 'all', label: 'All', color: 'from-indigo-500 to-purple-500' },
    { key: 'language', label: 'Languages', color: 'from-indigo-500 to-blue-500' },
    { key: 'framework', label: 'Frameworks', color: 'from-purple-500 to-pink-500' },
    { key: 'database', label: 'Databases', color: 'from-cyan-500 to-teal-500' },
    { key: 'tool', label: 'Tools', color: 'from-orange-500 to-yellow-500' },
    { key: 'methodology', label: 'Methodologies', color: 'from-green-500 to-emerald-500' },
    { key: 'soft-skill', label: 'Soft Skills', color: 'from-pink-500 to-rose-500' },
];

// Usage context for each skill id (lightweight, no scores)
const SKILL_USAGE: Record<string, { usedIn: string; context: string }> = {
    python: { usedIn: 'University & automation', context: 'Data cleanup, quick scripting, reporting' },
    csharp: { usedIn: 'NashTech (TCG Shop, Asset Mgmt)', context: '.NET Core services with clean architecture' },
    java: { usedIn: 'VLU JobHunter backend', context: 'Spring Boot APIs and recruitment features' },
    javascript: { usedIn: 'GymZ frontend', context: 'React UI interactions and dashboards' },
    typescript: { usedIn: 'Portfolio & JobHunter frontend', context: 'Type-safe React/Vite components' },
    react: { usedIn: 'Portfolio, GymZ, JobHunter', context: 'Component-driven UI and animations' },
    nodejs: { usedIn: 'GymZ backend', context: 'Express REST APIs and integrations' },
    dotnet: { usedIn: 'NashTech training apps', context: 'Backend services, auth, SQL integration' },
    spring: { usedIn: 'JobHunter backend', context: 'Spring Boot, Security, JPA layers' },
    'sql-server': { usedIn: 'NashTech Asset Mgmt', context: 'Schema design and stored procedures' },
    mysql: { usedIn: 'JobHunter backend', context: 'Relational schema and reporting' },
    mongodb: { usedIn: 'GymZ backend', context: 'Document models and aggregations' },
    git: { usedIn: 'All projects', context: 'Branching strategy and code reviews' },
    'azure-devops': { usedIn: 'NashTech sprints', context: 'Boards, pipelines, release tracking' },
    jira: { usedIn: 'Learning Chain sprints', context: 'Backlog management and sprint planning' },
    figma: { usedIn: 'UI wireframes', context: 'Hand-off docs and component specs' },
    agile: { usedIn: 'Learning Chain & NashTech', context: 'Scrum rituals, sprint planning, estimation' },
    'clean-arch': { usedIn: 'NashTech .NET apps', context: 'Layered services, separation of concerns' },
    oop: { usedIn: 'All codebases', context: 'Domain modeling and patterns' },
    solid: { usedIn: 'Code reviews', context: 'Maintainable class design' },
    'project-mgmt': { usedIn: 'Learning Chain', context: 'Scope, risk, timeline control' },
    'business-analysis': { usedIn: 'Learning Chain', context: 'Requirement elicitation and documentation' },
    'stakeholder-comm': { usedIn: 'Learning Chain workshops', context: 'Bridge SMEs and engineering' },
    'risk-mgmt': { usedIn: 'Learning Chain delivery', context: 'Mitigation planning and contingency' },
};

const CATEGORY_BADGE: Record<SkillCategory | 'all', string> = {
    all: 'bg-indigo-500/15 text-indigo-200',
    language: 'bg-indigo-500/15 text-indigo-200',
    framework: 'bg-purple-500/15 text-purple-200',
    database: 'bg-cyan-500/15 text-cyan-200',
    tool: 'bg-orange-500/15 text-orange-200',
    methodology: 'bg-green-500/15 text-green-200',
    'soft-skill': 'bg-pink-500/15 text-pink-200',
};

interface SkillCardProps {
    skill: { id: string; name: string; category: SkillCategory };
    index: number;
}

// 3D card for each skill (no score)
function SkillCard3D({ skill, index }: SkillCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const usage = SKILL_USAGE[skill.id] || { usedIn: 'Project work', context: 'Applied in delivery tasks' };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotateX((y - centerY) / 14);
        setRotateY((centerX - x) / 14);
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
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.02 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                scale: isHovered ? 1.02 : 1,
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '900px',
            }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-5 group"
        >
            {/* Glow layer */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.15), transparent 55%)' }}
            />

            {/* Shine sweep */}
            {isHovered && (
                <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '150%', opacity: 0.35 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                    style={{ transform: 'skewX(-15deg)' }}
                />
            )}

            {/* Content */}
            <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">{skill.name}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full border border-white/10 ${CATEGORY_BADGE[skill.category]}`}>
                        {skill.category}
                    </span>
                </div>

                <div className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.7)]" />
                    <span className="font-medium text-indigo-200">Used in</span>
                    <span className="text-gray-200">{usage.usedIn}</span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed">
                    {usage.context}
                </p>
            </div>
        </motion.div>
    );
}

/**
 * Skills section with 3D cards (no scoring)
 */
export function SkillsSection() {
    const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

    const filteredSkills = activeCategory === 'all'
        ? SKILLS
        : SKILLS.filter((skill) => skill.category === activeCategory);

    return (
        <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Skills & Expertise"
                    subtitle="List of tools and technologies I actually used in projects"
                />

                {/* Category filters */}
                <motion.div
                    variants={SLIDE_UP_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {SKILL_CATEGORIES.map(({ key, label, color }) => {
                        const isActive = activeCategory === key;
                        return (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(key as SkillCategory | 'all')}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${isActive
                                    ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg shadow-indigo-500/25`
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/10'
                                    }`}
                            >
                                {label}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Skill cards */}
                <motion.div
                    key={activeCategory}
                    variants={STAGGER_CONTAINER_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredSkills.map((skill, index) => (
                        <SkillCard3D key={skill.id} skill={skill} index={index} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
