import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'about', 'services', 'expertise', 'why-choose-us', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    // { name: 'Expertise', href: '#expertise', id: 'expertise' },
    { name: 'Why AGSAR', href: '#why-choose-us', id: 'why-choose-us' },
    // { name: 'Contact', href: '#footer', id: 'footer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#hero" className="nav-brand" onClick={(e) => handleNavClick(e, '#hero')}>
          <img
            src={isScrolled ? '/logo-dark.svg' : '/logo.svg'}
            alt="AGSAR ELECTROMECHANICAL ENGINEERING LLP"
            className="nav-brand-logo"
            width="200"
            height="48"
          />
        </a>

        {/* Desktop Menu */}
        <nav aria-label="Main Navigation">
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="nav-cta">
          <a
            href="#footer"
            className="btn btn-primary btn-sm"
            onClick={(e) => handleNavClick(e, '#footer')}
          >
            <span>Get In Touch</span>
            <span className="btn-icon-capsule">
              <ArrowUpRight size={14} />
            </span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div>
          <div style={{ marginBottom: '2.5rem' }}>
            <img
              src="/logo-dark.svg"
              alt="AGSAR Logo"
              style={{ height: '42px', width: 'auto' }}
            />
          </div>

          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ borderTop: '1px solid rgba(8, 121, 185, 0.25)', paddingTop: '1.5rem' }}>
          <a
            href="#footer"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={(e) => handleNavClick(e, '#footer')}
          >
            <span>Get In Touch</span>
            <ArrowUpRight size={18} />
          </a>
          <p style={{ fontSize: '0.825rem', color: '#536B82', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={14} color="#D92534" /> info@agsar.engineering
          </p>
        </div>
      </div>
    </header>
  );
};

