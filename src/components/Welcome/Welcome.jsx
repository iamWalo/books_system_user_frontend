import React from 'react';
import './Welcome.css';
import welcome_img from "../../assets/welcome_img.svg"
const Welcome = () => {
  return (
    <section className="welcome-container">
      <div className="welcome-image-wrapper">
        <img src={welcome_img} alt="" />
      </div>

      <div className="welcome-card">
        <div className="welcome-badge">
          <h2 className="welcome-title">
            Hello Explorer! Welcome to the Wise Forest
          </h2>
        </div>

        <h3 className="welcome-description">
          Deep in the Wise Forest, every children's question that's ever gone
          unanswered takes root as a tree. Tick, our curious owl guide, has spent
          his whole life wandering those trees, collecting the whys kids ask their
          parents and hunting down real answers.

          WhyQuest Publishing is what he found along the way.
          Every book on this shelf started as somebody's honest question. Yours
          might be next.
        </h3>

        <a href="#full-story" className="welcome-link">
          <h3>
            Full Story of Tick The Owl <span className="arrow">&rarr;</span>
          </h3>
        </a>
      </div>
    </section>
  );
};

export default Welcome;