/**
 * @fileoverview Contact Section Component - Mecha HUD Communication Terminal
 * @description Contact form as comm terminal with HUD styling
 */

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, CheckCircle, Loader2, Radio, Signal } from 'lucide-react';
import { SectionTitle, Button, GlassCard } from '../ui';
import { PERSONAL_INFO } from '../../constants';
import { SLIDE_LEFT_VARIANTS, SLIDE_RIGHT_VARIANTS, STAGGER_CONTAINER_VARIANTS } from '../../constants';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const CONTACT_INFO = [
    {
        icon: Mail,
        label: 'EMAIL_LINK',
        value: PERSONAL_INFO.email,
        href: `mailto:${PERSONAL_INFO.email}`,
        code: 'EM-01',
    },
    {
        icon: Phone,
        label: 'VOICE_COMM',
        value: PERSONAL_INFO.phone,
        href: `tel:${PERSONAL_INFO.phone}`,
        code: 'VC-02',
    },
    {
        icon: MapPin,
        label: 'BASE_LOC',
        value: PERSONAL_INFO.location,
        href: '#',
        code: 'BL-03',
    },
];

const SOCIAL_LINKS = [
    {
        icon: Github,
        label: 'GIT',
        href: 'https://github.com/Sainoo19',
    },
    {
        icon: Linkedin,
        label: 'LNK',
        href: 'https://www.linkedin.com/in/sainoo19/',
    },
    {
        icon: Mail,
        label: 'MSG',
        href: `mailto:${PERSONAL_INFO.email}`,
    },
];

/**
 * Contact section - Communication Terminal
 */
export const ContactSection = memo(function ContactSection() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after showing success message
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
            {/* HUD Background grid */}
            <div className="absolute inset-0 bg-hud-grid opacity-20" />

            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-500 mb-2">
                        <Radio size={12} className="animate-pulse" />
                        COMM_TERMINAL_ACTIVE
                    </div>
                    <SectionTitle
                        title="Establish Link"
                        subtitle="Open communication channel for mission briefings and collaboration requests"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        variants={STAGGER_CONTAINER_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <motion.div variants={SLIDE_RIGHT_VARIANTS}>
                            <h3 className="text-xl font-['Orbitron'] font-bold text-cyan-400 mb-4 flex items-center gap-2">
                                <span className="text-gray-600">[</span>
                                COLLABORATION_REQUEST
                                <span className="text-gray-600">]</span>
                            </h3>
                            <p className="text-gray-400 leading-relaxed font-['Rajdhani']">
                                <span className="text-cyan-500 font-mono">&gt;</span> Currently accepting mission assignments as Project Coordinator or Business Analyst.
                                <br />
                                <span className="text-cyan-500 font-mono">&gt;</span> Ready for deployment in challenging environments.
                                <br />
                                <span className="text-cyan-500 font-mono">&gt;</span> All communications are secure and encrypted.
                            </p>
                        </motion.div>

                        {/* Contact cards - HUD style */}
                        <motion.div variants={SLIDE_RIGHT_VARIANTS} className="space-y-3">
                            {CONTACT_INFO.map((contact, index) => (
                                <motion.a
                                    key={contact.label}
                                    href={contact.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 8 }}
                                    className="flex items-center gap-4 p-4 bg-cyan-500/5 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 transition-all group"
                                    style={{
                                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                                    }}
                                >
                                    <div
                                        className="p-3 bg-cyan-500/10 border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-all"
                                        style={{ clipPath: 'polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                                    >
                                        <contact.icon className="text-cyan-400" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500 text-[10px] font-mono flex items-center gap-2">
                                            <span className="text-cyan-600">[{contact.code}]</span>
                                            {contact.label}
                                        </p>
                                        <p className="text-white font-['Rajdhani'] font-medium group-hover:text-cyan-300 transition-colors">{contact.value}</p>
                                    </div>
                                    <Signal size={14} className="text-green-400 animate-pulse" />
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Social links - HUD style */}
                        <motion.div variants={SLIDE_RIGHT_VARIANTS}>
                            <p className="text-gray-500 mb-4 text-xs font-mono">[EXTERNAL_LINKS]</p>
                            <div className="flex gap-2">
                                {SOCIAL_LINKS.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative px-4 py-2 bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                                        style={{
                                            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                                        }}
                                        aria-label={social.label}
                                    >
                                        <div className="flex items-center gap-2">
                                            <social.icon size={16} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                                            <span className="text-[10px] font-mono text-gray-500 group-hover:text-cyan-400 transition-colors">{social.label}</span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Status indicator */}
                        <div className="p-4 border border-cyan-500/20 bg-cyan-500/5"
                            style={{ clipPath: 'polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-gray-500">TERMINAL_STATUS</span>
                                <span className="flex items-center gap-2 text-green-400">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    ONLINE
                                </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                                <span className="text-gray-500">RESPONSE_TIME</span>
                                <span className="text-cyan-400">&lt; 24 HOURS</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Transmission Panel */}
                    <motion.div
                        variants={SLIDE_LEFT_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <GlassCard className="relative overflow-hidden">
                            {/* Form header */}
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-500/20">
                                <span className="text-[10px] font-mono text-cyan-500">[MSG_COMPOSE]</span>
                                <span className="text-[10px] font-mono text-gray-600">ENCRYPT: AES-256</span>
                            </div>

                            {/* Success overlay */}
                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center z-10"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 15 }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                                    </motion.div>
                                    <h4 className="text-xl font-['Orbitron'] font-bold text-cyan-400 mb-2">TRANSMISSION SENT</h4>
                                    <p className="text-gray-400 font-['Rajdhani']">Message encrypted and delivered. Awaiting response.</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-[10px] font-mono text-cyan-600 mb-2 uppercase">
                                            [SENDER_ID]
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/20 text-white font-['Rajdhani'] placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/10 transition-all"
                                            style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                                            placeholder="Enter designation"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-[10px] font-mono text-cyan-600 mb-2 uppercase">
                                            [RETURN_ADDR]
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/20 text-white font-['Rajdhani'] placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/10 transition-all"
                                            style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                                            placeholder="comm@link.net"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-[10px] font-mono text-cyan-600 mb-2 uppercase">
                                        [MSG_SUBJECT]
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/20 text-white font-['Rajdhani'] placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/10 transition-all"
                                        style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                                        placeholder="Mission briefing / Collaboration request"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-[10px] font-mono text-cyan-600 mb-2 uppercase">
                                        [MSG_CONTENT]
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-cyan-500/5 border border-cyan-500/20 text-white font-['Rajdhani'] placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/10 transition-all resize-none"
                                        style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                                        placeholder="Enter transmission content..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    leftIcon={isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                >
                                    {isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
                                </Button>

                                {/* Form footer */}
                                <div className="pt-4 border-t border-cyan-500/10 flex items-center justify-between text-[9px] font-mono text-gray-600">
                                    <span>PROTOCOL: SECURE_MSG_v2</span>
                                    <span>ALL_FIELDS_REQUIRED</span>
                                </div>
                            </form>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});
