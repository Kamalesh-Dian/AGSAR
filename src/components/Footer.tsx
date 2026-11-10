import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  Send,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer id="footer" className="footer-scrolltide footer-centered">
      <div className="container footer-content-centered">
        {/* Centered Corporate Brand Header */}
        <div className="footer-brand-header">
          <div className="footer-brand-name">AGSAR</div>
          <div className="footer-brand-tagline">ELECTROMECHANICAL ENGINEERING LLP</div>
          <p className="footer-brand-desc">
            Powering Progress. Engineering Tomorrow. Delivering world-class electromechanical
            engineering and renewable energy solutions across utility and industrial sectors.
          </p>
        </div>

        {/* Structured Navigation Columns */}
        <div className="footer-nav-columns footer-nav-centered">
          {/* Column 1: Solutions */}
          <div className="footer-nav-col">
            <span className="col-heading">Solutions</span>
            <ul className="col-list">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "#services")}
                >
                  Solar Power Systems
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "#services")}
                >
                  Battery Storage (BESS)
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "#services")}
                >
                  Wind Power Evacuation
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "#services")}
                >
                  HT / EHT Substations
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, "#services")}
                >
                  Pumps &amp; Heavy Motors
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Lifecycle */}
          <div className="footer-nav-col">
            <span className="col-heading">Lifecycle</span>
            <ul className="col-list">
              <li>
                <a
                  href="#expertise"
                  onClick={(e) => handleNavClick(e, "#expertise")}
                >
                  Engineering &amp; Audit
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  onClick={(e) => handleNavClick(e, "#expertise")}
                >
                  System Design &amp; SLD
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  onClick={(e) => handleNavClick(e, "#expertise")}
                >
                  Equipment Procurement
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  onClick={(e) => handleNavClick(e, "#expertise")}
                >
                  Commissioning &amp; Grid
                </a>
              </li>
              <li>
                <a
                  href="#expertise"
                  onClick={(e) => handleNavClick(e, "#expertise")}
                >
                  Preventive O&amp;M
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div className="footer-nav-col">
            <span className="col-heading">Company</span>
            <ul className="col-list">
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#why-choose-us"
                  onClick={(e) => handleNavClick(e, "#why-choose-us")}
                >
                  Why Partner
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                >
                  Project Contact
                </a>
              </li>
              <li>
                <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")}>
                  Health &amp; Safety
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Direct Dispatch & Newsletter Box */}
        <div className="footer-dispatch-card footer-dispatch-centered">
          <span className="dispatch-title">Direct Engineering Dispatch</span>
          <p className="dispatch-desc">
            Submit your corporate email address for immediate engineering
            capability statements and project schedules.
          </p>

          {subscribed ? (
            <div className="dispatch-success">
              <CheckCircle2 size={16} color="var(--accent)" />
              <span>
                Inquiry channel initialized. Our technical desk will reach
                out.
              </span>
            </div>
          ) : (
            <form onSubmit={handleQuickInquiry} className="dispatch-form">
              <input
                type="email"
                className="dispatch-input"
                placeholder="corporate.email@company.com"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <span>Dispatch</span>
                <span className="btn-icon-capsule">
                  <Send size={12} />
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Office Coordinates & Social Line */}
        <div className="footer-coordinates footer-coordinates-centered">
          <div className="coord-grid-centered">
            <div className="coord-item">
              <MapPin size={16} className="coord-icon" />
              <span>
                AGSAR ELECTROMECHANICAL ENGINEERING LLP, Industrial Corridor
              </span>
            </div>
            <div className="coord-item">
              <Phone size={16} className="coord-icon" />
              <span>+91 (0) 123 456 7890</span>
            </div>
            <div className="coord-item">
              <Mail size={16} className="coord-icon" />
              <span>info@agsar.engineering</span>
            </div>
          </div>

          <div className="footer-social-row">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="Twitter"
            >
              <Twitter size={15} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="YouTube"
            >
              <Youtube size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Strip */}
      <div className="footer-bottom-strip">
        <div className="container strip-flex strip-flex-centered">
          <div>
            &copy; {new Date().getFullYear()} AGSAR ELECTROMECHANICAL
            ENGINEERING LLP. All rights reserved.
          </div>
          <div className="strip-links">
            <a href="#hero">Privacy Policy</a>
            <span>/</span>
            <a href="#hero">Terms of Engagement</a>
            <span>/</span>
            <a href="#hero">HSE Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
