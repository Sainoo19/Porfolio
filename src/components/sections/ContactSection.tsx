/**
 * @fileoverview Contact Section Component
 * @description Contact form and information with animations
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Github, Linkedin, CheckCircle, Loader2 } from 'lucide-react';
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
        label: 'Email',
        value: PERSONAL_INFO.email,
        href: `mailto:${PERSONAL_INFO.email}`,
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-500/20',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: PERSONAL_INFO.phone,
        href: `tel:${PERSONAL_INFO.phone}`,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: PERSONAL_INFO.location,
        href: '#',
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/20',
    },
];

const SOCIAL_LINKS = [
    {
        icon: Github,
        label: 'GitHub',
        href: 'https://github.com/Sainoo19',
        color: 'hover:text-white hover:bg-gray-700',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/nvtrung19',
        color: 'hover:text-blue-400 hover:bg-blue-500/20',
    },
    {
        icon: Mail,
        label: 'Email',
        href: `mailto:${PERSONAL_INFO.email}`,
        color: 'hover:text-indigo-400 hover:bg-indigo-500/20',
    },
];

/**
 * Contact section with form and contact information
 */
export function ContactSection() {
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
            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Get In Touch"
                    subtitle="Have a project in mind or want to discuss opportunities? Let's connect!"
                />

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
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Let's work together
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                I'm currently open to new opportunities as a Project Coordinator or
                                Business Analyst. Whether you have a project in mind, want to discuss
                                collaboration, or just want to say hi, feel free to reach out!
                            </p>
                        </motion.div>

                        {/* Contact cards */}
                        <motion.div variants={SLIDE_RIGHT_VARIANTS} className="space-y-4">
                            {CONTACT_INFO.map((contact, index) => (
                                <motion.a
                                    key={contact.label}
                                    href={contact.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 transition-all group"
                                >
                                    <div className={`p-3 rounded-xl ${contact.bgColor} group-hover:scale-110 transition-transform`}>
                                        <contact.icon className={contact.color} size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">{contact.label}</p>
                                        <p className="text-white font-medium">{contact.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Social links */}
                        <motion.div variants={SLIDE_RIGHT_VARIANTS}>
                            <p className="text-gray-500 mb-4">Or find me on</p>
                            <div className="flex gap-3">
                                {SOCIAL_LINKS.map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-400 transition-all ${social.color}`}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={24} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={SLIDE_LEFT_VARIANTS}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <GlassCard className="relative overflow-hidden">
                            {/* Success overlay */}
                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center z-10"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 15 }}
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                    </motion.div>
                                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                    <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                                        placeholder="Tell me about your project or inquiry..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                    leftIcon={isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
