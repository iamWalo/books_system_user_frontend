import React from 'react';
import './CategoriePage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import home_icon from '../../assets/categories_home_icon.svg'
import question_mark_icon from '../../assets/categories_page_btn_questionmark_icon.svg'
import Centure from '../../components/Centure/Centure';


const booksData = [
  { id: 1, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: '../../assets/bestselling_img.svg' },
  { id: 2, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: '../../assets/bestselling_img.svg' },
  { id: 3, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: '../../assets/bestselling_img.svg' },
  { id: 4, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: '../../assets/bestselling_img.svg' },
];

const CategoriePage = () => {
  return (
    <div className="category-page-container">
      {/* Top Announcement Bar */}
      <Centure />

      {/* Navigation Header */}
      <Header />

      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <span>🏠 Home</span> / <span>Categories</span> / <span>Children's Books</span>
      </nav>


      {/* Hero Category Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h2>THE NATURAL WORLD</h2>
          <h4>Nature, earth & animals</h4>
        </div>
        <div className="sort-dropdown">
          <span>Sorted By</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>

      {/* Main Books Grid (2 Columns) */}
      <main className="books-grid">
        {booksData.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-image-wrapper">
              <img src={book.img} alt={book.title} className="book-image" />
            </div>
            <h3>{book.title}</h3>
            <h4>{book.subtitle}</h4>
            <h3 className="book-price">{book.price}</h3>
          </div>
        ))}
      </main>

      {/* Action CTA Buttons */}
      <div className="cta-buttons-container">
        <button className="cta-btn secondary-btn">
          <img src={question_mark_icon} alt="" />
          <span>Explore another Category</span>
        </button>
        <button className="cta-btn primary-btn">
          <img src={home_icon} alt="" />
          <span>Home Page</span>
        </button>
      </div>

      {/* "From Other Categories" Section */}
      <section className="other-categories-section">
        <h2>From Other Categories</h2>
        <div className="books-grid">
          {booksData.slice(0, 2).map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image-wrapper">
                <img src={book.img} alt={book.title} className="book-image" />
              </div>
              <h3>{book.title}</h3>
              <h4>{book.subtitle}</h4>
              <h3 className="book-price">{book.price}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default CategoriePage;