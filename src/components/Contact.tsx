import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'demo-notice'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a contact phone number.';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service of interest.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide project details (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate client-side validation & dispatch delay
    setTimeout(() => {
      setIsSubmitting(false);
      // As requested: Ready for future backend/API integration,
      // explicit feedback indicating client-side validation passed.
      setSubmitStatus('demo-notice');
    }, 700);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            <span>CONTACT US</span>
          </div>
          <h2 className="section-title">
            Let's Build a Sustainable Future Together.
          </h2>
          <p className="section-description">
            Have a project in mind? Connect with our team to explore reliable
            engineering and energy solutions.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Contact Form */}
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ fontSize: '1.45rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Project Inquiry Form
            </h3>

            {submitStatus === 'demo-notice' && (
              <div className="form-feedback success" role="alert">
                <CheckCircle size={22} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Inquiry Validated Successfully!</strong>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>
                    Form data is validated and ready for dispatch. (Note: Backend API endpoint is not yet connected; configure your API route or email service in production.)
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullName && (
                    <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && (
                    <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="companyName" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="form-input"
                    placeholder="e.g. Acme Industrial Ltd"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service-select" className="form-label">
                  Service Interested In *
                </label>
                <select
                  id="service-select"
                  name="service"
                  className="form-select"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Please Select a Service --</option>
                  <option value="Solar Energy Solutions">Solar Energy Solutions</option>
                  <option value="Battery Energy Storage Systems (BESS)">
                    Battery Energy Storage Systems (BESS)
                  </option>
                  <option value="Wind Power Solutions">Wind Power Solutions</option>
                  <option value="HT & EHT Electrical Solutions">
                    HT &amp; EHT Electrical Solutions
                  </option>
                  <option value="Pumps & Motors">Pumps &amp; Motors</option>
                  <option value="General Electromechanical Consultation">
                    General Electromechanical Consultation
                  </option>
                </select>
                {errors.service && (
                  <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {errors.service}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Project Message / Scope *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Outline your project requirements, location, estimated capacity, or timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
                {errors.message && (
                  <span style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px 28px' }}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Validating...' : 'Submit Inquiry'}</span>
                <span className="btn-icon-capsule">
                  <Send size={15} />
                </span>
              </button>
            </form>
          </motion.div>

          {/* Right Column: Contact Information Placeholders & Maps */}
          <div className="contact-info-panel">
            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="contact-detail-title">Email Us</h4>
                <p className="contact-detail-text">
                  General inquiries: <strong>info@agsar.engineering</strong> (Placeholder)
                </p>
                <p className="contact-detail-text" style={{ fontSize: '0.825rem', color: '#7E97A9' }}>
                  Project proposals: projects@agsar.engineering
                </p>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="contact-detail-title">Call Us</h4>
                <p className="contact-detail-text">
                  Direct Line: <strong>+91 (0) 123 456 7890</strong> (Placeholder)
                </p>
                <p className="contact-detail-text" style={{ fontSize: '0.825rem', color: '#7E97A9' }}>
                  Mon - Sat: 9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>

            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="contact-detail-title">Corporate Office</h4>
                <p className="contact-detail-text">
                  <strong>AGSAR ELECTROMECHANICAL ENGINEERING LLP</strong>
                </p>
                <p className="contact-detail-text">
                  Industrial Area, Phase II, Technology Corridor (Placeholder)
                </p>
              </div>
            </div>

            {/* Google Maps Location Placeholder Embed */}
            <div className="map-card">
              <div className="map-placeholder">
                <MapPin size={34} color="var(--color-corporate-blue)" />
                <strong style={{ fontSize: '1rem' }}>Interactive Map Location</strong>
                <span style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                  Google Maps coordinate placeholder for AGSAR ELECTROMECHANICAL ENGINEERING LLP
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark btn-sm"
                  style={{ marginTop: '0.4rem', fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
