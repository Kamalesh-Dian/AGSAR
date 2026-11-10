import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCode2,
  DraftingCompass,
  PackageCheck,
  Wrench,
  Gauge,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface Stage {
  step: string;
  number: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  deliverables: string[];
}

export const Expertise: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stages: Stage[] = [
    {
      step: 'Stage 01',
      number: '01',
      title: 'Engineering & Consultation',
      shortDesc: 'Feasibility audits, load calculation, solar yield analysis, and technical advisory.',
      icon: FileCode2,
      deliverables: [
        'Site assessment & solar irradiance studies',
        'Grid interconnection feasibility checks',
        'Regulatory & safety compliance evaluation',
        'Capex / Opex optimization modeling'
      ]
    },
    {
      step: 'Stage 02',
      number: '02',
      title: 'System Design & Planning',
      shortDesc: 'Detailed engineering, SLDs, 3D BIM coordination, and civil-structural integration.',
      icon: DraftingCompass,
      deliverables: [
        'Single-line diagrams (SLD) & wiring schematics',
        'Substation layout & cable schedule design',
        'Structural mounting calculations & wind load stress',
        'SCADA architecture and protection coordination'
      ]
    },
    {
      step: 'Stage 03',
      number: '03',
      title: 'Equipment Supply & Integration',
      shortDesc: 'Sourcing tier-1 transformers, switchgear, solar modules, BESS, and industrial pumps.',
      icon: PackageCheck,
      deliverables: [
        'Procurement of certified tier-1 electromechanical gear',
        'Factory Acceptance Testing (FAT) witnessing',
        'Custom control panel & VFD assembly',
        'Logistics coordination and on-site staging'
      ]
    },
    {
      step: 'Stage 04',
      number: '04',
      title: 'Installation & Commissioning',
      shortDesc: 'Precision erection, civil works, cabling, termination, and utility grid synchronization.',
      icon: Wrench,
      deliverables: [
        'Safe mechanical & electrical erection',
        'High-voltage termination and jointing',
        'Relay programming and interlock verification',
        'Grid synchronization and cold/hot energization'
      ]
    },
    {
      step: 'Stage 05',
      number: '05',
      title: 'Testing & Maintenance',
      shortDesc: 'Comprehensive pre-commissioning tests, infrared thermography, and life-cycle O&M.',
      icon: Gauge,
      deliverables: [
        'Dielectric insulation & contact resistance testing',
        'Vibration analysis & dynamic motor balancing',
        'Infrared thermography scan for hotspots',
        'Preventive maintenance & emergency response'
      ]
    }
  ];

  return (
    <section id="expertise" className="section-padding expertise-section">
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header with Scroll Animation */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge badge-red">
            <span>END-TO-END EXECUTION</span>
          </div>
          <h2 className="section-title">
            Powering Every Stage of Engineering
          </h2>
          <p className="section-description">
            From initial project conceptualization to rigorous testing and long-term
            asset maintenance, AGSAR guarantees engineered reliability at every milestone.
          </p>
        </motion.div>

        {/* Timeline Process Track with Staggered Scroll Entrance */}
        <motion.div
          className="timeline-track"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={stage.number}
                className="timeline-step"
                onClick={() => setActiveStep(idx)}
                style={{ cursor: 'pointer' }}
              >
                <div className="timeline-step-connector" />
                
                <div
                  className="timeline-node-wrap"
                  style={{
                    borderColor: isActive ? 'var(--color-accent-red)' : undefined,
                    color: isActive ? '#FFFFFF' : undefined,
                    background: isActive ? 'var(--color-accent-red)' : undefined,
                    boxShadow: isActive ? '0 0 25px rgba(217, 37, 52, 0.45)' : undefined,
                  }}
                >
                  <Icon size={22} />
                </div>

                <div
                  className="timeline-step-card"
                  style={{
                    borderColor: isActive ? 'var(--color-accent-red)' : undefined,
                    boxShadow: isActive ? '0 10px 25px rgba(217, 37, 52, 0.12)' : undefined,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: isActive ? 'var(--color-accent-red)' : '#536B82',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.35rem',
                      display: 'block'
                    }}
                  >
                    {stage.step}
                  </span>
                  <h3 className="timeline-step-title">{stage.title}</h3>
                  <p className="timeline-step-desc">{stage.shortDesc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Active Stage Deep-Dive Card - Clean White Panel */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            marginTop: '3.5rem',
            background: '#FFFFFF',
            border: '2px solid #E6EFF6',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 12px 35px rgba(11, 59, 96, 0.08)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.8fr',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-red)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              <span>ACTIVE STAGE FOCUS:</span>
              <span>{stages[activeStep].step}</span>
            </div>
            <h3 style={{ color: 'var(--color-primary-blue)', fontSize: '1.65rem', marginBottom: '0.75rem' }}>
              {stages[activeStep].title}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {stages[activeStep].shortDesc} Our engineering standards enforce transparent protocols and verification checkpoints.
            </p>
            <a
              href="#contact"
              className="btn btn-primary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Consult on this Stage</span>
              <span className="btn-icon-capsule">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>

          <div>
            <h4 style={{ color: 'var(--color-primary-blue)', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '0.04em' }}>
              Key Technical Deliverables in this Stage:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
              {stages[activeStep].deliverables.map((item, dIdx) => (
                <div
                  key={dIdx}
                  style={{
                    background: '#F8FAFC',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '8px',
                    border: '1px solid #E2ECF3',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    color: 'var(--color-dark-text)',
                    fontSize: '0.875rem',
                    lineHeight: 1.45,
                  }}
                >
                  <CheckCircle size={16} color="var(--color-accent-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
