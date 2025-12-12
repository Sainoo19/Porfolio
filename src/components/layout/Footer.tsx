/**
 * @fileoverview Footer Component
 * @description Site footer with links and copyright
 */

import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO, NAV_ITEMS } from '../../constants';

/**
 * Footer component
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <a href="#home" className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                NVT
                            </span>
                            <span className="text-white">.dev</span>
                        </a>
                        <p className="text-gray-500 mt-4 text-sm leading-relaxed">
                            Software Engineer & Project Coordinator based in Ho Chi Minh City,
                            passionate about building beautiful, functional applications.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="text-gray-500 hover:text-indigo-400 transition-colors text-sm"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href={`mailto:${PERSONAL_INFO.email}`}
                                    className="text-gray-500 hover:text-indigo-400 transition-colors"
                                >
                                    {PERSONAL_INFO.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${PERSONAL_INFO.phone}`}
                                    className="text-gray-500 hover:text-indigo-400 transition-colors"
                                >
                                    {PERSONAL_INFO.phone}
                                </a>
                            </li>
                            <li className="text-gray-500">{PERSONAL_INFO.location}</li>
                        </ul>

                        {/* Social icons */}
                        <div className="flex gap-3 mt-4">
                            {[
                                { icon: Github, href: 'https://github.com/Sainoo19' },
                                { icon: Linkedin, href: 'https://linkedin.com/in/nvtrung19' },
                                { icon: Mail, href: `mailto:${PERSONAL_INFO.email}` },
                            ].map(({ icon: Icon, href }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 bg-white/5 rounded-lg text-gray-500 hover:text-indigo-400 hover:bg-white/10 transition-all"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                        © {currentYear} {PERSONAL_INFO.name}. Made with{' '}
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Vietnam
                    </p>
                    <p className="text-gray-600 text-sm">
                        Built with React, Three.js & Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}
