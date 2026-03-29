/**
 * @fileoverview Navbar Component - Mecha HUD Style
 * @description Cyberpunk pilot helmet HUD navigation
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Target, Eye, EyeOff } from 'lucide-react';
import { NAV_ITEMS } from '../../constants';
import { useLoadingState } from '../../App';

/**
 * HUD-style navigation bar
 */
export function Navbar() {
    const { isLoading } = useLoadingState();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isHidden, setIsHidden] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50 !== isScrolled) {
            setIsScrolled(latest > 50);
        }

        // Active section detection
        const sections = NAV_ITEMS.map((item) => item.href.replace('#', ''));
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    if (activeSection !== section) {
                        setActiveSection(section);
                    }
                    break;
                }
            }
        }
    });

    // Memoized nav click handler
    const handleNavClick = useCallback((href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Don't render until loading screen is done
    if (isLoading) {
        return null;
    }

    return (
        <>
            {/* Manual Header Toggle Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsHidden(!isHidden)}
                className={`fixed top-4 right-4 z-[60] p-2 flex items-center justify-center transition-all bg-gray-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 md:hidden ${isHidden ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                title={isHidden ? "Show Header" : "Hide Header"}
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
            >
                {isHidden ? <Eye size={18} /> : <EyeOff size={18} />}
            </motion.button>
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsHidden(!isHidden)}
                className={`hidden md:flex fixed top-4 right-4 z-[60] p-2 items-center justify-center transition-all bg-gray-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 group ${isHidden ? '' : 'bg-transparent border-transparent text-cyan-400/50 hover:text-cyan-400'}`}
                title={isHidden ? "Show Header" : "Hide Header"}
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
            >
                {isHidden ? <Eye size={18} /> : <EyeOff size={18} className="rotate-180" />}
            </motion.button>

            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: isHidden ? -120 : 0, opacity: isHidden ? 0 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'shadow-lg shadow-cyan-500/10'
                    : ''
                    } bg-gray-950/95 backdrop-blur-xl border-b border-cyan-500/30`}
            >
                {/* HUD top border animation */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                    animate={{ opacity: isScrolled ? 1 : 0.3 }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo - HUD Style */}
                        <motion.a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#home');
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative flex items-center gap-2"
                        >
                            {/* Hexagon logo container */}
                            <div className="relative">
                                <svg width="40" height="40" viewBox="0 0 40 40">
                                    <polygon
                                        points="20,2 38,11 38,29 20,38 2,29 2,11"
                                        fill="none"
                                        stroke="rgba(34, 211, 238, 0.6)"
                                        strokeWidth="1.5"
                                    />
                                    <polygon
                                        points="20,8 32,14 32,26 20,32 8,26 8,14"
                                        fill="rgba(34, 211, 238, 0.1)"
                                        stroke="rgba(34, 211, 238, 0.3)"
                                        strokeWidth="1"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-cyan-400 font-bold text-sm font-['Orbitron']">
                                    NVT
                                </span>
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-wider">
                                    Pilot Interface
                                </div>
                                <div className="text-cyan-400 font-['Orbitron'] font-bold text-sm tracking-wide">
                                    SYSTEM <span className="text-magenta-400">ONLINE</span>
                                </div>
                            </div>
                        </motion.a>

                        {/* Desktop Navigation - HUD Style */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_ITEMS.map((item, index) => {
                                const isActive = activeSection === item.href.replace('#', '');
                                return (
                                    <motion.a
                                        key={item.href}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative px-4 py-2 text-sm font-['Orbitron'] uppercase tracking-wider transition-all ${isActive
                                            ? 'text-cyan-400'
                                            : 'text-gray-400 hover:text-cyan-300'
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <span className="text-cyan-500/50 text-xs">0{index + 1}</span>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <>
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/40"
                                                    style={{
                                                        clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 20%)'
                                                    }}
                                                />
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500 via-magenta-500 to-cyan-500"
                                                />
                                            </>
                                        )}
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* CTA Button - HUD Style */}
                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#contact');
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-cyan-500/50 text-cyan-400 text-sm font-['Orbitron'] uppercase tracking-wider hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                            style={{
                                clipPath: 'polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)'
                            }}
                        >
                            <Target size={16} className="text-magenta-400" />
                            Contact
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu - HUD Style */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-72 bg-gray-950/95 backdrop-blur-xl border-l border-cyan-500/30 p-6 pt-20"
                        >
                            {/* HUD decorative border */}
                            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-magenta-500 to-cyan-500" />

                            <div className="flex flex-col gap-2">
                                {NAV_ITEMS.map((item, index) => {
                                    const isActive = activeSection === item.href.replace('#', '');
                                    return (
                                        <motion.a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(item.href);
                                            }}
                                            whileHover={{ x: 10 }}
                                            className={`relative px-4 py-3 text-lg font-['Orbitron'] uppercase tracking-wider flex items-center gap-3 ${isActive
                                                ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-500'
                                                : 'text-gray-400 hover:text-cyan-300 border-l-2 border-transparent'
                                                }`}
                                        >
                                            <span className="text-cyan-500/50 text-xs font-mono">0{index + 1}</span>
                                            {item.label}
                                        </motion.a>
                                    );
                                })}

                                <motion.a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick('#contact');
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-4 px-5 py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-center font-['Orbitron'] uppercase tracking-wider hover:bg-cyan-500/20"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        <Target size={18} className="text-magenta-400" />
                                        Initialize Contact
                                    </span>
                                </motion.a>
                            </div>

                            {/* Status indicator */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="text-xs font-mono text-cyan-400/50 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    NAVIGATION ACTIVE
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
