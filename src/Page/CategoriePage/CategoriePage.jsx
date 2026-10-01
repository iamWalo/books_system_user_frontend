import { Link, useLocation, useSearchParams } from 'react-router-dom';
import './CategoriePage.css';
import { getImageUrl } from '../../api.js';
import category_img from '../../assets/categories_img.svg';
import home_icon from '../../assets/categories_home_icon.svg'
import productImg from '../../assets/newrelease_book_img.svg'
const CategoriePage = ({ categories = [] }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('id');
  const apiCategory = categories.find((category) => String(category._id || category.id) === String(categoryId))
    || (!categoryId ? categories[0] : null);
  const bannerImage = location.state?.categoryImage
    || (apiCategory?.image ? getImageUrl(apiCategory.image) : category_img);
  const booksToDisplay = (apiCategory?.books || [])
    .filter((book) => book.status === 'Active')
    .map((book) => ({
      id: book._id,
      title: book.name,
      subtitle: '',
      price: `${book.price}$`,
      image: getImageUrl(book.productImages?.[0])
    }));
  const otherCategoryBooks = categories
    .filter((category) => String(category._id || category.id) !== String(apiCategory?._id || apiCategory?.id))
    .flatMap((category) => category.books || [])
    .filter((book) => book.status === 'Active')
    .slice(0, 2)
    .map((book) => ({
      id: book._id,
      title: book.name,
      price: `${book.price}$`,
      image: getImageUrl(book.productImages?.[0]),
    }));

  return (
    <div className="category-page-container">
      {/* Hero Category Banner */}
      <div
        className="hero-banner"
      >
        <img
          src={bannerImage}
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(event) => {
            if (event.currentTarget.dataset.fallbackApplied) return;
            event.currentTarget.dataset.fallbackApplied = 'true';
            event.currentTarget.src = category_img;
          }}
        />
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <h2>{apiCategory?.name || 'Category not found'}</h2>
          {apiCategory?.description && <h4>{apiCategory.description}</h4>}
        </div>
        <select name="sozrt-dropdown" className='sort-dropdown' id="" style={{ position: 'relative', zIndex: 1 }}>
          <option value="">Stored By</option>
          <option value="">Newest</option>
          <option value="">Popular</option>
        </select>

      </div>

      {/* Main Books Grid (2 Columns) */}
      <main className="books-grid">
        {booksToDisplay.length ? booksToDisplay.map((book) => (
          <Link to={`/product?id=${book.id}`} key={book.id} className="book-card">
            <div className="book-image-wrapper">
              <img
                src={book.image || productImg}
                alt={book.title}
                className="book-image"
                onError={(event) => {
                  if (event.currentTarget.dataset.fallbackApplied) return;
                  event.currentTarget.dataset.fallbackApplied = 'true';
                  event.currentTarget.src = productImg;
                }}
              />
            </div>
            <h3>{book.title}</h3>
            <h4>{book.subtitle}</h4>
            <h3 className="book-price">{book.price}</h3>
          </Link>
        )) : <p>No active books are available in this category.</p>}
      </main>

      {/* Action CTA Buttons */}
      <div className="cta-buttons-container">
        <button className="cta-btn secondary-btn" >
          {/* <img src={question_mark_icon} alt="" /> */}
          <Link to={'/all-categories'} className='choose-another-category-link'><span>Choose another Category</span></Link>
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
          {otherCategoryBooks.map((book) => (
            <Link to={`/product?id=${book.id}`} key={book.id} className="book-card">
              <div className="book-image-wrapper">
                <img
                  src={book.image || productImg}
                  alt={book.title}
                  className="book-image"
                  onError={(event) => {
                    if (event.currentTarget.dataset.fallbackApplied) return;
                    event.currentTarget.dataset.fallbackApplied = 'true';
                    event.currentTarget.src = productImg;
                  }}
                />
              </div>
              <h3>{book.title}</h3>
              <h4>{book.subtitle}</h4>
              <h3 className="book-price">{book.price}</h3>
            </Link>
          ))}
          {otherCategoryBooks.length === 0 && <p>No other category books are available.</p>}
        </div>
      </section>

    </div>
  );
};

export default CategoriePage;