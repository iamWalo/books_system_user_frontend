import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './ProductPage.css';
import mainBookImg from '../../assets/main_book.svg';
import relatedBook1 from '../../assets/thumb1.svg';
import { getImageUrl, getProduct } from '../../api.js';

const handleImageError = (event, fallbackImage) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = 'true';
    image.src = fallbackImage;
};

const ProductPage = ({ products: propsProducts = [] }) => {
    const [searchParams] = useSearchParams();
    const [fetchedProduct, setFetchedProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const productId = searchParams.get('id');
    const allProducts = propsProducts;
    const availableProduct = allProducts.find((item) => String(item._id || item.id) === String(productId));

    // Fetch specific product by ID if not in allProducts
    useEffect(() => {
        if (!productId || availableProduct) return;

        let isCurrent = true;
        getProduct(productId)
            .then((item) => {
                if (!isCurrent) return;
                if (!item) throw new Error('Product not found.');
                setFetchedProduct({ id: productId, product: item });
            })
            .catch((error) => {
                if (!isCurrent) return;
                setFetchedProduct({ id: productId, error: error.message || 'Unable to load this product.' });
            });

        return () => {
            isCurrent = false;
        };
    }, [availableProduct, productId]);

    // Current displayed product
    const currentRequest = fetchedProduct?.id === productId ? fetchedProduct : null;
    const product = availableProduct || currentRequest?.product;
    const productLoading = Boolean(productId && !availableProduct && !currentRequest);
    const productError = currentRequest?.error || '';

    // Image gallery management
    const productImage = product?.productImages?.[0] ? getImageUrl(product.productImages[0]) : mainBookImg;
    const thumbnails = useMemo(() => {
        if (!product) return [mainBookImg];
        const rawImages = product.productImages || [];
        const mapped = rawImages.map(getImageUrl);
        return mapped.length > 0 ? mapped : [mainBookImg];
    }, [product]);

    // Description images are separate from the product cover gallery.
    const promoImages = useMemo(() => {
        return (product?.descriptionImages || []).map(getImageUrl);
    }, [product]);

    const activeImage = thumbnails.includes(selectedImage) ? selectedImage : thumbnails[0] || productImage;

    const chapters = Array.isArray(product?.bookChapters) ? product.bookChapters : [];

    // Filter products from the same Series
    const sameSeriesProducts = useMemo(() => {
        if (!product || !allProducts.length) return [];
        const currentSeriesId = typeof product.serie === 'object' ? product.serie?._id : product.serie;
        if (!currentSeriesId) return [];

        return allProducts.filter((p) => {
            const pId = p._id || p.id;
            const currentId = product._id || product.id;
            if (String(pId) === String(currentId)) return false;

            const pSeriesId = typeof p.serie === 'object' ? p.serie?._id : p.serie;
            return String(pSeriesId) === String(currentSeriesId);
        });
    }, [product, allProducts]);

    // Filter products from the same Category ("You May Also Like") - Constrained to 2 books
    const sameCategoryProducts = useMemo(() => {
        if (!product || !allProducts.length) return [];
        const currentCategoryId = typeof product.category === 'object' ? product.category?._id : product.category;
        if (!currentCategoryId) return [];

        return allProducts
            .filter((p) => {
                const pId = p._id || p.id;
                const currentId = product._id || product.id;
                if (String(pId) === String(currentId)) return false;

                const pCategoryId = typeof p.category === 'object' ? p.category?._id : p.category;
                return String(pCategoryId) === String(currentCategoryId);
            })
            .slice(0, 2);
    }, [product, allProducts]);

    const getBookImage = (item) => {
        const raw = item?.productImages?.[0];
        return raw ? getImageUrl(raw) : relatedBook1;
    };

    if (productLoading || !product) {
        return (
            <div className="product-page-container">
                <p role={productError ? 'alert' : 'status'}>
                    {productLoading ? 'Loading product...' : productError || 'Select a product to view its details.'}
                </p>
            </div>
        );
    }

    return (
        <div className="product-page-container">
            {/* Product Display Section */}
            <section className="product-gallery-section">
                <div className="main-image-wrapper">
                    <img
                        src={activeImage}
                        alt={product?.name || 'Book Cover'}
                        className="main-book-image"
                        onError={(event) => handleImageError(event, mainBookImg)}
                    />
                </div>

                <div className="gallery-meta">
                    <span className="gallery-label">LOOK INSIDE ({thumbnails.length} PAGES)</span>
                </div>

                <div className="thumbnails-grid">
                    {thumbnails.map((img, idx) => (
                        <div
                            key={idx}
                            className={`thumbnail-card ${activeImage === img ? 'active' : ''}`}
                            onClick={() => setSelectedImage(img)}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                onError={(event) => handleImageError(event, mainBookImg)}
                            />
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
                            <span>Series:</span> {typeof product.serie === 'object' ? product.serie?.name : product.subtitle || 'Not specified'}
                        </p>
                    </div>
                    <div className="price-area">
                        <span className="price-label">Price</span>
                        <span className="price-value">${product.price}</span>
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
                                    <span className="card-label">Status</span>
                                </div>
                                <strong className="card-val">{product.status || 'Active'}</strong>
                            </div>

                            <div className="info-card">
                                <div className="card-left">
                                    <i className="fa-solid fa-user-group icon-purple"></i>
                                    <span className="card-label">Target Age</span>
                                </div>
                                <strong className="card-val">{product.ageRange || 'Not specified'}</strong>
                            </div>

                            <div className="info-card">
                                <div className="card-left">
                                    <i className="fa-solid fa-book-open icon-purple"></i>
                                    <span className="card-label">Book Size "in"</span>
                                </div>
                                <strong className="card-val">{product.size || 'Not specified'}</strong>
                            </div>

                            <div className="info-card">
                                <div className="card-left">
                                    <i className="fa-solid fa-book-bookmark icon-purple"></i>
                                    <span className="card-label">Length</span>
                                </div>
                                <strong className="card-val">{product.pagesNumber != null ? `${product.pagesNumber} Pages` : 'Not specified'}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Inside The Book */}
                    <div className="chapters-col">
                        <div className="section-header space-between">
                            <h3 className="section-title">Inside The Book</h3>
                            <span className="chapters-count">{chapters.length} Chapters</span>
                            <div className="title-underline"></div>
                        </div>

                        <div className="chapters-grid">
                            {chapters.length > 0 ? (
                                chapters.map((chapter, index) => (
                                    <div className="chapter-card" key={chapter._id || index}>
                                        <strong>{index + 1}</strong> {typeof chapter === 'string' ? chapter : chapter.name || chapter.title}
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#888', fontStyle: 'italic', padding: '10px 0' }}>No chapters listed.</p>
                            )}
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
                <h3 className="section-title">Description</h3>
                {product.description ? (
                    <div
                        className="body-medium"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                ) : (
                    <p className="body-medium">No description is available for this product.</p>
                )}
            </section>

            {/* Visual Promo Banners */}
            {promoImages.length > 0 && (
                <section className="promo-banners-section">
                    {promoImages.map((imgUrl, index) => (
                        <div className="promo-card" key={index}>
                            <img
                                src={imgUrl}
                                alt={`${product?.name || 'Product'} promo banner ${index + 1}`}
                                onError={(event) => handleImageError(event, mainBookImg)}
                            />
                        </div>
                    ))}
                </section>
            )}

            {/* Recommendation 1: From The Same Serie */}
            {sameSeriesProducts.length > 0 && (
                <section className="recommendation-section">
                    <h2>From The Same Serie</h2>
                    <h4>More entries from the same case file</h4>

                    <div className="related-grid">
                        {sameSeriesProducts.map((item) => {
                            const itemId = item._id || item.id;
                            return (
                                <Link to={`/product?id=${itemId}`} key={itemId} className="book-card">
                                    <div className="image-card-box">
                                        <img
                                            src={getBookImage(item)}
                                            alt={item.name}
                                            className="book-image"
                                            onError={(event) => handleImageError(event, relatedBook1)}
                                        />
                                    </div>
                                    <h3 className="book-title">{item.name}</h3>
                                    <p className="book-subtitle">
                                        {item.subtitle
                                            ? item.subtitle
                                            : 'Explore more books from this series.'}
                                    </p>
                                    <span className="book-price">${item.price}</span>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Recommendation 2: You May Also Like (2 Books From Same Category) */}
            <section className="recommendation-section">
                <h2>You May Also Like</h2>
                <h4>Related evidence, for the curious</h4>

                <div className="related-grid">
                    {sameCategoryProducts.length > 0 ? (
                        sameCategoryProducts.map((item) => {
                            const itemId = item._id || item.id;
                            return (
                                <Link to={`/product?id=${itemId}`} key={itemId} className="book-card">
                                    <div className="image-card-box">
                                        <img
                                            src={getBookImage(item)}
                                            alt={item.name}
                                            className="book-image"
                                            onError={(event) => handleImageError(event, relatedBook1)}
                                        />
                                    </div>
                                    <h3 className="book-title">{item.name}</h3>
                                    <p className="book-subtitle">
                                        {item.subtitle
                                            ? item.subtitle
                                            : 'Covers curious topics and learning.'}
                                    </p>
                                    <span className="book-price">${item.price}</span>
                                </Link>
                            );
                        })
                    ) : (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>No other books found in this category.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProductPage;