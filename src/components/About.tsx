import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Shield, Leaf, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="section-padding section-bg-light">
      <div className="container">
        {/* Section Header with Framer Motion Scroll Trigger */}
        <motion.div
          className="section-header text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge badge-red">
            <Leaf size={14} />
            <span>ABOUT AGSAR</span>
          </div>
          <h2 className="section-title">
            Engineering Excellence. <br />Building a Sustainable Future.
          </h2>
          <p className="section-description">
            AGSAR ELECTROMECHANICAL ENGINEERING LLP delivers dependable, high-precision
            electromechanical engineering and renewable energy integration. We bridge
            complex industrial power infrastructure with modern sustainability standards.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="about-grid">
          {/* Left Column: Company Story & Four Pillars with Staggered Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-intro-lead">
              Our multidisciplinary engineering teams design, install, and service critical power,
              storage, and electromechanical systems built for long-term operational resilience.
            </p>
            <p style={{ marginBottom: '1.75rem', color: 'var(--text-secondary)' }}>
              From grid-scale solar generation and Battery Energy Storage Systems (BESS) to
              high-voltage transmission networks and heavy industrial pumping setups, we apply
              rigorous engineering discipline to every stage of your asset's lifecycle.
            </p>

            {/* 4 Pillars Grid: Staggered Scroll Entrance */}
            <motion.div
              className="about-pillars"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="pillar-card" variants={itemVariants}>
                <div className="pillar-icon-box">
                  <Compass size={22} />
                </div>
                <h3 className="pillar-title">Our Mission</h3>
                <p className="pillar-desc">
                  To deliver reliable, energy-efficient, and turnkey electromechanical solutions
                  that empower industries to thrive sustainably.
                </p>
              </motion.div>

              <motion.div className="pillar-card" variants={itemVariants}>
                <div className="pillar-icon-box">
                  <Target size={22} />
                </div>
                <h3 className="pillar-title">Our Vision</h3>
                <p className="pillar-desc">
                  To be a premier engineering partner recognized for innovation, uncompromising
                  safety, and next-generation clean energy infrastructure.
                </p>
              </motion.div>

              <motion.div className="pillar-card" variants={itemVariants}>
                <div className="pillar-icon-box">
                  <Shield size={22} />
                </div>
                <h3 className="pillar-title">Quality & Safety</h3>
                <p className="pillar-desc">
                  Zero-compromise protocols ensuring technical compliance, workforce protection,
                  and rock-solid operational longevity.
                </p>
              </motion.div>

              <motion.div className="pillar-card" variants={itemVariants}>
                <div className="pillar-icon-box">
                  <Leaf size={22} />
                </div>
                <h3 className="pillar-title">Sustainable Approach</h3>
                <p className="pillar-desc">
                  Harnessing clean technology and smart energy conservation to minimize carbon
                  footprints and maximize operating efficiency.
                </p>
              </motion.div>
            </motion.div>

            {/* Key Value Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary-blue)' }}>
                <CheckCircle2 size={18} color="var(--accent)" />
                Comprehensive End-to-End Electromechanical Lifecycle
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-primary-blue)' }}>
                <CheckCircle2 size={18} color="var(--accent)" />
                Specialized in Renewable Energy Grid Interconnection
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Res Project Imagery with Zoom Reveal */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-image-frame">
              <img
                src="/images/about-engineering.jpg"
                alt="AGSAR Electromechanical Engineering Specialists on site"
                className="about-img"
                loading="lazy"
                width="600"
                height="480"
              />
            </div>

            {/* Floating Quality Badge */}
            <div className="about-floating-stat">
              <span className="stat-badge-accent">CORE PHILOSOPHY</span>
              <div className="stat-title">Engineered with Precision. Delivered with Integrity.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
