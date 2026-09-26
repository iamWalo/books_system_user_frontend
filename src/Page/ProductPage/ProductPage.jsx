import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './ProductPage.css';
// Import icons & images from your assets
import mainBookImg from '../../assets/main_book.svg';
import thumb1 from '../../assets/thumb1.svg';
// import thumb2 from '../assets/thumb1.svg';
// import thumb3 from '../assets/thumb1.svg';
import promoImg1 from '../../assets/story_img_1.png';
import promoImg2 from '../../assets/story_img_2.png';
import promoImg3 from '../../assets/story_img_3.png';
import relatedBook1 from '../../assets/thumb1.svg';
import relatedBook2 from '../../assets/thumb1.svg';
import { getProduct, mediaUrl } from '../../api.js';
// import footerLogo from '../assets/footer-logo.svg';


const ProductPage = ({ products = [] }) => {
    const [searchParams] = useSearchParams();
    const [loadedProduct, setLoadedProduct] = useState(null);
    const productId = searchParams.get('id');
    const product = loadedProduct || products.find((item) => item._id === productId) || (productId ? null : products[0]);
    const [selectedImage, setSelectedImage] = useState(mainBookImg);

    useEffect(() => {
        if (!productId || products.some((item) => item._id === productId)) return;
        getProduct(productId).then(setLoadedProduct).catch((error) => console.error('Unable to load product', error));
    }, [productId, products]);

    const thumbnails = product ? [product.image, ...(product.productImages || [])].filter(Boolean).map(mediaUrl) : [thumb1, thumb1, thumb1];
    const productImage = product?.image ? mediaUrl(product.image) : mainBookImg;
    const chapters = Array.isArray(product?.chapters) ? product.chapters : [];

    return (
        <div className="product-page-container">
            {/* Product Display Section */}
            <section className="product-gallery-section">
                <div className="main-image-wrapper">
                    <img src={selectedImage === mainBookImg ? productImage : selectedImage} alt={product?.name || 'The Whys Book Of Time'} className="main-book-image" />
                </div>

                <div className="gallery-meta">
                    <span className="gallery-label">LOOK INSIDE (3 PAGES)</span>
                </div>

                <div className="thumbnails-grid">
                    {thumbnails.map((img, idx) => (
                        <div
                            key={idx}
                            className={`thumbnail-card ${selectedImage === img ? 'active' : ''}`}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} />
                        </div>
                    ))}
                </div>
                <div className="swipe-hint">Swipe to explore</div>
            </section>

            {/* Main Product Info */}
            <section className="product-info-section">
                {/* Header: Title & Subtitle + Price */}
                <div className="info-header">
                    <div className="title-area">
                        <h1 className="main-title">{product?.name || 'The Whys Book Of Time'}</h1>
                        <p className="subtitle">
                            <span>Serie:</span> {product?.serie?.name || 'the books of whys with tick the owl'}
                        </p>
                    </div>
                    <div className="price-area">
                        <span className="price-label">Price</span>
                        <span className="price-value">{product ? `${product.price}$` : '$18.99'}</span>
                    </div>
                </div>

                {/* Details & Inside The Book Section */}
                <div className="details-chapters-grid">
                    {/* Left Column: Details */}
                    <div className="details-col">
                        <div className="section-header">
                            <h3 className="section-title">Details</h3>
                            <div className="title-underline"></div>
                        </div>

                        <div className="cards-stack">
                            <div className="info-card">
                                <div className="card-left">
                                    <i className="fa-regular fa-calendar-days icon-purple"></i>
                                    <span className="card-label">Date</span>
                                </div>
                                <strong className="card-val">{product?.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'July 17, 2026'}</strong>
                            </div>

                            <div className="info-card">
                                <div className="card-left">
                                    <i className="fa-solid fa-user-group icon-purple"></i>
                                    <span className="card-label">Target Age</span>
                                </div>
                                <strong className="card-val">{product?.ageRange || '8 - 12'}</strong>
                            </div>

                            <div className="info-card">
                                <div className="card-left">
                                    <i className="fa-solid fa-book-open icon-purple"></i>
                                    <span className="card-label">Book Size "in"</span>
                                </div>
                                <strong className="card-val">{product?.size || '8.5x11'}</strong>
                            </div>

                            <div className="info-card">
                                <div className="card-left">
                                    <i className="fa-solid fa-book-bookmark icon-purple"></i>
                                    <span className="card-label">Length</span>
                                </div>
                                <strong className="card-val">{product?.pagesNumber ? `${product.pagesNumber} Pages` : '129 Pages'}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Inside The Book */}
                    <div className="chapters-col">
                        <div className="section-header space-between">
                            <h3 className="section-title">Inside The Book</h3>
                            <span className="chapters-count">{product?.chapters ? `${chapters.length} Chapters` : '8 Chapters'}</span>
                            <div className="title-underline"></div>
                        </div>

                        <div className="chapters-grid">
                            {chapters.length > 0 ? chapters.map((chapter, index) => (
                                <div className="chapter-card" key={chapter._id || index}><strong>{index + 1}</strong> {chapter.name || chapter.title || chapter}</div>
                            )) : <>
                                <div className="chapter-card"><strong>1</strong> Clocks & Basics</div>
                                <div className="chapter-card"><strong>2</strong> Clocks & Basics</div>
                                <div className="chapter-card"><strong>5</strong> Clocks & Basics</div>
                                <div className="chapter-card"><strong>6</strong> Clocks & Basics</div>
                                <div className="chapter-card"><strong>3</strong> Clocks & Basics</div>
                                <div className="chapter-card"><strong>4</strong> Clocks & Basics</div>
                                <div className="chapter-card"><strong>7</strong> Clocks & Basics</div>
                                <div className="chapter-card"><strong>8</strong> Clocks & Basics</div></>}
                        </div>
                    </div>
                </div>

                {/* Buy Button */}
                <a href="#amazon" className="amazon-buy-button">
                    <i className="fa-solid fa-bag-shopping"></i> Buy on Amazon
                </a>
            </section>

            {/* Product Description Text */}
            <section className="product-description-section">
                {/* 1. BOLD */}
                <h3 className="section-title">
                    {product?.description || 'Unlock the Amazing World of Time!'}
                </h3>

                {/* 2. MEDIUM */}
                {!product?.description && <p className="body-medium">
                    From ancient sundials to atomic clocks, from Earth's spin to distant galaxies — time is the greatest mystery of all.{' '}
                    THE WHYS BOOK OF TIME: Encyclopedia Edition takes curious kids on an unforgettable adventure through hundreds of real "why" questions, answered with real science made easy to understand.
                </p>}

                {/* 3. BOLD */}
                <div className="questions-block">
                    Emm, why does time only move forward and not backward?<br />
                    Why does a clock have 12 hours instead of 10?<br />
                    Why do we say "time flies"?<br />
                    Why do we say "o'clock"? and more...!
                </div>

                {/* 4. MEDIUM */}
                <p className="body-medium">
                    Join your guide through time as WhyQuest Publishing turns the questions every curious kid asks into a full-color journey of discovery.
                </p>

                {/* 5. BOLD */}
                <h4 className="list-title">Why kids (and parents) love this book:</h4>
                <ul className="benefits-list">
                    <li>Hundreds of real WHY questions, answered simply</li>
                    <li>Real science made easy to understand</li>
                    <li>Stunning full-color illustrations on every page</li>
                    <li>Fun facts and "did you know" boxes throughout</li>
                    <li>Perfect for home, school, and curious minds ages 6–12</li>
                    <li>Size: 8.5 by 11</li>
                </ul>

                {/* 6. MEDIUM */}
                <p className="body-medium">
                    Whether it's for a classroom, a homeschool shelf, or a kid who never stops asking "but why?"<br />
                    this encyclopedia turns big questions about time into an adventure they won't want to close.
                </p>
            </section>

            {/* Visual Promo Banners */}
            <section className="promo-banners-section">
                <div className="promo-card">
                    <img src={promoImg1} alt="Big Questions, Fascinating Answers" />
                </div>
                <div className="promo-card">
                    <img src={promoImg2} alt="Easy Answers for Young Minds" />
                </div>
                <div className="promo-card">
                    <img src={promoImg3} alt="Chapters Included" />
                </div>
            </section>

            {/* Recommendation 1: From The Same Series */}
            <section className="recommendation-section">
                <h2>From The Same Series</h2>
                <h4>Continuous learning for growing minds</h4>

                <div className="related-grid">
                    <Link to="/product" className="book-card">
                        <div className="image-card-box">
                            <img src={relatedBook1} alt="The Whys Book Of Time" className="book-image" />
                        </div>
                        <h3 className="book-title">The Whys Book Of Time</h3>
                        <p className="book-subtitle">Covers the biological time and animal life</p>
                        <span className="book-price">$18.99</span>
                    </Link>

                    <Link to="/product" className="book-card">
                        <div className="image-card-box">
                            <img src={relatedBook1} alt="The Whys Book Of Time" className="book-image" />
                        </div>
                        <h3 className="book-title">The Whys Book Of Time</h3>
                        <p className="book-subtitle">Covers the biological time and animal life</p>
                        <span className="book-price">$18.99</span>
                    </Link>
                </div>
            </section>

            {/* Recommendation 2: You May Also Like */}
            <section className="recommendation-section">
                <h2>You May Also Like</h2>
                <h4>Handpicked picks for curious readers</h4>

                <div className="related-grid">
                    <Link to="/product" className="book-card">
                        <div className="image-card-box">
                            <img src={relatedBook1} alt="The Whys Book Of Time" className="book-image" />
                        </div>
                        <h3 className="book-title">The Whys Book Of Time</h3>
                        <p className="book-subtitle">Covers the biological time and animal life</p>
                        <span className="book-price">$18.99</span>
                    </Link>

                    <Link to="/product" className="book-card">
                        <div className="image-card-box">
                            <img src={relatedBook2} alt="The Whys Book Of Time" className="book-image" />
                        </div>
                        <h3 className="book-title">The Whys Book Of Time</h3>
                        <p className="book-subtitle">Discover ancient history and timekeeping</p>
                        <span className="book-price">$18.99</span>
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default ProductPage;