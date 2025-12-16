/**
 * @fileoverview Footer Component - Mecha HUD System Signature
 * @description Site footer with pilot system branding and links
 */

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, Cpu, Signal, Shield } from 'lucide-react';
import { PERSONAL_INFO, NAV_ITEMS } from '../../constants';

/**
 * Footer component - System Signature Panel
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 border-t border-cyan-500/20 bg-gradient-to-b from-transparent to-cyan-950/20">
            {/* Top border decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            {/* Corner brackets */}
            <svg className="absolute bottom-4 left-4 w-6 h-6 text-cyan-500/30">
                <path d="M0 24 L0 0 L24 0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
            <svg className="absolute bottom-4 right-4 w-6 h-6 text-cyan-500/30">
                <path d="M24 24 L24 0 L0 0" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* System Brand */}
                    <div>
                        <a href="#home" className="inline-flex items-center gap-2">
                            {/* Hexagon logo */}
                            <div className="relative w-10 h-10">
                                <svg viewBox="0 0 40 40" className="w-full h-full">
                                    <polygon
                                        points="20,2 37,11 37,29 20,38 3,29 3,11"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="text-cyan-500"
                                    />
                                    <polygon
                                        points="20,6 33,13 33,27 20,34 7,27 7,13"
                                        fill="currentColor"
                                        className="text-cyan-500/20"
                                    />
                                    <text x="20" y="24" textAnchor="middle" className="fill-cyan-400 text-[10px] font-bold font-['Orbitron']">
                                        NVT
                                    </text>
                                </svg>
                            </div>
                            <div>
                                <span className="text-xl font-['Orbitron'] font-bold text-cyan-400">.SYS</span>
                                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Pilot Interface v2.0</span>
                            </div>
                        </a>
                        <p className="text-gray-400 mt-4 text-sm leading-relaxed font-['Rajdhani']">
                            <span className="text-cyan-500 font-mono">&gt;</span> Software Engineer & Project Coordinator
                            <br />
                            <span className="text-cyan-500 font-mono">&gt;</span> Ho Chi Minh City, Vietnam
                            <br />
                            <span className="text-cyan-500 font-mono">&gt;</span> Building next-gen applications
                        </p>

                        {/* System status */}
                        <div className="flex gap-4 mt-4 text-[10px] font-mono">
                            <span className="flex items-center gap-1 text-green-400">
                                <Cpu size={12} /> SYS_OK
                            </span>
                            <span className="flex items-center gap-1 text-cyan-400">
                                <Signal size={12} /> ONLINE
                            </span>
                            <span className="flex items-center gap-1 text-magenta-400">
                                <Shield size={12} /> SECURE
                            </span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-cyan-400 font-['Orbitron'] text-sm mb-4 flex items-center gap-2">
                            <span className="text-gray-600">[</span>
                            NAV_INDEX
                            <span className="text-gray-600">]</span>
                        </h4>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item, index) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="group text-gray-400 hover:text-cyan-400 transition-colors text-sm font-['Rajdhani'] flex items-center gap-2"
                                    >
                                        <span className="text-cyan-600 font-mono text-xs">0{index + 1}</span>
                                        <span className="text-cyan-500/50 group-hover:text-cyan-500 transition-colors">//</span>
                                        {item.label.toUpperCase()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Terminal */}
                    <div>
                        <h4 className="text-cyan-400 font-['Orbitron'] text-sm mb-4 flex items-center gap-2">
                            <span className="text-gray-600">[</span>
                            COMM_LINK
                            <span className="text-gray-600">]</span>
                        </h4>
                        <ul className="space-y-2 text-sm font-mono">
                            <li>
                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                                >
                                    <span className="text-cyan-600">EMAIL:</span>
                                    <span className="text-xs">{PERSONAL_INFO.email}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${PERSONAL_INFO.phone}`}
                                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                                >
                                    <span className="text-cyan-600">TEL:</span>
                                    <span className="text-xs">{PERSONAL_INFO.phone}</span>
                                </a>
                            </li>
                            <li className="text-gray-400 flex items-center gap-2">
                                <span className="text-cyan-600">LOC:</span>
                                <span className="text-xs">{PERSONAL_INFO.location}</span>
                            </li>
                        </ul>

                        {/* Social links - HUD style */}
                        <div className="flex gap-2 mt-4">
                            {[
                                { icon: Github, href: 'https://github.com/Sainoo19', label: 'GIT' },
                                { icon: Linkedin, href: 'https://linkedin.com/in/nvtrung19', label: 'LNK' },
                                { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'MSG' },
                            ].map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-3 py-2 bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                                    }}
                                >
                                    <div className="flex items-center gap-1.5">
                                        <Icon size={14} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                                        <span className="text-[10px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">{label}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* System signature bar */}
                <div className="pt-6 border-t border-cyan-500/10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <div className="flex items-center gap-3 text-xs font-mono">
                            <span className="text-cyan-600">&lt;/</span>
                            <span className="text-gray-500">© {currentYear}</span>
                            <span className="text-cyan-400">{PERSONAL_INFO.name}</span>
                            <span className="text-gray-600">|</span>
                            <span className="flex items-center gap-1 text-gray-500">
                                CRAFTED_WITH <Heart className="w-3 h-3 text-magenta-500 fill-magenta-500" /> IN_VIETNAM
                            </span>
                            <span className="text-cyan-600">/&gt;</span>
                        </div>

                        {/* Tech stack */}
                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600">
                            <span className="px-2 py-0.5 border border-cyan-500/20 text-cyan-500/70">REACT</span>
                            <span className="px-2 py-0.5 border border-cyan-500/20 text-cyan-500/70">THREE.JS</span>
                            <span className="px-2 py-0.5 border border-cyan-500/20 text-cyan-500/70">FRAMER</span>
                        </div>
                    </div>

                    {/* Bottom data line */}
                    <div className="mt-4 flex items-center justify-center gap-4 text-[9px] font-mono text-gray-700">
                        <span>BUILD://STABLE</span>
                        <span className="text-cyan-500/30">◆</span>
                        <span>VERSION://2.0.0</span>
                        <span className="text-cyan-500/30">◆</span>
                        <span>STATUS://OPERATIONAL</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
