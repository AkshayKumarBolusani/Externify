import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';
import siteData from './config/data.json';
import SkeletonLoader from './components/SkeletonLoader';

// Icon Components
const TargetIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="url(#gradient)" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" stroke="url(#gradient)" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" fill="url(#gradient)"/>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const GraduationIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="url(#gradient2)"/>
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);


const RocketIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.81 14.12L5.64 11.29L8.17 10.79C11.39 6.41 17.55 4.22 19.78 4.22C19.78 6.45 17.59 12.61 13.21 15.83L12.71 18.36L9.88 21.19C9.33 21.74 8.24 21.74 7.69 21.19L2.81 16.31C2.26 15.76 2.26 14.67 2.81 14.12Z" fill="url(#gradient6)"/>
    <defs>
      <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

// Roadmap Step Icons
const ListingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5H7C5.9 5 5 5.9 5 7V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V7C19 5.9 18.1 5 17 5H15M9 5C9 4.45 9.45 4 10 4H14C14.55 4 15 4.45 15 5M9 5H15M9 11H15M9 17H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ApplyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 13L11 15L15 11M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21V6.5C21 7.5 20 8.5 19 9.5L14 14V21L10 19V14C9 13.5 8 12.5 8 11.5V6.5C8 5.5 7 4.5 6 3.5H3C2.45 4 3 6 3 6Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CompanyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21V5H3M5 9H7V14H5M10 9H12V14H10M15 9H17V14H15M5 5V3H19V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// About Section Icons - Modern Gradient Badges
const IndustryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 18L12 5L19 18M12 9V14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StudentsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 12C17.66 12 19 10.66 19 9C19 7.34 17.66 6 16 6C14.34 6 13 7.34 13 9C13 10.66 14.34 12 16 12M8 12C9.66 12 11 10.66 11 9C11 7.34 9.66 6 8 6C6.34 6 5 7.34 5 9C5 10.66 6.34 12 8 12M16 14C14 14 10 14.9 10 16.5V19H22V16.5C22 14.9 18 14 16 14M8 14C6 14 2 14.9 2 16.5V19H14V16.5C14 14.9 10 14 8 14Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BeginnerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FlexibilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 9C5.66 9 7 7.66 7 6C7 4.34 5.66 3 4 3C2.34 3 1 4.34 1 6C1 7.66 2.34 9 4 9M20 9C21.66 9 23 7.66 23 6C23 4.34 21.66 3 20 3C18.34 3 17 4.34 17 6C17 7.66 18.34 9 20 9M12 5C13.66 5 15 3.66 15 2C15 0.34 13.66 0 12 0C10.34 0 9 0.34 9 2C9 3.66 10.34 5 12 5M12 22C9 22 5 19 5 15V12H19V15C19 19 15 22 12 22Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExposureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DurationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Social Media Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.05-8.806 0-9.714h3.554v1.377c.43-.664 1.199-1.61 2.920-1.61 2.135 0 3.735 1.395 3.735 4.393l-.001 5.554zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.952.768-1.71 1.959-1.71 1.19 0 1.916.759 1.932 1.71 0 .951-.743 1.71-1.976 1.71zm1.946 11.596h-3.554V9.738h3.554v10.713zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_vrtsg3n';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_xzumc49';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'OV-5cACEMR6SyraY0';

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((result) => {
        setIsSending(false);
        setFormData({ name: '', email: '', message: '' });
        alert('Thank you for your interest! We will get back to you soon.');
      }, (error) => {
        setIsSending(false);
        console.error('EmailJS error:', error);
        alert('Sorry — something went wrong sending your message. Please try again later.');
      });
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <img src="/favicon.svg" alt="Externify" className="site-logo" />
            <span className="logo-text">Externify</span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#solution">Solution</a>
            <a href="#value">Value</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-buttons">
            <a href="#contact" className="btn-primary">Let's Connect</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">{siteData.hero.badge}</div>
            <h1 className="hero-title">
              {siteData.hero.title}
              <span className="gradient-text"> {siteData.hero.subtitle}</span>
            </h1>
            <p className="hero-description">
              {siteData.hero.description}
            </p>
            <div className="hero-buttons">
              <a href="#about" className="btn-primary btn-large">{siteData.hero.primaryButton}</a>
              <a href="#contact" className="btn-outline btn-large">{siteData.hero.secondaryButton}</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-container">
              <div className="hero-card-main">
                <div className="hero-card-content">
                  <div className="hero-card-icon">
                    <GraduationIcon />
                  </div>
                  <h3>Short Externships</h3>
                  <p>Beginner-friendly experiences</p>
                </div>
                <div className="hero-card-glow"></div>
              </div>
              <div className="hero-card-secondary">
                <div className="hero-card-content">
                  <div className="hero-card-icon">
                    <RocketIcon />
                  </div>
                  <h3>Real Exposure</h3>
                  <p>Learn by observing</p>
                </div>
              </div>
              <div className="hero-card-tertiary">
                <div className="hero-card-content">
                  <div className="hero-card-icon">
                    <TargetIcon />
                  </div>
                  <h3>Flexible</h3>
                  <p>Low commitment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Externify Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{siteData.about.badge}</span>
            <h2 className="section-title">{siteData.about.title}</h2>
            <p className="section-description">{siteData.about.description}</p>
          </div>
          <div className="about-grid">
            {siteData.about.features.map((feature, index) => {
              const icons = [IndustryIcon, StudentsIcon, BeginnerIcon, FlexibilityIcon, ExposureIcon, DurationIcon];
              const gradients = ['linear-gradient(135deg, #ff6b6b 0%, #ff8e72 100%)', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'];
              const IconComponent = icons[index];
              return (
                <div key={index} className="about-card">
                  <div className="about-icon" style={{ background: gradients[index] }}>
                    <IconComponent />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{siteData.problems.badge}</span>
            <h2 className="section-title">{siteData.problems.title}</h2>
            <p className="section-description">{siteData.problems.description}</p>
          </div>
          <div className="problem-grid">
            {siteData.problems.items.map((item, index) => (
              <div key={index} className="problem-card">
                <div className="problem-number">{String(index + 1).padStart(2, '0')}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="solution-section">
        <div className="container">
          <div className="solution-content">
            <div className="solution-text">
              <span className="section-badge">{siteData.solution.badge}</span>
              <h2 className="section-title">{siteData.solution.title}</h2>
              <p className="section-description">{siteData.solution.description}</p>
              <div className="solution-features">
                {siteData.solution.features.map((feature, index) => (
                  <div key={index} className="solution-feature">
                    <div className="feature-number-wrapper">
                      <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
                    </div>
                    <div>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="solution-visual">
              <div className="solution-card">
                <div className="solution-card-header">
                  <div className="card-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="solution-card-content">
                  {siteData.solution.highlights.map((highlight, index) => (
                    <div key={index} className="card-item">
                      <div className="card-item-icon">✓</div>
                      <div className="card-item-text">{highlight}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="roadmap-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{siteData.roadmap.badge}</span>
            <h2 className="section-title">{siteData.roadmap.title}</h2>
            <p className="section-description">{siteData.roadmap.description}</p>
          </div>
          <div className="roadmap-timeline">
            <div className="roadmap-connector"></div>
            {siteData.roadmap.steps.map((step, index) => {
              const icons = [ListingIcon, ApplyIcon, FilterIcon, CompanyIcon];
              const IconComponent = icons[index];
              return (
                <div key={index} className={`roadmap-card roadmap-card-${index + 1}`}>
                  <div className="roadmap-card-dot"></div>
                  <div className="roadmap-card-content">
                    <div className="roadmap-card-icon">
                      <IconComponent />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Users Section */}
      <section className="target-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Who We Serve</span>
            <h2 className="section-title">Our Target Users</h2>
          </div>
          <div className="target-grid">
            {siteData.targetUsers.users.map((user, index) => (
              <div key={index} className={`target-card target-card-${index % 5}`}>
                <h3>{user.title}</h3>
                <p>{user.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="value" className="value-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Value Proposition</span>
            <h2 className="section-title">Benefits for Everyone</h2>
          </div>
          <div className="value-cards">
            <div className="value-card student-card">
              <div className="value-card-header">
                <h3>{siteData.value.students.title}</h3>
              </div>
              <ul className="value-list">
                {siteData.value.students.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="value-card company-card">
              <div className="value-card-header">
                <h3>{siteData.value.companies.title}</h3>
              </div>
              <ul className="value-list">
                {siteData.value.companies.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">{siteData.contact.badge}</span>
            <h2 className="section-title">{siteData.contact.title}</h2>
            <p className="section-description">{siteData.contact.description}</p>
          </div>
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us about your interest in Externify..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary btn-large" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">{siteData.cta.title}</h2>
            <p className="cta-description">{siteData.cta.description}</p>
            <div className="cta-buttons">
              <a href="#contact" className="btn-primary btn-large">{siteData.cta.primaryButton}</a>
              <a href="#about" className="btn-outline btn-large">{siteData.cta.secondaryButton}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <img src="/favicon.svg" alt="Externify" className="site-logo" />
                <span className="logo-text">Externify</span>
              </div>
              <p>{siteData.footer.description}</p>
              <div className="social-links">
                <a href="https://www.instagram.com/externify_official/" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-link">
                  <InstagramIcon />
                </a>
                <a href="https://www.linkedin.com/company/externify/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Platform</h4>
                {siteData.footer.links.platform.map((link, index) => (
                  <a key={index} href={link.href}>{link.text}</a>
                ))}
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                {siteData.footer.links.connect.map((link, index) => (
                  <a key={index} href={link.href}>{link.text}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Externify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
