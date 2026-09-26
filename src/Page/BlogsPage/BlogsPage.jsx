import { useMemo, useState } from 'react';
import './BlogsPage.css';
import { Link } from 'react-router-dom';
import { mediaUrl } from '../../api.js';

const MOCK_BLOG_ITEMS = [
    { id: '1', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
    { id: '2', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
    { id: '3', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
    { id: '4', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
    { id: '5', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
    { id: '6', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
    { id: '7', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
    { id: '8', title: 'My kids Ask Weird Questions', date: 'Sep 21, 2026', image: '' },
];

export const BlogsPage = ({ blogsData, blogCategories = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const blogsToDisplay = (blogsData && blogsData.length > 0)
        ? blogsData
        : MOCK_BLOG_ITEMS;
    const visibleBlogs = useMemo(() => blogsToDisplay.filter((blog) => {
        const matchesSearch = !searchQuery || blog.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }), [blogsToDisplay, searchQuery, selectedCategory]);

    return (
        <div className="blogs-page-root">
            {/* Main Content Area */}
            <main className="blogs-container">
                {/* 2x2 Filter Buttons */}
                <div className="blogs-category-filters">
                    {blogCategories.length > 0 ? blogCategories.map((category) => (
                        <button
                            key={category._id}
                            className={`filter-btn ${selectedCategory === category.name ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                        >
                            {category.name}
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
                            {blog.bannerImage && (
                                <div className="blog-card-image-wrapper">
                                    <img src={mediaUrl(blog.bannerImage)} alt={blog.title} />
                                </div>
                            )}
                            <div className="blog-card-content">
                                <h2 className="blog-card-title">{blog.title}</h2>
                                <span className="blog-card-date">{blog.publishDate || blog.date || ''}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Bar */}
                <div className="blogs-pagination">
                    <button className="pagination-arrow" aria-label="Previous page">‹</button>
                    <button
                        className={`pagination-number ${currentPage === 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(1)}
                    >
                        1
                    </button>
                    <button
                        className={`pagination-number ${currentPage === 2 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(2)}
                    >
                        2
                    </button>
                    <button
                        className={`pagination-number ${currentPage === 3 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(3)}
                    >
                        3
                    </button>
                    <button className="pagination-arrow" aria-label="Next page">›</button>
                </div>
            </main>

        </div>
    );
};