import React from 'react';
import './NewRelease.css';
import newrelease_book_img from '../../assets/newrelease_book_img.svg';
const NewRelease = () => {
  const books = [
    {
      id: 1,
      title: "The Whys Book Of Time",
      subtitle: "Serie: the books of whys with tick the owl",
      price: "18.99$",
      image: newrelease_book_img
    },
    {
      id: 2,
      title: "The Whys Book Of Time",
      subtitle: "Serie: the books of whys with tick the owl",
      price: "18.99$",
      image: newrelease_book_img
    },
    {
      id: 3,
      title: "The Whys Book Of Time",
      subtitle: "Serie: the books of whys with tick the owl",
      price: "18.99$",
      image: newrelease_book_img
    }
  ];

  return (
    <section className="new-release-container">
      {/* Header Badge */}
      <div className="new-release-header">
        {/* <span className="diamond-icon"><img src="../assets/newrelease_logo.svg" alt="" /></span> */}
        <h2>New Release</h2>
        <h3>Fresh off the press and ready for the next big question</h3>
      </div>

      {/* Grid Layout */}
      <div className="books-grid">
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`book-card ${index === 2 ? 'centered-card' : ''}`}
          >
            <div className="image-card-box">
              <img src={book.image} alt={book.title} className="book-image" />
            </div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-subtitle">{book.subtitle}</p>
            <span className="book-price">{book.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewRelease;