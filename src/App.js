import React, { useState, useEffect } from 'react';
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

const SparkleIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="url(#gradient3)"/>
    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const LightningIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="url(#gradient4)"/>
    <defs>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const EyeIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z" fill="url(#gradient5)"/>
    <defs>
      <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
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

const BlockIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="url(#gradient7)"/>
    <defs>
      <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const LocationIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="url(#gradient8)"/>
    <defs>
      <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const LightbulbIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM14 13.7L13 14.5V16H11V14.5L10 13.7C8.84 12.81 8 11.48 8 9.97C8 7.24 10.24 5 13 5C15.76 5 18 7.24 18 9.97C18 11.48 17.16 12.81 16 13.7ZM12 6C10.9 6 10 6.9 10 8H14C14 6.9 13.1 6 12 6Z" fill="url(#gradient9)"/>
    <defs>
      <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const ClockIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 13H11V7H13V13Z" fill="url(#gradient10)"/>
    <defs>
      <linearGradient id="gradient10" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const ObserveIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="url(#gradient11)"/>
    <defs>
      <linearGradient id="gradient11" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const HandshakeIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5V11.24C14.61 11.09 15.23 11 15.86 11C16.41 11 16.96 11.05 17.5 11.14V7.5C17.5 4.46 15.04 2 12 2S6.5 4.46 6.5 7.5V11.14C7.04 11.05 7.59 11 8.14 11C8.77 11 9.39 11.09 10 11.24M20.5 12C20.5 13.93 19.17 15.58 17.29 16.28L18.78 19.05L17.22 19.95L15.71 17.18C15.14 17.39 14.58 17.5 14 17.5C13.42 17.5 12.86 17.39 12.29 17.18L10.78 19.95L9.22 19.05L10.71 16.28C8.83 15.58 7.5 13.93 7.5 12V11H9.5V12C9.5 13.38 10.62 14.5 12 14.5S14.5 13.38 14.5 12V11H20.5V12Z" fill="url(#gradient12)"/>
    <defs>
      <linearGradient id="gradient12" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const DocumentIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2M18 20H6V4H13V9H18V20Z" fill="url(#gradient13)"/>
    <defs>
      <linearGradient id="gradient13" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const BuildingIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7V3H2V21H22V7H12M6 19H4V17H6V19M6 15H4V13H6V15M6 11H4V9H6V11M6 7H4V5H6V7M10 19H8V17H10V19M10 15H8V13H10V15M10 11H8V9H10V11M10 7H8V5H10V7M20 19H12V17H14V15H12V13H14V11H12V9H14V7H12V5H20V19Z" fill="url(#gradient14)"/>
    <defs>
      <linearGradient id="gradient14" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const StudentIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="url(#gradient15)"/>
    <defs>
      <linearGradient id="gradient15" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const SchoolIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18ZM12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill="url(#gradient16)"/>
    <defs>
      <linearGradient id="gradient16" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2H14C15.1 2 16 2.9 16 4V6H20C21.1 6 22 6.9 22 8V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V8C2 6.9 2.9 6 4 6H8V4C8 2.9 8.9 2 10 2ZM14 6V4H10V6H14ZM4 8V19H20V8H4Z" fill="url(#gradient17)"/>
    <defs>
      <linearGradient id="gradient17" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    // EmailJS integration will be added later
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
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
            {siteData.about.features.map((feature, index) => (
              <div key={index} className="about-card">
                <div className="about-accent"></div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
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
              <button type="submit" className="btn-primary btn-large">Send Message</button>
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
              <button className="btn-primary btn-large">{siteData.cta.primaryButton}</button>
              <button className="btn-outline btn-large">{siteData.cta.secondaryButton}</button>
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
                <span className="logo-text">Externify</span>
              </div>
              <p>{siteData.footer.description}</p>
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
            <p>&copy; 2024 Externify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
