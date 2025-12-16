/**
 * @fileoverview Portfolio data constants
 * @description All personal information, skills, experiences, and projects data
 * Based on CV of Nguyễn Viết Trung
 */

import type {
    PortfolioData,
    PersonalInfo,
    Skill,
    Experience,
    Project,
    Education,
    Certification,
} from '../types';

// Import company logos
import LCLogo from '../assets/logos/companies/LCLogo.png';
import NashLogo from '../assets/logos/companies/NashLogo.png';
import VLULogo from '../assets/logos/companies/VLULogo.png';

export const PERSONAL_INFO: PersonalInfo = {
    name: 'Nguyễn Viết Trung',
    title: 'Project Coordinator / Business Analyst',
    email: 'nvtrung19.work@gmail.com',
    phone: '0941047713',
    location: 'Ho Chi Minh City, Vietnam',
    summary: `Software Engineering graduate with a unique blend of technical expertise and management skills. 
    Proven track record of operating effectively in dual roles as a Full-stack Developer (.NET, React) 
    and Assistant Project Manager in real-world production environments. Possess a strong ability to 
    analyze business requirements and coordinate Agile workflows. Aspiring to leverage this technical-functional 
    duality to transition into a Business Analyst/Project Coordinator role, with a long-term vision of 
    becoming a Project Manager.`,
    socialLinks: [
        {
            platform: 'github',
            url: 'https://github.com/Sainoo19',
            label: 'GitHub',
        },
        {
            platform: 'linkedin',
            url: 'https://linkedin.com/in/nvtrung19',
            label: 'LinkedIn',
        },
        {
            platform: 'email',
            url: 'mailto:nvtrung19.work@gmail.com',
            label: 'Email',
        },
    ],
};

export const SKILLS: Skill[] = [
    // Programming Languages
    { id: 'csharp', name: 'C#', category: 'language' },
    { id: 'java', name: 'Java', category: 'language' },
    { id: 'javascript', name: 'JavaScript', category: 'language' },
    { id: 'typescript', name: 'TypeScript', category: 'language' },

    // Frameworks
    { id: 'react', name: 'React', category: 'framework' },
    { id: 'nodejs', name: 'Node.js', category: 'framework' },
    { id: 'dotnet', name: '.NET Framework & Core', category: 'framework' },
    { id: 'spring', name: 'Spring Boot', category: 'framework' },

    // Databases
    { id: 'sql-server', name: 'SQL Server', category: 'database' },
    { id: 'mysql', name: 'MySQL', category: 'database' },
    { id: 'mongodb', name: 'MongoDB', category: 'database' },

    // Tools
    { id: 'git', name: 'Git', category: 'tool' },
    { id: 'azure-devops', name: 'Azure DevOps', category: 'tool' },
    { id: 'jira', name: 'Jira', category: 'tool' },
    { id: 'figma', name: 'Figma', category: 'tool' },
    { id: 'lark-suite', name: 'Lark Suite', category: 'tool' },

    // Methodologies
    { id: 'agile', name: 'Agile/Scrum', category: 'methodology' },
    { id: 'clean-arch', name: 'Clean Architecture', category: 'methodology' },
    { id: 'oop', name: 'OOP', category: 'methodology' },
    { id: 'solid', name: 'SOLID Principles', category: 'methodology' },
    { id: 'tdd', name: 'Test-Driven Development', category: 'methodology' },
    { id: 'waterfall', name: 'Waterfall', category: 'methodology' },

    // Soft Skills
    { id: 'project-mgmt', name: 'Project Management', category: 'soft-skill' },
    { id: 'business-analysis', name: 'Business Analysis', category: 'soft-skill' },
    { id: 'stakeholder-comm', name: 'Stakeholder Communication', category: 'soft-skill' },
    { id: 'risk-mgmt', name: 'Risk Management', category: 'soft-skill' },
    { id: 'time-mgmt', name: 'Time Management', category: 'soft-skill' },
    { id: 'problem-solving', name: 'Problem Solving', category: 'soft-skill' },
];

export const EXPERIENCES: Experience[] = [
    {
        id: 'learning-chain',
        company: 'Learning Chain',
        position: 'Assistant Manager (Project Coordinator & Business Analyst)',
        startDate: 'April 2025',
        endDate: 'Present',
        logo: LCLogo,
        responsibilities: [
            'Coordinated project lifecycles for Web3 Blockchain and AI training programs, managing schedules and resource allocation',
            'Acted as a liaison between Subject Matter Experts, Management, and Stakeholders to gather requirements',
            'Managed quality assurance (QA) of technical content and documentation',
            'Monitored project execution metrics and implemented mitigation strategies',
            'Oversaw technical environment setup and resource readiness',
        ],
        achievements: [
            {
                title: 'Process Standardization & Improvement',
                description: 'Spearheaded transition from ad-hoc workflows to structured Agile framework with 100% task visibility',
            },
            {
                title: 'Tools Optimization & Automation',
                description: 'Championed Lark Suite adoption and developed internal website for centralizing training resources',
            },
        ],
        technologies: ['Agile', 'Lark Suite', 'Web Development'],
    },
    {
        id: 'nashtech',
        company: 'NashTech',
        position: 'Software Engineering Intern',
        startDate: 'July 2024',
        endDate: 'March 2025',
        logo: NashLogo,
        responsibilities: [
            'Served as both Developer and Assistant PM for training projects (TCG Shop, Asset Management)',
            'Led Agile/Scrum workflows, managed backlog refinement using Azure DevOps',
            'Engineered full-stack solutions using .NET Core with Clean Architecture pattern',
            'Built responsive front-end interfaces with React Vite',
            'Transitioned to real-world "Zenfolio" project in production environment',
        ],
        achievements: [
            {
                title: 'Professional Insight',
                description: 'Gained hands-on experience in production environment with professional problem-solving mindsets',
            },
            {
                title: 'Methodology Understanding',
                description: 'Developed practical view of Agile/Scrum and Waterfall methodologies',
            },
        ],
        technologies: ['.NET Core', 'React', 'SQL Server', 'Azure DevOps', 'xUnit'],
    },
    {
        id: 'vlu-ta',
        company: 'Van Lang University',
        position: 'Teaching Assistant - Basic Programming Course',
        startDate: '2022',
        endDate: '2023',
        logo: VLULogo,
        responsibilities: [
            'Assisted lecturer in delivering course content through programming exercises',
            'Provided personalized support to students on fundamental programming principles',
            'Helped prepare learning materials and coding examples',
            'Facilitated smooth class operations by coordinating communication',
        ],
        achievements: [],
        technologies: ['Programming Fundamentals', 'Teaching'],
    },
];

export const PROJECTS: Project[] = [
    {
        id: 'vlu-gymz',
        title: 'VLU GYMZ',
        role: 'Team Leader & Full-Stack Developer',
        description: 'A comprehensive Gym Management System with requirement gathering, task planning, and sprint tracking using MERN stack.',
        teamSize: 5,
        startDate: 'Jan 2025',
        endDate: 'May 2025',
        techStack: {
            frontend: ['ReactJS'],
            backend: ['Express.js', 'Node.js'],
            database: ['MongoDB', 'Firebase Storage'],
            tools: ['Momo', 'GHTK', 'Nodemailer'],
        },
        links: {
            github: 'https://github.com/Sainoo19/GymZ-Frontend.git',
            documentation: 'https://drive.google.com/drive/folders/1eqOWu0XgGS-u7MsIYRsIG6Fu_Y3LvWiF?usp=sharing',
        },
        highlights: [
            'Led team of 5 developers',
            'Successfully balanced project management with hands-on development',
            'Implemented payment integration with Momo',
            'Built real-time notification system with Nodemailer',
        ],
    },
    {
        id: 'job-hunter',
        title: 'VLU JobHunter',
        role: 'Team Leader & Back-End Developer',
        description: 'A comprehensive Job Recruitment Platform with resume parsing and real-time application tracking.',
        teamSize: 3,
        startDate: 'June 2024',
        endDate: 'July 2024',
        techStack: {
            frontend: ['React Vite', 'TypeScript'],
            backend: ['Java', 'Spring Boot', 'Spring Security', 'JPA'],
            database: ['MySQL'],
            tools: ['Gradle', 'Kotlin'],
        },
        links: {
            github: 'https://github.com/Sainoo19/WebsiteFindJob.git',
            documentation: 'https://drive.google.com/drive/folders/14dMesJHPyBAoPrKczLFeHmsiCsT8jGpz?usp=drive_link',
        },
        highlights: [
            'Directed team of 3 developers',
            'Combined strategic planning with hands-on backend engineering',
            'Implemented resume parsing feature',
            'Built real-time application tracking system',
        ],
    },
];

export const EDUCATION: Education[] = [
    {
        institution: 'Van Lang University',
        degree: 'Bachelor',
        field: 'Software Engineering',
        startYear: 2021,
        endYear: 2025,
        gpa: 3.28 / 4.0,
    },
];

export const CERTIFICATIONS: Certification[] = [
    {
        id: 'ecba',
        name: 'ECBA (Entry Certificate in Business Analysis)',
        issuer: 'IIBA',
        status: 'in-progress',
        expectedDate: 'June 2026',
    },
    {
        id: 'capm',
        name: 'CAPM (Certified Associate in Project Management)',
        issuer: 'PMI',
        status: 'in-progress',
        expectedDate: 'December 2026',
    },
];

export const PORTFOLIO_DATA: PortfolioData = {
    personalInfo: PERSONAL_INFO,
    skills: SKILLS,
    experiences: EXPERIENCES,
    projects: PROJECTS,
    education: EDUCATION,
    certifications: CERTIFICATIONS,
};

export const NAV_ITEMS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
] as const;
