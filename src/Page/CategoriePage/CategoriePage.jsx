import { Link } from 'react-router-dom';
import './CategoriePage.css';
import { mediaUrl } from '../../api.js';
import home_icon from '../../assets/categories_home_icon.svg'
import question_mark_icon from '../../assets/categories_page_btn_questionmark_icon.svg'
import productImg from '../../assets/newrelease_book_img.svg'
const booksData = [
  { id: 1, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: { productImg } },
  { id: 2, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: { productImg } },
  { id: 3, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: { productImg } },
  { id: 4, title: 'The Whys Book Of Time', subtitle: 'Serie: the books of whys with tick the owl', price: '18.99$', img: { productImg } },
];

const CategoriePage = ({ categories = [] }) => {
  const apiCategory = categories[0];
  const booksToDisplay = apiCategory?.books?.length ? apiCategory.books.map((book) => ({
    id: book._id,
    title: book.name,
    subtitle: '',
    price: `${book.price}$`,
    image: mediaUrl(book.image)
  })) : booksData;

  return (
    <div className="category-page-container">
      {/* Hero Category Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h2>{apiCategory?.name || 'THE NATURAL WORLD'}</h2>
          <h4>{apiCategory?.description || 'Nature, earth & animals'}</h4>
        </div>
        <div className="sort-dropdown">
          <span>Sorted By</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>

      {/* Main Books Grid (2 Columns) */}
      <main className="books-grid">
        {booksToDisplay.map((book) => (
          <Link to={`/product?id=${book.id}`} key={book.id} className="book-card">
            <div className="book-image-wrapper">
              <img src={book.image || productImg} alt={book.title} className="book-image" />
            </div>
            <h3>{book.title}</h3>
            <h4>{book.subtitle}</h4>
            <h3 className="book-price">{book.price}</h3>
          </Link>
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
          {booksToDisplay.slice(0, 2).map((book) => (
            <Link to={`/product?id=${book.id}`} key={book.id} className="book-card">
              <div className="book-image-wrapper">
                <img src={book.image || productImg} alt={book.title} className="book-image" />
              </div>
              <h3>{book.title}</h3>
              <h4>{book.subtitle}</h4>
              <h3 className="book-price">{book.price}</h3>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default CategoriePage;