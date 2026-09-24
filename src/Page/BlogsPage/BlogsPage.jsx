import React, { useState } from 'react';
import './BlogsPage.css';
import blogImg from '../../assets/blog_section_img.svg'

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

export const BlogsPage = ({ blogsData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const blogsToDisplay = (blogsData && blogsData.length > 0)
        ? blogsData
        : MOCK_BLOG_ITEMS;

    return (
        <div className="blogs-page-root">
            {/* Main Content Area */}
            <main className="blogs-container">
                {/* 2x2 Filter Buttons */}
                <div className="blogs-category-filters">
                    <button
                        className={`filter-btn ${selectedCategory === 'Natural' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(selectedCategory === 'Natural' ? '' : 'Natural')}
                    >
                        The Natural World
                    </button>
                    <button
                        className={`filter-btn ${selectedCategory === 'Things' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(selectedCategory === 'Things' ? '' : 'Things')}
                    >
                        How Things Work
                    </button>
                    <button
                        className={`filter-btn ${selectedCategory === 'Mind' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(selectedCategory === 'Mind' ? '' : 'Mind')}
                    >
                        Mind & Rest
                    </button>
                    <button
                        className={`filter-btn ${selectedCategory === 'People' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(selectedCategory === 'People' ? '' : 'People')}
                    >
                        People & Places
                    </button>
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
                    {blogsToDisplay.map((blog, idx) => (
                        <article key={blog._id || blog.id || idx} className="blog-card">
                            {blog.image && (
                                <div className="blog-card-image-wrapper">
                                    <img src={blog.image} alt={blog.title} />
                                </div>
                            )}
                            <div className="blog-card-content">
                                <h2 className="blog-card-title">{blog.title}</h2>
                                <span className="blog-card-date">{blog.date || 'Sep 21, 2026'}</span>
                            </div>
                        </article>
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