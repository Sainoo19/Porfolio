/**
 * @fileoverview Skills Section Component - Mecha HUD Capability Modules
 * @description Lists skills as pilot capability modules in HUD style
 */

import { useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';
import { SKILLS } from '../../constants';
import { STAGGER_CONTAINER_VARIANTS, SLIDE_UP_VARIANTS, SCALE_VARIANTS } from '../../constants';
import type { SkillCategory } from '../../types';

const SKILL_CATEGORIES: { key: SkillCategory | 'all'; label: string; code: string }[] = [
    { key: 'all', label: 'ALL_SYS', code: 'A0' },
    { key: 'language', label: 'LANG', code: 'L1' },
    { key: 'framework', label: 'FRMWK', code: 'F2' },
    { key: 'database', label: 'DB', code: 'D3' },
    { key: 'tool', label: 'TOOLS', code: 'T4' },
    { key: 'methodology', label: 'METHOD', code: 'M5' },
    { key: 'soft-skill', label: 'SOFT', code: 'S6' },
];

// Usage context for each skill id (lightweight, no scores)
const SKILL_USAGE: Record<string, { usedIn: string; context: string }> = {
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
    'lark-suite': { usedIn: 'Learning Chain operations', context: 'Team coordination, progress tracking, internal comms' },
    agile: { usedIn: 'Learning Chain & NashTech', context: 'Scrum rituals, sprint planning, estimation' },
    'clean-arch': { usedIn: 'NashTech .NET apps', context: 'Layered services, separation of concerns' },
    oop: { usedIn: 'All codebases', context: 'Domain modeling and patterns' },
    solid: { usedIn: 'Code reviews', context: 'Maintainable class design' },
    tdd: { usedIn: 'NashTech backend testing', context: 'Writing tests-first flow with xUnit for critical modules' },
    waterfall: { usedIn: 'Mixed delivery environments', context: 'Milestone planning and stage-gate documentation' },
    'project-mgmt': { usedIn: 'Learning Chain', context: 'Scope, risk, timeline control' },
    'business-analysis': { usedIn: 'Learning Chain', context: 'Requirement elicitation and documentation' },
    'stakeholder-comm': { usedIn: 'Learning Chain workshops', context: 'Bridge SMEs and engineering' },
    'risk-mgmt': { usedIn: 'Learning Chain delivery', context: 'Mitigation planning and contingency' },
    'time-mgmt': { usedIn: 'Multi-role delivery', context: 'Balancing BA, coordination, and engineering deadlines' },
    'problem-solving': { usedIn: 'Production and training projects', context: 'Root-cause analysis and solution trade-off decisions' },
};

const CATEGORY_BADGE: Record<SkillCategory | 'all', string> = {
    all: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    language: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    framework: 'bg-magenta-500/15 text-magenta-300 border-magenta-500/30',
    database: 'bg-green-500/15 text-green-300 border-green-500/30',
    tool: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    methodology: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    'soft-skill': 'bg-magenta-500/15 text-magenta-300 border-magenta-500/30',
};

interface SkillCardProps {
    skill: { id: string; name: string; category: SkillCategory };
    index: number;
}

// 3D card for each skill - Mecha Module style
const SkillCard3D = memo(function SkillCard3D({ skill, index }: SkillCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const usage = SKILL_USAGE[skill.id] || { usedIn: 'Project work', context: 'Applied in delivery tasks' };
    const moduleId = `MOD-${skill.id.toUpperCase().slice(0, 4)}-${String(index + 1).padStart(3, '0')}`;

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
                clipPath: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))'
            }}
            className="relative overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-cyan-950/40 to-slate-950/60 backdrop-blur-sm p-4 group hover:border-cyan-500/50 transition-all duration-300"
        >
            {/* Corner brackets */}
            <svg className="absolute top-1 left-1 w-4 h-4 text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                <path d="M0 12 L0 0 L12 0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute top-1 right-1 w-4 h-4 text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                <path d="M12 12 L12 0 L0 0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-1 left-1 w-4 h-4 text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                <path d="M0 0 L0 12 L12 12" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-1 right-1 w-4 h-4 text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                <path d="M12 0 L12 12 L0 12" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>

            {/* Scan line effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent animate-scan-line" />
            </div>

            {/* Glow layer */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.1), transparent 55%)' }}
            />

            {/* Shine sweep */}
            {isHovered && (
                <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '150%', opacity: 0.25 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                    style={{ transform: 'skewX(-15deg)' }}
                />
            )}

            {/* Content */}
            <div className="relative z-10 space-y-2">
                {/* Header with module ID */}
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[9px] font-mono text-cyan-600 uppercase tracking-wider">{moduleId}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 border font-mono uppercase ${CATEGORY_BADGE[skill.category]}`}>
                        {skill.category.replace('-', '_')}
                    </span>
                </div>

                {/* Skill name */}
                <h3 className="text-sm font-['Orbitron'] font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                </h3>

                {/* Deployment info */}
                <div className="text-xs text-gray-300 flex items-center gap-1.5 font-['Rajdhani']">
                    <span className="inline-flex h-1.5 w-1.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                    <span className="font-mono text-cyan-500 text-[10px]">DEPLOYED:</span>
                    <span className="text-gray-300">{usage.usedIn}</span>
                </div>

                {/* Context */}
                <p className="text-xs text-gray-500 leading-relaxed font-['Rajdhani']">
                    <span className="text-cyan-600 font-mono">&gt;</span> {usage.context}
                </p>

                {/* Status bar */}
                <div className="pt-2 border-t border-cyan-500/10 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        ACTIVE
                    </span>
                    <span className="text-[9px] font-mono text-gray-600">PWR: 100%</span>
                </div>
            </div>
        </motion.div>
    );
});

/**
 * Skills section - Pilot Capability Module Registry
 */
export const SkillsSection = memo(function SkillsSection() {
    const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

    const filteredSkills = activeCategory === 'all'
        ? SKILLS
        : SKILLS.filter((skill) => skill.category === activeCategory);

    return (
        <section id="skills" className="relative py-16 md:py-20 overflow-hidden">
            {/* HUD Background grid */}
            <div className="absolute inset-0 bg-hud-grid opacity-30" />

            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-magenta-500/5 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-500 mb-2">
                        <span className="text-gray-600">&lt;</span>
                        MODULE_REGISTRY
                        <span className="text-gray-600">/&gt;</span>
                    </div>
                    <SectionTitle
                        title="Capability Modules"
                        subtitle="Active pilot systems and operational technologies"
                    />
                    <div className="flex justify-center items-center gap-4 mt-4 text-[10px] font-mono">
                        <span className="text-gray-500">TOTAL_MODULES: <span className="text-cyan-400">{SKILLS.length}</span></span>
                        <span className="text-cyan-500/30">|</span>
                        <span className="text-gray-500">ACTIVE: <span className="text-green-400">{filteredSkills.length}</span></span>
                        <span className="text-cyan-500/30">|</span>
                        <span className="text-gray-500">STATUS: <span className="text-green-400">OPERATIONAL</span></span>
                    </div>
                </div>

                {/* Category filters - HUD style */}
                <motion.div
                    variants={SLIDE_UP_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-8"
                >
                    {SKILL_CATEGORIES.map(({ key, label, code }) => {
                        const isActive = activeCategory === key;
                        return (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(key as SkillCategory | 'all')}
                                className={`relative px-4 py-1.5 text-xs font-mono transition-all border ${isActive
                                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                                    : 'bg-slate-900/50 text-gray-500 hover:bg-cyan-500/10 hover:text-cyan-400 border-cyan-500/20 hover:border-cyan-500/40'
                                    }`}
                                style={{
                                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                                }}
                            >
                                <span className="text-cyan-600 mr-1">[{code}]</span>
                                {label}
                                {isActive && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 animate-pulse"
                                        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Skill cards - Module panels */}
                <motion.div
                    key={activeCategory}
                    variants={STAGGER_CONTAINER_VARIANTS}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    {filteredSkills.map((skill, index) => (
                        <SkillCard3D key={skill.id} skill={skill} index={index} />
                    ))}
                </motion.div>

                {/* Bottom status bar */}
                <div className="mt-8 pt-4 border-t border-cyan-500/10 flex items-center justify-center gap-6 text-[10px] font-mono text-gray-600">
                    <span>REGISTRY_VERSION: 2.0</span>
                    <span className="text-cyan-500/30">◆</span>
                    <span>LAST_UPDATE: 2024</span>
                    <span className="text-cyan-500/30">◆</span>
                    <span>CERTIFICATION: <span className="text-green-400">VERIFIED</span></span>
                </div>
            </div>
        </section>
    );
});
