import React, { useState } from 'react';
import './Subscribe.css';
import subscribe_owl from '../../assets/subscribe_img.svg';
const Subscribe = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <section className="subscribe-container">
      {/* Reserved image wrapper for owl */}
      <div className="subscribe-owl-wrapper">
        <img
          src={subscribe_owl}
          alt="Tick The Owl Winking"
          className="subscribe-owl-img"
        />
      </div>

      {/* Main Yellow Card Box */}
      <div className="subscribe-card">
        <h2 className="subscribe-title">Subscribe for updates</h2>
        <h3 className="subscribe-description">
          New cases, new volumes, just Tick sending word when the next file opens.
        </h3>

        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="subscribe-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Mail"
            value={formData.email}
            onChange={handleChange}
            className="subscribe-input"
            required
          />
          <button type="submit" className="subscribe-btn">
            <h4>Send Word To Tick</h4>
          </button>
        </form>

        <span className="subscribe-disclaimer">
          *We'll only write when there's real news -promise-
        </span>
      </div>
    </section>
  );
};

export default Subscribe;