import React from 'react';
import './SkeletonLoader.css';

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line skeleton-title"></div>
    <div className="skeleton-line skeleton-text"></div>
    <div className="skeleton-line skeleton-text short"></div>
  </div>
);

export const SkeletonHero = () => (
  <div className="skeleton-hero">
    <div className="skeleton-badge"></div>
    <div className="skeleton-line skeleton-hero-title"></div>
    <div className="skeleton-line skeleton-hero-text"></div>
    <div className="skeleton-line skeleton-hero-text short"></div>
    <div className="skeleton-buttons">
      <div className="skeleton-button"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export const SkeletonSection = () => (
  <div className="skeleton-section">
    <div className="skeleton-badge"></div>
    <div className="skeleton-line skeleton-section-title"></div>
    <div className="skeleton-line skeleton-section-text"></div>
    <div className="skeleton-grid">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

export default function SkeletonLoader() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-navbar"></div>
      <SkeletonHero />
      <SkeletonSection />
      <SkeletonSection />
    </div>
  );
}

