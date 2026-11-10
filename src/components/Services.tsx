import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SunMedium,
  BatteryCharging,
  Wind,
  Zap,
  Activity,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  category: string;
  icon: React.ElementType;
  image: string;
  shortDesc: string;
  features: string[];
  fullDesc: string;
  keyDeliverables: string[];
  applications: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: 'solar-energy',
    num: '01',
    title: 'Solar Energy Solutions',
    category: 'Renewable Power',
    icon: SunMedium,
    image: '/images/solar.jpg',
    shortDesc:
      'Turnkey photovoltaic power plants, commercial rooftop solar arrays, and utility-scale integration engineered for peak generation efficiency.',
    features: [
      'Solar power generation systems',
      'Solar installation and integration',
      'Renewable energy infrastructure',
    ],
    fullDesc:
      'AGSAR provides end-to-end solar PV solutions spanning initial irradiance analysis, structural mounting design, inverter station synchronization, and grid connection.',
    keyDeliverables: [
      'MW-scale solar farm balance of plant (BOP)',
      'High-efficiency bifacial module arrays',
      'Central and string inverter integration',
      'SCADA-based string monitoring & analytics',
    ],
    applications: ['Utility-scale Solar Parks', 'Industrial Manufacturing Facilities', 'Commercial Rooftops', 'Agricultural Microgrids'],
  },
  {
    id: 'bess',
    num: '02',
    title: 'Battery Energy Storage Systems (BESS)',
    category: 'Energy Storage & Grid Stability',
    icon: BatteryCharging,
    image: '/images/bess.jpg',
    shortDesc:
      'Advanced utility-grade energy storage systems providing peak shaving, frequency regulation, and emergency power resilience.',
    features: [
      'Energy storage solutions',
      'Battery integration & management',
      'Energy management and backup systems',
    ],
    fullDesc:
      'Our BESS engineering encompasses containerized lithium-ion battery banks, bidirectional power conversion systems (PCS), intelligent thermal management, and fire suppression protocols.',
    keyDeliverables: [
      'Containerized utility and C&I BESS setups',
      'Battery Management System (BMS) integration',
      'Bi-directional Power Conversion Systems (PCS)',
      'Substation and grid synchronization',
    ],
    applications: ['Peak Shaving for Commercial Campuses', 'Renewable Energy Smoothing', 'Microgrid Backup Power', 'Black-start Capability'],
  },
  {
    id: 'wind-power',
    num: '03',
    title: 'Wind Power Solutions',
    category: 'Renewable Infrastructure',
    icon: Wind,
    image: '/images/wind.jpg',
    shortDesc:
      'Specialized electromechanical infrastructure, collector substation engineering, and power evacuation support for onshore wind assets.',
    features: [
      'Wind energy infrastructure',
      'Renewable power integration',
      'Wind power engineering support',
    ],
    fullDesc:
      'We support wind power developers and operators with rigorous internal electrical reticulation, cabling, transformer yards, and grid-code compliant interconnection.',
    keyDeliverables: [
      'Wind turbine electrical balance of plant',
      'Collector substation construction & cabling',
      'Reactive power compensation (STATCOM/SVC)',
      'Scheduled electromechanical maintenance',
    ],
    applications: ['Onshore Wind Farms', 'Hybrid Wind-Solar Facilities', 'Remote Industrial Power Networks'],
  },
  {
    id: 'ht-eht',
    num: '04',
    title: 'HT & EHT Electrical Solutions',
    category: 'Power Transmission & Distribution',
    icon: Zap,
    image: '/images/ht-eht.jpg',
    shortDesc:
      'Comprehensive high-tension and extra-high-tension engineering: transmission substations, GIS/AIS switchgear, transformers, and distribution networks.',
    features: [
      'High-tension electrical systems',
      'Extra-high-tension infrastructure',
      'Electrical transmission and distribution solutions',
    ],
    fullDesc:
      'High-voltage infrastructure execution: design, supply, testing, and commissioning of up to 400kV substations, power transformers, switchgear, and protection relays.',
    keyDeliverables: [
      'Substation design and turnkey installation',
      'HT panels, switchboards, and busduct routing',
      'Transformer delivery, oil filtration, and commissioning',
      'Protection relay coordination & fault analysis',
    ],
    applications: ['Industrial Substations', 'National Grid Interconnections', 'Heavy Processing Plants', 'Renewable Evacuation Yards'],
  },
  {
    id: 'pumps-motors',
    num: '05',
    title: 'Pumps & Motors',
    category: 'Industrial Machinery',
    icon: Activity,
    image: '/images/pumps-motors.jpg',
    shortDesc:
      'Industrial pump skids, heavy-duty induction motors, variable frequency drive (VFD) panels, and vibration-tested fluid handling machinery.',
    features: [
      'Industrial pumps (centrifugal, submersible, multistage)',
      'Electric motors & VFD integration',
      'Installation, maintenance, and engineering support',
    ],
    fullDesc:
      'We supply, install, align, and maintain industrial pumps and motors engineered for water distribution, cooling loops, process fluids, and wastewater treatment.',
    keyDeliverables: [
      'High-pressure multistage & centrifugal pump sets',
      'Medium and low voltage electric motors',
      'Variable Frequency Drives (VFD) & soft starters',
      'Laser shaft alignment & dynamic vibration testing',
    ],
    applications: ['Municipal Water Supply', 'Cooling Tower Loops', 'Chemical & Food Processing', 'Mining & Irrigation Schemes'],
  },
];

const AUTO_LOOP_INTERVAL = 5000; // 5 seconds per slide

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalService, setModalService] = useState<ServiceItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const currentService = servicesData[activeTab];

  // Auto-advance loop timer with progress bar
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const stepTime = 50;
    const increment = (stepTime / AUTO_LOOP_INTERVAL) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    timerRef.current = window.setInterval(() => {
      setActiveTab((prev) => (prev + 1) % servicesData.length);
      setProgress(0);
    }, AUTO_LOOP_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, activeTab]);

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % servicesData.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + servicesData.length) % servicesData.length);
    setProgress(0);
  };

  const handleSelectTab = (index: number) => {
    setActiveTab(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleInquire = (serviceTitle: string) => {
    setModalService(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const selectElement = document.getElementById('service-select') as HTMLSelectElement | null;
      if (selectElement) {
        selectElement.value = serviceTitle;
      }
    }
  };

  return (
    <section id="services" className="section-padding">
      <div className="container">
        {/* Section Header with Scroll Stagger */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">
            <span>CORE CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            Comprehensive Engineering & Energy Solutions
          </h2>
          <p className="section-description">
            Delivering advanced electromechanical engineering, renewable power generation,
            and high-voltage infrastructure tailored to strict engineering standards.
          </p>
        </motion.div>

        {/* Scrolltide Hover Tabs Layout (#c-hover-tabs) with Auto-Loop */}
        <div
          className="hover-tabs-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: Interactive Services Tabs */}
          <div className="hover-tabs-list" role="tablist">
            {servicesData.map((item, index) => {
              const isActive = activeTab === index;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`hover-tab-row ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => handleSelectTab(index)}
                  onClick={() => handleSelectTab(index)}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                >
                  {/* Active tab auto-advance progress line */}
                  {isActive && isPlaying && !isHovered && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '2px',
                        background: 'var(--accent)',
                        width: `${progress}%`,
                        transition: 'width 0.05s linear',
                      }}
                    />
                  )}

                  <div className="tab-row-header">
                    <span className="tab-number">{item.num}</span>
                    <span className="tab-title">{item.title}</span>
                    <span className="tab-icon-wrap">
                      <Icon size={18} />
                    </span>
                  </div>

                  {/* Expanded Content revealed on hover / active tab */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="tab-expanded-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <p className="tab-desc">{item.shortDesc}</p>

                        <div className="tab-bullet-list">
                          {item.features.map((feat, fIdx) => (
                            <div key={fIdx} className="tab-bullet-item">
                              <CheckCircle2 size={14} className="bullet-check" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        <div className="tab-action-row">
                          <button
                            type="button"
                            className="tab-detail-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalService(item);
                            }}
                          >
                            <span>Technical Specifications</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Seamless Tab Connector arrow matching frame color */}
                  {isActive && <div className="tab-frame-connector" />}
                </div>
              );
            })}
          </div>

          {/* Right Column: Framed Picture with Crossfade on Hover (#c-hover-tabs frame) */}
          <div className="hover-tabs-frame">
            <div className="frame-inner">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.id}
                  className="frame-image-layer"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <img
                    src={currentService.image}
                    alt={currentService.title}
                    className="frame-image"
                    width="600"
                    height="500"
                  />
                  {/* <div className="frame-overlay" /> */}
                </motion.div>
              </AnimatePresence>

              <div className="frame-caption-footer">
                <h3 className="frame-caption-title">{currentService.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Previous / Play-Pause / Next Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '6px' }}>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="tab-detail-btn"
                      style={{ padding: '6px 8px', borderRadius: '4px' }}
                      aria-label="Previous service"
                      title="Previous service"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      className="tab-detail-btn"
                      style={{ padding: '6px 8px', borderRadius: '4px' }}
                      aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="tab-detail-btn"
                      style={{ padding: '6px 8px', borderRadius: '4px' }}
                      aria-label="Next service"
                      title="Next service"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Scrolltide Liquid Glass Button */}
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setModalService(currentService)}
                  >
                    <span>View Details</span>
                    <span className="btn-icon-capsule">
                      <ArrowRight size={13} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {modalService && (
          <div
            className="service-modal-backdrop"
            onClick={() => setModalService(null)}
          >
            <motion.div
              className="service-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="service-modal-close"
                onClick={() => setModalService(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {modalService.category}
                </span>
                <h3 style={{ fontSize: '24px', margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                  {modalService.title}
                </h3>
              </div>

              <div style={{ height: '200px', overflow: 'hidden', marginBottom: '20px', border: '1px solid var(--surface-border)' }}>
                <img
                  src={modalService.image}
                  alt={modalService.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '20px' }}>
                {modalService.fullDesc}
              </p>

              <h4 style={{ fontSize: '15px', marginBottom: '10px', color: 'var(--text-primary)' }}>
                Key Technical Deliverables:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {modalService.keyDeliverables.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={15} color="var(--accent)" />
                    {item}
                  </li>
                ))}
              </ul>

              <h4 style={{ fontSize: '15px', marginBottom: '10px', color: 'var(--text-primary)' }}>
                Application Areas:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {modalService.applications.map((app, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'var(--ground-subtle)',
                      border: '1px solid var(--surface-border)',
                      padding: '4px 12px',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}
                  >
                    {app}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--surface-border)', paddingTop: '16px' }}>
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => setModalService(null)}
                >
                  Close
                </button>
                {/* Scrolltide Liquid Glass Button */}
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleInquire(modalService.title)}
                >
                  <span>Request Inquiry</span>
                  <span className="btn-icon-capsule">
                    <Send size={13} />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
