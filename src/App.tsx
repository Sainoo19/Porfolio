/**
 * @fileoverview Main App Component
 * @description Root application component with all sections
 */

import { lazy, Suspense, createContext, useState, useEffect, useContext } from 'react';
import { Layout } from './components/layout/Layout';
import { LoadingScreen, HUDOverlay } from './components/ui';
import { HeroSection } from './components/sections';

// Lazy load heavy sections for better initial load
const AboutSection = lazy(() => import('./components/sections/AboutSection').then(m => ({ default: m.AboutSection })));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection').then(m => ({ default: m.SkillsSection })));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection').then(m => ({ default: m.ProjectsSection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then(m => ({ default: m.ContactSection })));

// Loading duration constant - shared across app
export const LOADING_DURATION = 4000;

// Loading context for shared state
interface LoadingContextType {
    isLoading: boolean;
}

export const LoadingContext = createContext<LoadingContextType>({ isLoading: true });
export const useLoadingState = () => useContext(LoadingContext);

// Minimal section fallback during lazy load
const SectionFallback = () => (
    <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
    </div>
);

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading }}>
            {/* Loading screen on initial load */}
            <LoadingScreen />

            {/* HUD Overlay - Pilot helmet effect */}
            <HUDOverlay />

            <Layout>
                {/* Hero loads immediately - critical for FCP */}
                <HeroSection />

                {/* Lazy loaded sections with suspense */}
                <Suspense fallback={<SectionFallback />}>
                    <AboutSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <SkillsSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <ExperienceSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <ProjectsSection />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <ContactSection />
                </Suspense>
            </Layout>
        </LoadingContext.Provider>
    );
}

export default App;
