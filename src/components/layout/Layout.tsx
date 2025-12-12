/**
 * @fileoverview Layout Component
 * @description Main layout wrapper with navbar and footer
 */

import type { ReactNode } from 'react';
import { Navbar, ScrollProgress, ScrollToTop } from '../ui';
import { MouseParticles } from '../three';
import { Footer } from './Footer';

interface LayoutProps {
    children: ReactNode;
}

/**
 * Main layout component
 */
export function Layout({ children }: LayoutProps) {
    return (
        <div className="relative min-h-screen bg-gray-950 text-white overflow-x-hidden">
            {/* Scroll progress bar */}
            <ScrollProgress />

            {/* Mouse trail particles */}
            <MouseParticles />

            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 -z-10" />

            {/* Grid pattern overlay */}
            <div
                className="fixed inset-0 -z-10 opacity-20"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main className="relative z-10">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Scroll to top button */}
            <ScrollToTop />
        </div>
    );
}
