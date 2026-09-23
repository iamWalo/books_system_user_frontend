import React from 'react';
import "./BestSelling.css"
import bestselling from "../../assets/bestselling_img.svg"


const books = [
  {
    id: 1,
    title: "100,000 Whys for Curious Kids",
    subtitle: "Encyclopedia full Illustrated",
    image: bestselling
  },
  {
    id: 2,
    title: "The Whys Book of Time",
    subtitle: "Encyclopedia full Illustrated",
    image: bestselling
  },
  {
    id: 3,
    title: "The Whys Book of Sleep and Dreams",
    subtitle: "Encyclopedia full Illustrated",
    image: bestselling
  }
];

const BestSelling = () => {
  return (
    <section className="bestselling-container">
      {/* Header */}
      <div className="bestselling-header">
        {/* <span className="diamond-icon">❖</span> */}
        <h2>Best Selling</h2>
        <h3>The titles curious readers keep coming back to</h3>
      </div>

      {/* Stacked Cards (1 per row) */}
      <div className="bestselling-list">
        {books.map((book) => (
          <div key={book.id} className="bestselling-card">
            {/* Image Container */}
            <div className="bestselling-image-wrapper">
              <img
                src={book.image}
                alt={book.title}
                className="bestselling-image"
              />
            </div>
            {/* Typography */}
            <h3 className="bestselling-title">{book.title}</h3>
            <p className="bestselling-subtitle">{book.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSelling;