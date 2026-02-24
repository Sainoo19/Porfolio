import type {
    PortfolioData,
    PersonalInfo,
    Skill,
    Experience,
    Project,
    Education,
    Certification,
} from '../types';

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
    { id: 'csharp', name: 'C#', category: 'language', proficiency: 90 },
    { id: 'java', name: 'Java', category: 'language', proficiency: 85 },
    { id: 'javascript', name: 'JavaScript', category: 'language', proficiency: 88 },
    { id: 'typescript', name: 'TypeScript', category: 'language', proficiency: 87 },
    { id: 'react', name: 'React', category: 'framework', proficiency: 90 },
    { id: 'nodejs', name: 'Node.js', category: 'framework', proficiency: 82 },
    { id: 'dotnet', name: '.NET Framework & Core', category: 'framework', proficiency: 88 },
    { id: 'spring', name: 'Spring Boot', category: 'framework', proficiency: 80 },
    { id: 'sql-server', name: 'SQL Server', category: 'database', proficiency: 85 },
    { id: 'mysql', name: 'MySQL', category: 'database', proficiency: 82 },
    { id: 'mongodb', name: 'MongoDB', category: 'database', proficiency: 78 },
    { id: 'git', name: 'Git', category: 'tool', proficiency: 90 },
    { id: 'azure-devops', name: 'Azure DevOps', category: 'tool', proficiency: 84 },
    { id: 'jira', name: 'Jira', category: 'tool', proficiency: 86 },
    { id: 'figma', name: 'Figma', category: 'tool', proficiency: 75 },
    { id: 'lark-suite', name: 'Lark Suite', category: 'tool', proficiency: 80 },
    { id: 'agile', name: 'Agile/Scrum', category: 'methodology', proficiency: 92 },
    { id: 'clean-arch', name: 'Clean Architecture', category: 'methodology', proficiency: 85 },
    { id: 'oop', name: 'OOP', category: 'methodology', proficiency: 90 },
    { id: 'solid', name: 'SOLID Principles', category: 'methodology', proficiency: 88 },
    { id: 'tdd', name: 'Test-Driven Development', category: 'methodology', proficiency: 80 },
    { id: 'waterfall', name: 'Waterfall', category: 'methodology', proficiency: 82 },
    { id: 'project-mgmt', name: 'Project Management', category: 'soft-skill', proficiency: 88 },
    { id: 'business-analysis', name: 'Business Analysis', category: 'soft-skill', proficiency: 86 },
    { id: 'stakeholder-comm', name: 'Stakeholder Communication', category: 'soft-skill', proficiency: 90 },
    { id: 'risk-mgmt', name: 'Risk Management', category: 'soft-skill', proficiency: 84 },
    { id: 'time-mgmt', name: 'Time Management', category: 'soft-skill', proficiency: 88 },
    { id: 'problem-solving', name: 'Problem Solving', category: 'soft-skill', proficiency: 90 },
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
        position: 'Software Engineering / Pm Assistant',
        startDate: 'March 2024',
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
        startDate: 'September 2022',
        endDate: 'September 2023',
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
        id: 'learning-chain',
        title: 'Learning Chain Platform',
        role: 'Assistant Manager (Project Coordinator & BA)',
        description: 'Web3 Blockchain and AI training platform. Coordinated project lifecycles, standardized Agile workflows, and built internal resource hubs.', // [cite: 34, 40, 42]
        teamSize: 20,
        startDate: 'April 2025',
        endDate: 'Present',
        techStack: {

            frontend: ['React Vite', 'React'],
            backend: ['.NET Core', 'RESTful API'],
            database: ['Internal Data'],
            tools: ['Lark Suite', 'Jira', 'Zoom Operations', 'Agile Methodology'],
        },
        links: {
            demo: 'https://learningchain.vn/',

        },
        highlights: [
            'Spearheaded the transition to a structured Agile framework', // Thành tựu process
            'Developed an internal website to centralize training resources', // Thành tựu kỹ thuật
            'Coordinated project lifecycles for Web3 & AI training programs',
            'Source code / Internal tools are protected by NDA', // Ghi chú bảo mật
        ],
    },
    {
        id: 'zenfolio',
        title: 'Zenfolio (Nash Tech)',
        role: 'Full-stack Developer',
        description: 'A professional photography platform. Collaborated with the engineering team to apply modern technologies in a production environment.',
        teamSize: 8,
        startDate: 'July 2024',
        endDate: 'March 2025',
        techStack: {
            frontend: ['React Vite', 'TypeScript'],
            backend: ['.NET Core', 'RESTful API'],
            database: ['SQL Server'],
            tools: ['Azure DevOps', 'Clean Architecture', 'xUnit'],
        },
        links: {
            demo: 'https://zenfolio.com/',
        },
        highlights: [
            'Engineered robust full-stack solutions using Clean Architecture',
            'Ensured code reliability through comprehensive unit testing with xUnit',
            'Worked in a professional Agile/Scrum production environment',
            'Proprietary Source Code (NDA Signed)',
        ],
    },
    {
        id: 'tcg-shop',
        title: 'TCG Shop',
        role: 'Developer & Assistant PM',
        description: 'An e-commerce platform for trading card games. Led Agile workflows and managed backlog refinement.', // [cite: 49]
        teamSize: 4,
        startDate: 'March 2024',
        endDate: 'April 2024',
        techStack: {
            frontend: ['Razor Views (.NET MVC)', 'HTML/CSS', 'JavaScript'],
            backend: ['.NET Core MVC', 'C#'],
            database: ['SQL Server'],
            tools: ['Azure DevOps', 'Git', 'Scrum'],
        },
        links: {

        },
        highlights: [
            'Led Agile/Scrum workflows and tracked sprint progress',
            'Managed backlog refinement and task distribution',
            'Implemented product catalog and inventory features',
            'Internal Training Project - Source Code Confidential',
        ],
    },
    {
        id: 'asset-management',
        title: 'Asset Management System',
        role: 'Backend Developer & Assistant PM',
        description: 'Internal system for managing IT assets. Maintained system and coordinated sprint tasks.', // [cite: 49]
        teamSize: 5,
        startDate: 'May 2024',
        endDate: 'June 2024',
        techStack: {
            frontend: ['React', 'TypeScript'],
            backend: ['.NET Core', 'C#', 'RESTful API'],
            database: ['SQL Server'],
            tools: ['Azure DevOps', 'Git'],
        },
        links: {},
        highlights: [
            'Collaborated closely with the engineering team',
            'Applied Clean Architecture pattern in development',
            'Assisted in project coordination and sprint management',
            'Internal System - Source Code Confidential',
        ],
    },
    {
        id: 'vlu-gymz',
        title: 'VLU GYMZ',
        role: 'Team Leader & Full-Stack Developer',
        description: 'A comprehensive Gym Management System. Balanced project management duties with hands-on MERN stack development.', // [cite: 66, 67]
        teamSize: 5,
        startDate: 'Jan 2025',
        endDate: 'May 2025',
        techStack: {
            frontend: ['ReactJS'],
            backend: ['Express.js', 'Node.js'],
            database: ['MongoDB', 'Firebase Storage'],
            tools: ['Momo API', 'GHTK', 'Nodemailer'],
        },
        links: {
            github: 'https://github.com/Sainoo19/GymZ-Frontend.git',
            documentation: 'https://drive.google.com/drive/folders/1eq0Wu0XgGS-u7MsiYRsIG6Fu_Y3LvWiF?usp=sharing', // [cite: 72]
        },
        highlights: [
            'Led a team of 5 to deliver a comprehensive system using MERN stack',
            'Balanced PM duties (planning, tracking) with coding',
            'Integrated third-party services: Momo, GHTK, Nodemailer',
        ],
    },
    {
        id: 'job-hunter',
        title: 'VLU JobHunter',
        role: 'Team Leader & Back-End Developer',
        description: 'A Job Recruitment Platform focusing on resume parsing and real-time tracking.', // [cite: 76]
        teamSize: 3,
        startDate: 'June 2024',
        endDate: 'July 2024',
        techStack: {
            frontend: ['React Vite', 'TypeScript'],
            backend: ['Java', 'Spring Boot', 'Spring Security', 'JPA'], // [cite: 79]
            database: ['MySQL'],
            tools: ['Gradle', 'Kotlin'],
        },
        links: {
            github: 'https://github.com/Sainoo19/WebsiteFindJob.git',
            documentation: 'https://drive.google.com/drive/folders/14dMesJHPyBAoPrKczLFeHmsiCsT8jGpz?usp=drive_link', // [cite: 82]
        },
        highlights: [
            'Directed a team of 3 using Java Spring Boot [cite: 75, 76]',
            'Implemented core features like resume parsing [cite: 76]',
            'Combined strategic planning with hands-on engineering [cite: 76]',
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
        gpa: 3.28,
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
