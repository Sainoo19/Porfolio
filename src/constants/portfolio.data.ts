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
            url: 'https://www.linkedin.com/in/sainoo19',
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
    { id: 'javascript-ts', name: 'JavaScript / TypeScript', category: 'language', proficiency: 88 },
    { id: 'react', name: 'React', category: 'framework', proficiency: 90 },
    { id: 'dotnet', name: '.NET Core', category: 'framework', proficiency: 88 },
    { id: 'nodejs', name: 'Node.js / Express', category: 'framework', proficiency: 82 },
    { id: 'spring', name: 'Spring Boot', category: 'framework', proficiency: 80 },
    { id: 'databases', name: 'SQL Server / MySQL / MongoDB', category: 'database', proficiency: 85 },
    { id: 'devops-tools', name: 'Azure DevOps / Jira / Git', category: 'tool', proficiency: 88 },
    { id: 'workspace-tools', name: 'Lark Suite / Notion / Figma', category: 'tool', proficiency: 82 },
    { id: 'project-lifecycles', name: 'Project Life Cycles & Development Approaches', category: 'methodology', proficiency: 90 },
    { id: 'software-design', name: 'Software Architecture & Design Principles', category: 'methodology', proficiency: 86 },
    { id: 'business-analysis', name: 'Business Analysis & Requirements Engineering', category: 'soft-skill', proficiency: 88 },
    { id: 'project-coordination', name: 'Project Coordination & Stakeholder Communication', category: 'soft-skill', proficiency: 90 },
    { id: 'risk-problem', name: 'Risk Mitigation & Problem Solving', category: 'soft-skill', proficiency: 88 },
];

export const EXPERIENCES: Experience[] = [
    {
        id: 'bb-stores',
        company: 'BB Stores',
        position: 'ASSISTANT CEO (PROJECT COORDINATOR & BUSINESS ANALYST)',
        startDate: 'April 2026',
        endDate: 'Now',
        responsibilities: [
            'Spearheaded the transition from manual, ad-hoc workflows (verbal communication, fragmented Google Sheets) to a highly structured operational model.',
            'Championed Agile methodologies and built a centralized management system on Lark Suite (Lark Base) to coordinate cross-functional efforts across Marketing, Sales, and Media teams.',
            'Completely resolved critical bottlenecks related to miscommunication and file loss caused by decentralized storage.',
            'Streamlined and automated workflows, significantly reducing administrative bulkiness and improving seamless collaboration across departments.',
            'Closely tracked project lifecycles and managed resources to ensure products were delivered on time, in the correct quantities, and up to quality standards.',
        ],
        achievements: [
            {
                title: 'Digital Transformation & Agile Implementation',
                description: 'Transitioned from manual workflows to a structured operational model. Built a centralized management system on Lark Suite.',
            },
            {
                title: 'Operational Efficiency & Workflow Automation',
                description: 'Resolved bottlenecks related to miscommunication and file loss. Streamlined workflows to reduce administrative bulkiness.',
            },
            {
                title: 'Product Delivery & Revenue Impact',
                description: 'Contributed to stable operations and business revenue generation by maintaining a frictionless operational flow.',
            }
        ],
        technologies: ['Agile', 'Lark Suite', 'Project Management'],
    },
    {
        id: 'learning-chain',
        company: 'Learning Chain',
        position: 'PROJECT COORDINATOR & BUSINESS ANALYST',
        startDate: 'July 2025',
        endDate: 'December 2025',
        logo: LCLogo,
        responsibilities: [
            'Led end-to-end coordination for Blockchain and AI training programs, acting as the primary liaison among SMEs and stakeholders.',
            'Applied Work Breakdown Structure (WBS) to translate high-level objectives into granular tasks and managed cross-platform schedules.',
            'Facilitated daily stand-ups and authored comprehensive reports to evaluate performance against OKRs and KPIs.',
            'Proactively monitored execution metrics and implemented mitigation strategies, achieving 100% alignment with project goals.',
        ],
        achievements: [
            {
                title: 'Agile Project Leadership',
                description: 'Successfully transitioned the team from ad-hoc workflows to structured Agile/Scrum, boosting overall productivity by 30% in the first quarter.',
            },
            {
                title: 'Operational Optimization & Delivery',
                description: 'Developed 10+ standardized protocols that reduced session preparation time by 45% (from 4 hours to ~2 hours) with zero critical errors across 50+ live sessions.',
            },
            {
                title: 'Workspace Digitalization & System Building',
                description: 'Championed Lark Suite and Notion adoption (100% migration in 2 weeks). Engineered a mini-ERP system centralizing 300+ assets, cutting lookup time by 60%.',
            }
        ],
        technologies: ['Agile/Scrum', 'Lark Suite', 'Notion', 'WBS', 'OKRs/KPIs'],
    },
    {
        id: 'nashtech',
        company: 'NashTech',
        position: 'SOFTWARE ENGINEERING / BUSINESS ANALYST ASSISTANT',
        startDate: 'March 2025',
        endDate: 'June 2025',
        logo: NashLogo,
        responsibilities: [
            'Served as both Developer and Project Manager Assistant for training projects (TCG Shop, Asset Management).',
            'Led Agile/Scrum workflows, managed backlog refinement, and tracked sprint progress via Azure DevOps.',
            'Engineered robust full-stack solutions utilizing .NET Core within a Clean Architecture, SQL Server backend, and React Vite frontend.',
            'Collaborated effectively across specialized roles in the software team.',
        ],
        achievements: [
            {
                title: 'Dual-Role Execution & Agile Management',
                description: 'Effectively tailored Agile/Scrum and Waterfall methodologies to specific project contexts to ensure timely delivery.',
            },
            {
                title: 'Technical Engineering & Code Quality',
                description: 'Ensured high code quality through comprehensive xUnit testing while gaining hands-on production experience and sharpening problem-solving skills.',
            }
        ],
        technologies: ['.NET Core', 'React Vite', 'SQL Server', 'Azure DevOps', 'xUnit', 'Clean Architecture'],
    },
    {
        id: 'vlu-ta',
        company: 'Van Lang University',
        position: 'TEACHING ASSISTANT FOR A BASIC PROGRAM COURSE',
        startDate: 'September 2022',
        endDate: 'September 2023',
        logo: VLULogo,
        responsibilities: [
            'Acted as the primary liaison between the lecturer and 40+ students.',
            'Managed daily logistics, tracked performance metrics, and delivered timely progress reports to facilitate early interventions.',
            'Mentored students on technical concepts.',
            'Standardized course materials/guidelines.',
        ],
        achievements: [
            {
                title: 'Operational Coordination & Progress Tracking',
                description: 'Effectively tracked progress and delivered reports to facilitate early interventions for students.',
            },
            {
                title: 'Mentorship & Documentation Management',
                description: 'Significantly optimized the training workflow and reduced the lead lecturer\'s workload through standardized documentation.',
            }
        ],
        technologies: ['Mentorship', 'Progress Tracking', 'Documentation'],
    },
];

export const PROJECTS: Project[] = [
    {
        id: 'amazing-group',
        title: 'English Language Center Management Website - AMAZING GROUP',
        role: 'BUSINESS ANALYST - FREELANCE',
        description: 'Spearheaded digital transformation by designing a centralized management website to replace fragmented Excel/Google Sheets workflows, preventing data loss and optimizing internal operations.',
        teamSize: 6,
        startDate: 'January 2026',
        endDate: 'March 2026',
        techStack: {
            landingpage: ['WordPress'],
            frontend: ['React Vite', 'React'],
            backend: ['Express.js', 'RESTful API'],
            database: ['MongoDB'],
            tools: ['Jira', 'Notion', 'Agile Methodology', 'Figma', 'Microsoft Office', 'Google Workspace', 'AI Tools & Agent Assistants'],
        },
        links: {
            demo: 'https://amazing.edu.vn/',

        },
        highlights: [
            'Optimized system architecture and workflows through competitor analysis and detailed mapping of complex academic processes.',
            'Defined core modules including scheduling, attendance tracking, performance evaluations, homework management, HR timesheets, and tuition collection.',
            'Authored comprehensive technical and business documentation.',
            'Bridged business and technical teams by overseeing feature implementation and providing hands-on coding support during critical sprints.',
            'Ensured all project milestones were delivered on time.',
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
            githubFrontend: 'https://github.com/Sainoo19/GymZ-Frontend.git',
            githubBackend: 'https://github.com/Sainoo19/GymZ-Backend.git',
            documentation: 'https://drive.google.com/drive/folders/1RqHnEfCJDFuFyqOwnnewjg1MOr2M1cZi?usp=sharing', // [cite: 72]
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
