import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Video from user */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hero-video-bg"
      >
        <source src="/videos/agsar-hero.mp4" type="video/mp4" />
      </video>

      {/* Solid Dark Tint Overlay - Zero Gradient, Strict Legibility */}
      {/* <div className="hero-overlay" /> */}

      <div className="container hero-content-wrapper">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-container">
            <div className="hero-tracker">
              <span className="tracker-dot" />
              <span>ENGINEERING A SUSTAINABLE FUTURE</span>
            </div>

            {/* Solid White Typography - Zero Gradient Text */}
            <h1 className="hero-title">
              Powering Progress. <br />
              Engineering Tomorrow.
            </h1>

            <p className="hero-desc">
              Delivering reliable electromechanical engineering and innovative
              energy solutions through technology, expertise, and sustainable
              practices.
            </p>

            <div className="hero-actions">
              {/* Primary Accent Button with Super Interactive Magnetic Capsule */}
              <a
                href="#services"
                className="btn btn-primary btn-lg"
                onClick={scrollToServices}
              >
                <span>Explore Our Services</span>
                <span className="btn-icon-capsule">
                  <ArrowRight size={16} />
                </span>
              </a>

              <a
                href="#contact"
                className="btn btn-outline btn-lg"
                onClick={scrollToContact}
              >
                <span>Contact Us</span>
                <span className="btn-icon-capsule">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Architectural Engineering Telemetry (Zero 3D Blobs, Zero Glass) */}
        {/* <div className="hero-telemetry">
          <div className="telemetry-box">
            <div className="telemetry-header">
              <span className="telemetry-label">SYSTEM CAPABILITIES</span>
              <span className="telemetry-status">OPERATIONAL</span>
            </div>
            <div className="telemetry-rows">
              <div className="telemetry-item">
                <span className="item-title">Renewable Generation</span>
                <span className="item-value">Solar & Wind Balance of Plant</span>
              </div>
              <div className="telemetry-item">
                <span className="item-title">Grid Stabilization</span>
                <span className="item-value">Utility Scale BESS Integration</span>
              </div>
              <div className="telemetry-item">
                <span className="item-title">Power Transmission</span>
                <span className="item-value">HT & EHT Substation Systems</span>
              </div>
              <div className="telemetry-item">
                <span className="item-title">Fluid Mechanics</span>
                <span className="item-value">Industrial Pumps & Drive Motors</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};
