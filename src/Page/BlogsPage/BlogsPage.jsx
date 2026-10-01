import { useMemo, useState } from 'react';
import './BlogsPage.css';
import { Link } from 'react-router-dom';
import blogImagePlaceholder from '../../assets/blog_section_img.svg';
import { getImageUrl } from '../../api.js';

export const BlogsPage = ({ blogsData = [], blogCategories = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const visibleBlogs = useMemo(() => blogsData.filter((blog) => {
        if (blog.status !== 'Published') return false;
        const matchesSearch = !searchQuery || blog.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }), [blogsData, searchQuery, selectedCategory]);

    const getCategoryImage = (category) => {
        if (category.image) return getImageUrl(category.image);

        const categoryPostIds = new Set((category.posts || []).map((post) =>
            String(typeof post === 'object' ? post?._id || post?.id : post)
        ));
        const categoryBlog = blogsData.find((blog) => {
            const blogId = String(blog._id || blog.id);
            return blog.bannerImage && (blog.category === category.name || categoryPostIds.has(blogId));
        });

        return getImageUrl(categoryBlog?.bannerImage) || blogImagePlaceholder;
    };

    return (
        <div className="blogs-page-root">
            {/* Main Content Area */}
            <main className="blogs-container">
                {/* 2x2 Filter Buttons */}
                <div className="blogs-category-filters">
                    {blogCategories.length > 0 ? blogCategories.map((category) => (
                        <button
                            key={category._id || category.name}
                            className={`filter-btn ${selectedCategory === category.name ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                        >
                            <img
                                src={getCategoryImage(category)}
                                alt=""
                                aria-hidden="true"
                                onError={(event) => {
                                    if (event.currentTarget.dataset.fallbackApplied) return;
                                    event.currentTarget.dataset.fallbackApplied = 'true';
                                    event.currentTarget.src = blogImagePlaceholder;
                                }}
                            />
                            <span>{category.name}</span>
                        </button>
                    )) : null}
                </div>

                {/* Search Field */}
                <div className="blogs-search-wrapper">
                    <input
                        type="text"
                        className="blogs-search-input"
                        placeholder="Find blogs, articles, and ideas ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="blogs-search-icon">🔍</span>
                </div>

                {/* Blog Post List */}
                <div className="blogs-list-feed">
                    {visibleBlogs.map((blog, idx) => (
                        <Link to={`/article?id=${blog._id || blog.id}`} key={blog._id || blog.id || idx} className="blog-card">
                            <div className="blog-card-image-wrapper">
                                <img
                                    src={getImageUrl(blog.bannerImage) || blogImagePlaceholder}
                                    alt={blog.title}
                                    onError={(event) => {
                                        if (event.currentTarget.dataset.fallbackApplied) return;
                                        event.currentTarget.dataset.fallbackApplied = 'true';
                                        event.currentTarget.src = blogImagePlaceholder;
                                    }}
                                />
                            </div>
                            <div className="blog-card-content">
                                <h2 className="blog-card-title">{blog.title}</h2>
                                <span className="blog-card-date">{blog.publishDate || blog.date || ''}</span>
                            </div>
                        </Link>
                    ))}
                    {visibleBlogs.length === 0 && <p>No published articles match your search.</p>}
                </div>
            </main>

        </div>
    );
};