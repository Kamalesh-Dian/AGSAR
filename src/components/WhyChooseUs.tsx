import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  CheckCheck,
  ShieldAlert,
  Lightbulb,
  Clock,
  Leaf
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const valueProps = [
    {
      icon: Award,
      title: 'Engineering Expertise',
      desc: 'Multidisciplinary engineering teams with comprehensive domain mastery spanning high-voltage substations, renewable systems, and industrial machinery.',
    },
    {
      icon: CheckCheck,
      title: 'Quality-Driven Execution',
      desc: 'Disciplined project workflows enforcing stringent technical specifications, verified component sourcing, and thorough inspection protocols.',
    },
    {
      icon: ShieldAlert,
      title: 'Safety-Focused Operations',
      desc: 'Uncompromising health, safety, and environmental (HSE) standards across all project sites, ensuring zero-incident operations.',
    },
    {
      icon: Lightbulb,
      title: 'Innovative Energy Solutions',
      desc: 'Forward-looking technologies including Battery Energy Storage Systems (BESS), solar-plus-storage hybridization, and smart power management.',
    },
    {
      icon: Clock,
      title: 'Reliable Project Delivery',
      desc: 'Systematic project management ensuring transparent milestones, proactive risk mitigation, and on-schedule grid synchronization.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Engineering',
      desc: 'Prioritizing eco-conscious engineering practices, energy conservation, and resilient green energy infrastructure designed for future generations.',
    },
  ];

  return (
    <section id="why-choose-us" className="section-padding section-bg-light">
      <div className="container">
        {/* Section Header with Scroll Animation */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge badge-red">
            <CheckCheck size={14} />
            <span>THE AGSAR ADVANTAGE</span>
          </div>
          <h2 className="section-title">Why Partner With AGSAR?</h2>
          <p className="section-description">
            We unite deep electromechanical competence with modern renewable innovation
            to build dependable, high-yield assets that stand the test of time.
          </p>
        </motion.div>

        {/* 6 Value Propositions Grid */}
        <div className="why-grid">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="why-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="why-icon-box">
                  <Icon size={26} />
                </div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

