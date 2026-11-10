import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Expertise } from './components/Expertise';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MascotScroll } from './components/MascotScroll';
import { MessageSquare, ArrowUp } from 'lucide-react';
import './styles/global.css';
import './styles/components.css';

export const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Framer Motion Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="agsar-app">
      {/* Framer Motion Viewport Top Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Interactive Scroll-Scrubbed Engineer Mascot */}
      {/* <MascotScroll /> */}

      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      <main>
        {/* 2. Full-screen Cinematic Video Hero */}
        <Hero />

        {/* 3. About Us Section */}
        <About />

        {/* 4. Looped Services Section with Scrolltide Hover Tabs */}
        <Services />

        {/* 5. Engineering Expertise Timeline */}
        <Expertise />

        {/* 6. Why Choose AGSAR? */}
        <WhyChooseUs />

        {/* 7. Contact & Inquiry Section */}
        {/* <Contact /> */}
      </main>

      {/* 8. Scrolltide Bean Bag Nap Inspired Corporate Footer */}
      <Footer />

      {/* Floating Action Button Group (Bottom Right) with Liquid Glass */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 90,
        }}
      >
        {/* Quick Inquiry / Chat Floating Button - Liquid Glass Pill */}
        <button
          type="button"
          onClick={scrollToContact}
          className="btn btn-primary"
          style={{
            width: '48px',
            height: '48px',
            padding: 0,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Quick Project Inquiry"
          title="Quick Project Inquiry"
        >
          <MessageSquare size={18} />
        </button>

        {/* Scroll To Top Button - Liquid Glass Pill */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="btn btn-outline-dark"
            style={{
              width: '48px',
              height: '48px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
