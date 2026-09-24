import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
  {
    id: 1,
    question: "Q. Are Plant Therapy's Essential Oils Therapeutic Grade?",
    answer: "We do not recommend the general internal use of essential oils. Essential oils are highly concentrated and have the capacity to cause serious damage if used internally without the necessary expertise required in administering them. We do have customers who choose to use our oils internally."
  },
  {
    id: 2,
    question: "Q. Are Plant Therapy's Essential Oils Therapeutic Grade?",
    answer: "We do not recommend the general internal use of essential oils. Essential oils are highly concentrated and have the capacity to cause serious damage if used internally without the necessary expertise required in administering them. We do have customers who choose to use our oils internally."
  },
  {
    id: 3,
    question: "Q. Are Plant Therapy's Essential Oils Therapeutic Grade?",
    answer: "We do not recommend the general internal use of essential oils. Essential oils are highly concentrated and have the capacity to cause serious damage if used internally without the necessary expertise required in administering them. We do have customers who choose to use our oils internally."
  },
  {
    id: 4,
    question: "Q. Are Plant Therapy's Essential Oils Therapeutic Grade?",
    answer: "We do not recommend the general internal use of essential oils. Essential oils are highly concentrated and have the capacity to cause serious damage if used internally without the necessary expertise required in administering them. We do have customers who choose to use our oils internally."
  },
  {
    id: 5,
    question: "Q. Are Plant Therapy's Essential Oils Therapeutic Grade?",
    answer: "We do not recommend the general internal use of essential oils. Essential oils are highly concentrated and have the capacity to cause serious damage if used internally without the necessary expertise required in administering them. We do have customers who choose to use our oils internally."
  },
  {
    id: 6,
    question: "Q. Are Plant Therapy's Essential Oils Therapeutic Grade?",
    answer: "We do not recommend the general internal use of essential oils. Essential oils are highly concentrated and have the capacity to cause serious damage if used internally without the necessary expertise required in administering them. We do have customers who choose to use our oils internally."
  }
];

const Faq = () => {
  // Set item 4 open by default to match screenshot
  const [openId, setOpenId] = useState(4);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="faq-container">
      {/* Title */}
      <div className="faq-header">
        {/* <span className="diamond-icon"><img src="../assets/newrelease_logo.svg" alt="" /></span> */}
        <h2>FAQ</h2>
      </div>

      {/* Accordion List */}
      <div className="faq-list">
        {faqData.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`faq-item ${isOpen ? 'active' : ''}`}
            >
              <div
                className="faq-question-box"
                onClick={() => toggleFaq(item.id)}
              >
                <h3 className="faq-question">{item.question}</h3>
                <span className="faq-arrow">{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <div className="faq-answer-box">
                  <p className="faq-answer">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;