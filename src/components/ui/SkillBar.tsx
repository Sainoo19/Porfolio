/**
 * @fileoverview Skill Bar Component
 * @description Animated progress bar for skills
 */

import { motion } from 'framer-motion';
import type { Skill } from '../../types';

interface SkillBarProps {
    skill: Skill;
    index: number;
}

/**
 * Animated skill progress bar
 */
export function SkillBar({ skill, index }: SkillBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group"
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-200 font-medium group-hover:text-indigo-400 transition-colors">
                    {skill.name}
                </span>
                <span className="text-indigo-400 text-sm font-mono">
                    {skill.proficiency}%
                </span>
            </div>

            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Progress bar */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{
                        delay: index * 0.1 + 0.3,
                        duration: 1,
                        ease: 'easeOut'
                    }}
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>
            </div>
        </motion.div>
    );
}

/**
 * Circular skill indicator
 */
export function SkillCircle({ skill, index }: SkillBarProps) {
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (skill.proficiency / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-3 group"
        >
            <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-gray-800"
                    />

                    {/* Progress circle */}
                    <motion.circle
                        cx="48"
                        cy="48"
                        r="40"
                        fill="none"
                        stroke="url(#skillGradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1.5, ease: 'easeOut' }}
                        style={{ strokeDasharray: circumference }}
                    />

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                        {skill.proficiency}%
                    </span>
                </div>
            </div>

            <span className="text-gray-300 text-sm font-medium text-center group-hover:text-indigo-400 transition-colors">
                {skill.name}
            </span>
        </motion.div>
    );
}
