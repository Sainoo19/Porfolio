/**
 * @fileoverview Main App Component
 * @description Root application component with all sections
 */

import { Layout } from './components/layout/Layout';
import { LoadingScreen } from './components/ui';
import {
    HeroSection,
    AboutSection,
    SkillsSection,
    ExperienceSection,
    ProjectsSection,
    ContactSection,
} from './components/sections';

function App() {
    return (
        <>
            {/* Loading screen on initial load */}
            <LoadingScreen />

            <Layout>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ExperienceSection />
                <ProjectsSection />
                <ContactSection />
            </Layout>
        </>
    );
}

export default App;
