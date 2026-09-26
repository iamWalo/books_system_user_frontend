import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './OneBlogPage.css';
import '../../components/Blog/Blog.css';
import { getBlogs, mediaUrl } from '../../api.js';
import Subscribe from '../../components/Subscribe/Subscribe.jsx';

const DEFAULT_RELATED_BLOGS = [
    {
        id: 'fallback-1',
        _id: 'fallback-1',
        title: 'Why Kids Ask “Why” So Much',
        description: 'A field guide to the question age and the wonder behind every curious child.',
        category: 'Curiosity',
        bannerImage: null,
    },
    {
        id: 'fallback-2',
        _id: 'fallback-2',
        title: 'How Big Questions Turn Into Big Learning',
        description: 'Simple ways to turn everyday questions into deeper discovery and confidence.',
        category: 'Curiosity',
        bannerImage: null,
    },
];

export const OneBlogPage = ({ blogData, blogsData = [], categories = [], blogCategories = [] }) => {
    const [searchParams] = useSearchParams();
    const [loadedBlog, setLoadedBlog] = useState(blogData);
    const [allBlogs, setAllBlogs] = useState(blogsData.length > 0 ? blogsData : DEFAULT_RELATED_BLOGS);

    useEffect(() => {
        const blogId = searchParams.get('id');
        if (blogData && blogId) {
            setLoadedBlog(blogData);
            return;
        }

        if (!blogId) return;

        getBlogs()
            .then((blogs) => {
                const foundBlog = blogs.find((blogItem) => String(blogItem?._id || blogItem?.id) === String(blogId));
                setLoadedBlog(foundBlog || null);
            })
            .catch((error) => {
                console.error('Unable to load blog', error);
                setLoadedBlog(null);
            });
    }, [blogData, searchParams]);

    useEffect(() => {
        if (blogsData && blogsData.length > 0) {
            setAllBlogs(blogsData);
            return;
        }

        getBlogs()
            .then((blogs) => setAllBlogs(blogs.length > 0 ? blogs : DEFAULT_RELATED_BLOGS))
            .catch((error) => {
                console.error('Unable to load related blogs', error);
                setAllBlogs(DEFAULT_RELATED_BLOGS);
            });
    }, [blogsData]);

    const blog = loadedBlog || blogData;
    const currentBlogId = blog?._id || blog?.id;

    const findCategoryImage = (blogItem) => {
        const categoryName = blogItem?.category || blogItem?.categoryName || blogItem?.categorie || blogItem?.blogCategory;
        if (!categoryName) return null;

        const match = [...categories, ...blogCategories].find((category) => {
            const categoryValues = [
                category?.name,
                category?.title,
                category?.slug,
                category?.label,
            ].filter(Boolean);

            return categoryValues.some((value) => String(value).toLowerCase() === String(categoryName).toLowerCase());
        });

        return match?.image || match?.bannerImage || null;
    };

    const articleImage = blog?.bannerImage || blog?.image || blog?.coverImage || blog?.featuredImage || findCategoryImage(blog);

    const relatedBlogs = useMemo(() => {
        if (!blog || !allBlogs.length) return DEFAULT_RELATED_BLOGS.slice(0, 2);

        const categoryValues = [
            blog.category,
            blog.categoryName,
            blog.categorie,
            blog.blogCategory,
            blog.category?.name,
            blog.category?.slug,
        ].filter(Boolean);

        const sameCategoryBlogs = allBlogs.filter((item) => {
            const itemId = item?._id || item?.id;
            if (itemId && currentBlogId && itemId === currentBlogId) return false;

            const itemCategoryValues = [
                item.category,
                item.categoryName,
                item.categorie,
                item.blogCategory,
                item.category?.name,
                item.category?.slug,
            ].filter(Boolean);

            return categoryValues.some((category) =>
                itemCategoryValues.some((itemCategory) => {
                    if (!category || !itemCategory) return false;
                    return String(itemCategory) === String(category);
                })
            );
        });

        return sameCategoryBlogs.length > 0 ? sameCategoryBlogs.slice(0, 2) : DEFAULT_RELATED_BLOGS.slice(0, 2);
    }, [allBlogs, blog, currentBlogId]);

    const handleSubscribe = (e) => {
        e.preventDefault();
    };

    return (
        <div className="one-blog-page-root">
            <main className="one-blog-container">
                <header className="article-header">
                    <h1 className="article-main-title">
                        {blog?.title || 'My kids Ask Weird Questions?'}
                    </h1>
                    <div className="article-featured-image-wrapper">
                        <img src={mediaUrl(articleImage)} alt={blog?.title || 'Blog cover'} />
                        {/* {articleImage ? (
                        ) : (
                            <div className="article-image-placeholder" />
                        )} */}
                    </div>
                </header>

                <article className="article-body-content">
                    {blog?.body ? <div dangerouslySetInnerHTML={{ __html: blog.body }} /> : (
                        <>
                            <p>Children are naturally curious explorers, constantly asking questions that can make us laugh, pause, or ponder the deepest mysteries of the universe.</p>
                            <p>When your child asks a surprising or unusual question, it opens up a wonderful window into how their mind processes and tries to make sense of the world around them.</p>
                        </>
                    )}
                </article>

                <div className="article-mascot-wrapper">
                    <div className="article-mascot-img">🦔</div>
                </div>

                <Subscribe />

                <section className="related-books-grid">
                    <div className="related-book-card">
                        <div className="related-book-image-wrapper">
                            <div className="article-image-placeholder" />
                        </div>
                        <div className="related-book-info">
                            <h3 className="related-book-title">100,000 Whys</h3>
                            <span className="related-book-price">18.99$</span>
                        </div>
                    </div>

                    <div className="related-book-card">
                        <div className="related-book-image-wrapper">
                            <div className="article-image-placeholder" />
                        </div>
                        <div className="related-book-info">
                            <h3 className="related-book-title">The Whys Book Of Time</h3>
                            <span className="related-book-price">18.99$</span>
                        </div>
                    </div>
                </section>

                {relatedBlogs.length > 0 && (
                    <section className="also-read-section">
                        <h2 className="also-read-heading">Also read</h2>
                        <div className="also-read-grid">
                            {relatedBlogs.map((relatedBlog) => {
                                const relatedId = relatedBlog._id || relatedBlog.id;
                                const relatedImage = relatedBlog.bannerImage || relatedBlog.image || relatedBlog.coverImage || relatedBlog.featuredImage || findCategoryImage(relatedBlog);

                                return (
                                    <Link to={`/article?id=${relatedId}`} key={relatedId} className="also-read-card blog-card">
                                        {relatedImage ? (
                                            <img
                                                src={mediaUrl(relatedImage)}
                                                alt={relatedBlog.title}
                                                className="blog-image"
                                            />
                                        ) : null}
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