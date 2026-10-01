import { Link } from 'react-router-dom';
import './NewRelease.css';
import newrelease_book_img from '../../assets/newrelease_book_img.svg';
import { getImageUrl } from '../../api';

const NewRelease = ({ products: propsProducts = [] }) => {
  const getProductImage = (product) => {
    const rawImage = product?.productImages?.[0];
    if (!rawImage) return newrelease_book_img;
    return getImageUrl(rawImage);
  };

  const books = propsProducts.filter((product) => product.status === 'Active').slice(0, 3).map((product) => ({
    id: product._id || product.id,
    title: product.name || product.title,
    subtitle: product.subtitle || 'A thoughtful and engaging read for curious minds.',
    price: `${product.price}$`,
    image: getProductImage(product)
  }));

  return (
    <section className="new-release-container">
      {/* Header Badge */}
      <div className="new-release-header">
        <h2>New Release</h2>
        <h3>Fresh off the press and ready for the next big question</h3>
      </div>

      {/* Grid Layout */}
      <div className="books-grid">
        {books.length ? books.map((book, index) => (
          <Link
            to={`/product?id=${book.id}`}
            key={book.id}
            className={`book-card ${index === 2 ? 'centered-card' : ''}`}
          >
            <div className="image-card-box">
              <img
                src={book.image}
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = newrelease_book_img;
                }}
              />
            </div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-subtitle">{book.subtitle}</p>
            <span className="book-price">{book.price}</span>
          </Link>
        )) : <p>No new releases are available right now.</p>}
      </div>
    </section>
  );
};

export default NewRelease;