import { Link } from 'react-router-dom';
import './AllCategoriesPage.css';
import release_book from '../../assets/release_book_img.svg'

// Default mock data structured 100% identically to your design screenshot
const DEFAULT_CATEGORIES_DATA = [
    {
        _id: 'cat-1',
        name: 'THE NATURAL WORLD',
        description: 'Nature, earth & animals',
        theme: 'green-theme',
        books: [
            { id: 'b1', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b2', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b3', title: 'The Whys Book Of Time', price: '18.99$' },
        ]
    },
    {
        _id: 'cat-2',
        name: 'HOW THINGS WORK',
        description: 'Space, tech & the body',
        theme: 'blue-theme',
        books: [
            { id: 'b4', title: 'The Whys Book Of Time', price: '13.99$' },
            { id: 'b5', title: 'The Whys Book Of Time', price: '13.99$' },
        ]
    },
    {
        _id: 'cat-3',
        name: 'MIND & REST',
        description: 'Sleep, Mental & learning',
        theme: 'pink-theme',
        books: [
            { id: 'b6', title: 'The Whys Book Of Time', price: '18.99$' },
        ]
    },
    {
        _id: 'cat-4',
        name: 'PEOPLE & PLACES',
        description: 'History, Traditions & words',
        theme: 'rose-theme',
        books: [
            { id: 'b7', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b8', title: 'The Whys Book Of Time', price: '18.99$' },
            { id: 'b9', title: 'The Whys Book Of Time', price: '18.99$' },
        ]
    }
];

const AllCategoriesPage = ({ categoriesData }) => {
    const categoriesToDisplay = (categoriesData && categoriesData.length > 0)
        ? categoriesData
        : DEFAULT_CATEGORIES_DATA;

    return (
        <div className="all-categories-page-root">
            {/* Categories Content Area */}
            <main className="all-categories-container">
                {categoriesToDisplay.map((category, idx) => {
                    const themeClass = category.theme || (
                        idx % 4 === 0 ? 'green-theme' :
                            idx % 4 === 1 ? 'blue-theme' :
                                idx % 4 === 2 ? 'pink-theme' : 'rose-theme'
                    );

                    return (
                        <section key={category._id || idx} className={`category-section-wrapper ${themeClass}`}>
                            {/* Category Hero Banner */}
                            <div
                                className="category-banner"
                            // style={{ backgroundImage: category.image ? `url(${category.image})` : { categoriesImage } }}
                            >
                                <div className="category-banner-content">
                                    <div>
                                        <h2 className="category-banner-title">{category.name}</h2>
                                        <p className="category-banner-subtitle">{category.description}</p>
                                    </div>
                                    <div className="category-banner-count">
                                        <span className="count-num">{category.books ? category.books.length : 0}</span>
                                        <span className="count-label">Books</span>
                                    </div>
                                </div>
                            </div>

                            {/* Horizontal Scrollable Book Cards */}
                            <div className="category-books-scroll-row">
                                {category.books && category.books.map((book) => (
                                    <Link to="/product" key={book._id || book.id} className="book-card">
                                        <div className="book-card-image-wrapper">
                                            {book.image ? (
                                                <img src={book.image} alt={book.name || book.title} />
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

            {/* Footer */}

        </div>
    );
};

export { AllCategoriesPage };
export default AllCategoriesPage;