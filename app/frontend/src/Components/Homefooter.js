import React from 'react';
import './Homefooter.css';

const HomeFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">RelaxYourMind © {new Date().getFullYear()} — All rights reserved.</p>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
