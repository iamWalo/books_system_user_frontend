import React from 'react';
import './Footer.css';
import footer_logo from '../../assets/footer-logo.svg';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Branding & Contact Section */}
        <div className="footer-brand-section">
          <div className="footer-brand-top">
            <div className="footer-logo-wrapper">
              <img
                src={footer_logo}
                alt="WhyQuest Publishing"
                className="footer-logo-img"
              />
            </div>
            <div className="footer-tagline">
              <p>Curios Minds<br />Start Here!</p>
            </div>
          </div>

          {/* البريد الإلكتروني وأيقونات التواصل الاجتماعي */}
          <div className="footer-contact-row">
            <a href="mailto:hello@whyquestpublishing.com" className="footer-email">
              hello@whyquestpublishing.com
            </a>
            <div className="footer-social-icons">
              <a href="#youtube" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
              <a href="#instagram" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4 className="footer-heading">Explore</h4>
            <ul>
              <li><a href="#our-story">Our Story</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#books">Books</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">For You</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#newsletter">News Letter</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Shop</h4>
            <ul>
              <li><a href="#amazon">Amazon</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="footer-copyright">
        <p>© 2026 WHYQUEST PUBLISHING — ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
};

export default Footer;