import { Link } from 'react-router-dom';
import './SeriesPage.css';
import release_book from '../../assets/release_book_img.svg';
import category_img from '../../assets/categories_img.svg';
import { getImageUrl } from '../../api.js';

const SeriesPage = ({ seriesData = [] }) => {
    const seriesToDisplay = seriesData;

    return (
        <div className="series-page all-categories-page-root">
            <main className="all-categories-container">
                {seriesToDisplay.length === 0 && <p>No series are available right now.</p>}
                {seriesToDisplay.map((series, idx) => {
                    const activeBooks = (series.books || []).filter((book) => book.status === 'Active');
                    return (
                        <section
                            key={series._id || idx}
                            className="category-section-wrapper"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <div className="category-banner">
                                {series.image && (
                                    <img
                                        src={getImageUrl(series.image)}
                                        alt=""
                                        aria-hidden="true"
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }}
                                        onError={(event) => {
                                            if (event.currentTarget.dataset.fallbackApplied) return;
                                            event.currentTarget.dataset.fallbackApplied = 'true';
                                            event.currentTarget.src = category_img;
                                        }}
                                    />
                                )}
                                <div className="category-banner-content">
                                    <div>
                                        <h2 className="category-banner-title">{series.name}</h2>
                                        <p className="category-banner-subtitle">{series.description}</p>
                                    </div>
                                    <div className="category-banner-count">
                                        <span className="count-num">{activeBooks.length}</span>
                                        <span className="count-label">Books</span>
                                    </div>
                                </div>
                            </div>

                            <div className="category-books-scroll-row">
                                {activeBooks.map((book) => (
                                    <Link to={`/product?id=${book._id || book.id}`} key={book._id || book.id} className="book-card">
                                        <div className="book-card-image-wrapper">
                                            <img
                                                src={getImageUrl(book.productImages?.[0]) || release_book}
                                                alt={book.name || book.title}
                                                onError={(event) => {
                                                    if (event.currentTarget.dataset.fallbackApplied) return;
                                                    event.currentTarget.dataset.fallbackApplied = 'true';
                                                    event.currentTarget.src = release_book;
                                                }}
                                            />
                                        </div>
                                        <div className="book-card-info">
                                            <h3 className="book-card-title">{book.name || book.title}</h3>
                                            <span className="book-card-price">{book.price || ''}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </main>
        </div>
    );
};

export { SeriesPage };
export default SeriesPage;