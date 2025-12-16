/**
 * @fileoverview Portfolio-specific type definitions
 * @description Types for personal information, projects, experience, and skills
 */

export interface PersonalInfo {
    readonly name: string;
    readonly title: string;
    readonly email: string;
    readonly phone: string;
    readonly location: string;
    readonly summary: string;
    readonly socialLinks: SocialLink[];
}

export interface SocialLink {
    readonly platform: SocialPlatform;
    readonly url: string;
    readonly label: string;
}

export type SocialPlatform = 'github' | 'linkedin' | 'email' | 'phone';

export interface Skill {
    readonly id: string;
    readonly name: string;
    readonly category: SkillCategory;
    readonly proficiency: number;
    readonly icon?: string;
}

export type SkillCategory =
    | 'language'
    | 'framework'
    | 'database'
    | 'tool'
    | 'soft-skill'
    | 'methodology';

export interface Experience {
    readonly id: string;
    readonly company: string;
    readonly position: string;
    readonly startDate: string;
    readonly endDate: string | 'Present';
    readonly location?: string;
    readonly logo?: string;
    readonly responsibilities: string[];
    readonly achievements: Achievement[];
    readonly technologies?: string[];
}

export interface Achievement {
    readonly title: string;
    readonly description: string;
}

export interface Project {
    readonly id: string;
    readonly title: string;
    readonly role: string;
    readonly description: string;
    readonly teamSize: number;
    readonly startDate: string;
    readonly endDate: string;
    readonly techStack: TechStack;
    readonly links: ProjectLinks;
    readonly highlights: string[];
    readonly thumbnail?: string;
}

export interface TechStack {
    readonly frontend: string[];
    readonly backend: string[];
    readonly database: string[];
    readonly tools?: string[];
}

export interface ProjectLinks {
    readonly demo?: string;
    readonly github?: string;
    readonly documentation?: string;
}

export interface Education {
    readonly institution: string;
    readonly degree: string;
    readonly field: string;
    readonly startYear: number;
    readonly endYear: number;
    readonly gpa?: number;
}

export interface Certification {
    readonly id: string;
    readonly name: string;
    readonly issuer: string;
    readonly status: CertificationStatus;
    readonly expectedDate?: string;
    readonly completedDate?: string;
}

export type CertificationStatus = 'completed' | 'in-progress' | 'planned';

export interface PortfolioData {
    readonly personalInfo: PersonalInfo;
    readonly skills: Skill[];
    readonly experiences: Experience[];
    readonly projects: Project[];
    readonly education: Education[];
    readonly certifications: Certification[];
}
