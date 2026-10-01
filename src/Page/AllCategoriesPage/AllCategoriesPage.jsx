import { Link } from 'react-router-dom';
import './AllCategoriesPage.css';
import release_book from '../../assets/release_book_img.svg';
import category_img from '../../assets/categories_img.svg';
import { getImageUrl } from '../../api.js';

const AllCategoriesPage = ({ categoriesData = [] }) => {
    return (
        <div className="all-categories-page-root">
            <main className="all-categories-container">
                {categoriesData.length === 0 && <p>No categories are available right now.</p>}
                {categoriesData.map((category, idx) => {
                    // Extraction de la couleur depuis le schéma Mongoose
                    const categoryColor = category.color || '#0F4000';

                    // Construction de l'URL pour l'image de bannière issue de l'API
                    const bannerImageUrl = category.image ? getImageUrl(category.image) : null;

                    // Vérifier si la catégorie contient des livres
                    const activeBooks = (category.books || []).filter((book) => book.status === 'Active');
                    const hasBooks = activeBooks.length > 0;

                    return (
                        <section
                            key={category._id || category.id || idx}
                            className="category-section-wrapper"
                            style={{
                                '--category-color': categoryColor,
                                backgroundColor: `color-mix(in srgb, ${categoryColor} 40%, transparent)`
                            }}
                        >
                            {/* Category Hero Banner avec Image d'arrière-plan */}
                            <div
                                className="category-banner"
                            >
                                <img
                                    src={bannerImageUrl || category_img}
                                    alt=""
                                    aria-hidden="true"
                                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }}
                                    onError={(event) => {
                                        if (event.currentTarget.dataset.fallbackApplied) return;
                                        event.currentTarget.dataset.fallbackApplied = 'true';
                                        event.currentTarget.src = category_img;
                                    }}
                                />
                                <div className="category-banner-content">
                                    <div>
                                        <h2 className="category-banner-title">{category.name}</h2>
                                        {category.description && (
                                            <p className="category-banner-subtitle">{category.description}</p>
                                        )}
                                    </div>
                                    <div className="category-banner-count">
                                        <span className="count-num">{activeBooks.length}</span>
                                        <span className="count-label">Books</span>
                                    </div>
                                </div>
                            </div>

                            {/* Conditional Rendering: N-bano l-scroll-row ghir ila kanu l-books */}
                            {hasBooks && (
                                <div className="category-books-scroll-row">
                                    {activeBooks.map((book) => {
                                        const bookId = book._id || book.id;
                                        return (
                                            <Link
                                                to={`/product?id=${bookId}`}
                                                key={bookId}
                                                className="book-card"
                                            >
                                                <div className="book-card-image-wrapper">
                                                    <img
                                                        src={getImageUrl(book.productImages?.[0]) || release_book}
                                                        alt={book.name || book.title || 'Book cover'}
                                                        onError={(event) => {
                                                            if (event.currentTarget.dataset.fallbackApplied) return;
                                                            event.currentTarget.dataset.fallbackApplied = 'true';
                                                            event.currentTarget.src = release_book;
                                                        }}
                                                    />
                                                </div>
                                                <div className="book-card-info">
                                                    <h3 className="book-card-title">{book.name || book.title}</h3>
                                                    <span className="book-card-price">{book.price ? `$${book.price}` : ''}</span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    );
                })}
            </main>
        </div>
    );
};

export { AllCategoriesPage };
export default AllCategoriesPage;