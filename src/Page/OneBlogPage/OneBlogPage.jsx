import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './OneBlogPage.css';
import '../../components/Blog/Blog.css';
import blogImagePlaceholder from '../../assets/blog_section_img.svg';
import bookImagePlaceholder from '../../assets/release_book_img.svg';
import { getBlog, getImageUrl } from '../../api.js';
import Subscribe from '../../components/Subscribe/Subscribe.jsx';

const handleImageError = (event, fallbackImage) => {
    if (event.currentTarget.dataset.fallbackApplied) return;
    event.currentTarget.dataset.fallbackApplied = 'true';
    event.currentTarget.src = fallbackImage;
};

export const OneBlogPage = ({ blogData, blogsData = [], products = [] }) => {
    const [searchParams] = useSearchParams();
    const blogId = searchParams.get('id');
    const [fetchedBlog, setFetchedBlog] = useState(null);
    const availableBlog = [blogData, ...blogsData].find((item) =>
        String(item?._id || item?.id) === String(blogId) && item.status === 'Published'
    );

    useEffect(() => {
        if (!blogId || availableBlog) return;

        let isCurrent = true;
        getBlog(blogId)
            .then((item) => {
                if (!isCurrent) return;
                if (!item || item.status !== 'Published') throw new Error('Article not found.');
                setFetchedBlog({ id: blogId, blog: item });
            })
            .catch((error) => {
                if (!isCurrent) return;
                console.error('Unable to load blog', error);
                setFetchedBlog({ id: blogId, error: error.message || 'Unable to load this article.' });
            });

        return () => {
            isCurrent = false;
        };
    }, [availableBlog, blogId]);

    const currentRequest = fetchedBlog?.id === blogId ? fetchedBlog : null;
    const blog = availableBlog || currentRequest?.blog;
    const blogLoading = Boolean(blogId && !availableBlog && !currentRequest);
    const blogError = currentRequest?.error || '';
    const currentBlogId = blog?._id || blog?.id;

    // Helper to format date into Day, Month, Year
    const formatDate = (rawDate) => {
        if (!rawDate) return '';
        const parsedDate = new Date(rawDate);
        if (isNaN(parsedDate.getTime())) return rawDate; // Return as-is if string date is not standard ISO

        return parsedDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const author = blog?.author;
    const rawPublishDate = blog?.publishDate;
    const formattedDate = formatDate(rawPublishDate);

    const articleImage = blog?.bannerImage;

    const relatedBlogs = useMemo(() => {
        if (!blog || !blogsData.length) return [];
        return blogsData.filter((item) => {
            const itemId = item?._id || item?.id;
            return item.status === 'Published'
                && String(itemId) !== String(currentBlogId)
                && item.category === blog.category;
        }).slice(0, 2);
    }, [blogsData, blog, currentBlogId]);

    const storyBooks = products
        .filter((item) => item.status === 'Active' && item.categories?.includes('story_book'))
        .slice(0, 2);

    if (blogLoading || !blog) {
        return (
            <div className="one-blog-page-root">
                <main className="one-blog-container">
                    <p role={blogError ? 'alert' : 'status'}>
                        {blogLoading ? 'Loading article...' : blogError || 'Article not found.'}
                    </p>
                </main>
            </div>
        );
    }

    return (
        <div className="one-blog-page-root">
            <main className="one-blog-container">
                <header className="article-header">
                    <h2 className="article-main-title">
                        {blog.title}
                    </h2>

                    {/* Author & Published Date meta line above cover image */}
                    <div className="article-meta" style={{}}>
                        {author && <span className="article-author">By {author}</span>}
                        {author && formattedDate && <span className="article-meta-divider"> • </span>}
                        {formattedDate && <span className="article-date">{formattedDate}</span>}
                    </div>

                    <div className="article-featured-image-wrapper">
                        <img
                            src={getImageUrl(articleImage) || blogImagePlaceholder}
                            alt={blog.title}
                            onError={(event) => handleImageError(event, blogImagePlaceholder)}
                        />
                    </div>
                </header>

                <article className="article-body-content">
                    <div dangerouslySetInnerHTML={{ __html: blog.body }} />
                </article>



                <Subscribe />

                {storyBooks.length > 0 && (
                    <section>
                        <h2 className="also-read-heading">Story Books</h2>
                        <div className="related-books-grid">
                            {storyBooks.map((product) => (
                                <Link to={`/product?id=${product._id || product.id}`} key={product._id || product.id} className="related-book-card">
                                    <div className="related-book-image-wrapper">
                                        <img
                                            src={getImageUrl(product.productImages?.[0]) || bookImagePlaceholder}
                                            alt={product.name}
                                            onError={(event) => handleImageError(event, bookImagePlaceholder)}
                                        />
                                    </div>
                                    <div className="related-book-info">
                                        <h3 className="related-book-title">{product.name}</h3>
                                        <span className="related-book-price">${product.price}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {relatedBlogs.length > 0 && (
                    <section className="also-read-section">
                        <h2 className="also-read-heading">Also read</h2>
                        <div className="also-read-grid">
                            {relatedBlogs.map((relatedBlog) => {
                                const relatedId = relatedBlog._id || relatedBlog.id;
                                const relatedImage = relatedBlog.bannerImage;

                                return (
                                    <Link to={`/article?id=${relatedId}`} key={relatedId} className="also-read-card blog-card">
                                        <img
                                            src={getImageUrl(relatedImage) || blogImagePlaceholder}
                                            alt={relatedBlog.title}
                                            className="blog-image"
                                            onError={(event) => handleImageError(event, blogImagePlaceholder)}
                                        />
                                        <div className="blog-overlay" />
                                        <div className="blog-content">
                                            <h3 className="blog-title">{relatedBlog.title}</h3>
                                            <p className="blog-description">{relatedBlog.description || relatedBlog.category || 'Curious reading for growing minds.'}</p>
                                            <span className="blog-read-more"><h4>Read More</h4></span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};