import { Link } from 'react-router-dom';
import './SeriesPage.css';
import release_book from '../../assets/release_book_img.svg';
import { mediaUrl } from '../../api.js';

const DEFAULT_SERIES_DATA = [
    {
        _id: 'series-1',
        name: 'THE NATURAL WORLD',
        description: 'Nature, earth & animals',
        theme: 'green-theme',
        books: [
            { id: 'b1', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b2', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b3', title: 'The Whys Book Of Time', price: '18.99$' },
        ],
    },
    {
        _id: 'series-2',
        name: 'HOW THINGS WORK',
        description: 'Space, tech & the body',
        theme: 'blue-theme',
        books: [
            { id: 'b4', title: 'The Whys Book Of Time', price: '13.99$' },
            { id: 'b5', title: 'The Whys Book Of Time', price: '13.99$' },
        ],
    },
    {
        _id: 'series-3',
        name: 'MIND & REST',
        description: 'Sleep, Mental & learning',
        theme: 'pink-theme',
        books: [
            { id: 'b6', title: 'The Whys Book Of Time', price: '18.99$' },
        ],
    },
    {
        _id: 'series-4',
        name: 'PEOPLE & PLACES',
        description: 'History, Traditions & words',
        theme: 'rose-theme',
        books: [
            { id: 'b7', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b8', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b9', title: 'The Whys Book Of Time', price: '18.99$' },
        ],
    },
];

const SeriesPage = ({ seriesData }) => {
    const seriesToDisplay = seriesData && seriesData.length > 0 ? seriesData : DEFAULT_SERIES_DATA;

    return (
        <div className="series-page all-categories-page-root">
            <main className="all-categories-container">
                {seriesToDisplay.map((series, idx) => {
                    const themeClass = series.theme || (
                        idx % 4 === 0 ? 'green-theme' :
                            idx % 4 === 1 ? 'blue-theme' :
                                idx % 4 === 2 ? 'pink-theme' : 'rose-theme'
                    );

                    return (
                        <section key={series._id || idx} className={`category-section-wrapper ${themeClass}`}>
                            <div className="category-banner">
                                <div className="category-banner-content">
                                    <div>
                                        <h2 className="category-banner-title">{series.name}</h2>
                                        <p className="category-banner-subtitle">{series.description}</p>
                                    </div>
                                    <div className="category-banner-count">
                                        <span className="count-num">{series.books ? series.books.length : 0}</span>
                                        <span className="count-label">Books</span>
                                    </div>
                                </div>
                            </div>

                            <div className="category-books-scroll-row">
                                {series.books && series.books.map((book) => (
                                    <Link to={`/product?id=${book._id || book.id}`} key={book._id || book.id} className="book-card">
                                        <div className="book-card-image-wrapper">
                                            {book.image ? (
                                                <img src={mediaUrl(book.image)} alt={book.name || book.title} />
                                            ) : (
                                                <img src={release_book} alt="" />
                                            )}
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
