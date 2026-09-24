import React, { useState } from 'react';
import './OneBlogPage.css';

export const OneBlogPage = ({ blogData }) => {
    const [subscriberName, setSubscriberName] = useState('');
    const [subscriberEmail, setSubscriberEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setSubscriberName('');
        setSubscriberEmail('');
    };

    return (
        <div className="one-blog-page-root">
            {/* Top Banner Notice */}
            <div className="one-blog-topbar">
                <span>Welcome Explorer!</span> 🦔
            </div>

            {/* Main Navbar */}
            <nav className="one-blog-navbar">
                <button className="nav-btn" aria-label="Open menu">☰</button>
                <span className="brand-logo">WhyQuest</span>
                <button className="nav-btn" aria-label="Search">🔍</button>
            </nav>

            {/* Breadcrumb Path */}
            <div className="one-blog-breadcrumb">
                <span>📁 Home</span> / <span>Blogs</span> / <span>My kids Ask Weird Questions?</span>
            </div>

            {/* Main Container */}
            <main className="one-blog-container">
                {/* Header Section */}
                <header className="article-header">
                    <h1 className="article-main-title">
                        {blogData?.title || 'My kids Ask Weird Questions?'}
                    </h1>
                    <div className="article-featured-image-wrapper">
                        {blogData?.image ? (
                            <img src={blogData.image} alt={blogData.title} />
                        ) : (
                            <div className="article-image-placeholder" />
                        )}
                    </div>
                </header>

                {/* Article Body Text */}
                <article className="article-body-content">
                    <p>
                        Children are naturally curious explorers, constantly asking questions that can make us laugh, pause, or ponder the deepest mysteries of the universe.
                    </p>
                    <p>
                        When your child asks a surprising or unusual question, it opens up a wonderful window into how their mind processes and tries to make sense of the world around them.
                    </p>
                </article>

                {/* Decorative Hedgehog Mascot */}
                <div className="article-mascot-wrapper">
                    <div className="article-mascot-img">🦔</div>
                </div>

                {/* Newsletter Subscription Card */}
                <section className="newsletter-banner">
                    <h2 className="newsletter-title">Join the Whys explorer!</h2>
                    <p className="newsletter-subtitle">
                        Get weekly stories, fun facts, and new book releases directly in your inbox.
                    </p>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input
                            type="text"
                            className="newsletter-input"
                            placeholder="Your name"
                            value={subscriberName}
                            onChange={(e) => setSubscriberName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            className="newsletter-input"
                            placeholder="Your email address"
                            value={subscriberEmail}
                            onChange={(e) => setSubscriberEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="newsletter-submit-btn">
                            SUBSCRIBE NOW
                        </button>
                    </form>
                </section>

                {/* Featured Books Grid */}
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

                {/* Recommended Blog Posts Grid ("Also read this") */}
                <section className="also-read-section">
                    <h2 className="also-read-heading">Also read this</h2>
                    <div className="also-read-grid">
                        <article className="also-read-card">
                            <div className="also-read-image-wrapper">
                                <div className="article-image-placeholder" />
                            </div>
                            <h3 className="also-read-title">My kids Ask Weird Questions?</h3>
                            <span className="also-read-date">Sep 21, 2026</span>
                        </article>

                        <article className="also-read-card">
                            <div className="also-read-image-wrapper">
                                <div className="article-image-placeholder" />
                            </div>
                            <h3 className="also-read-title">My kids Ask Weird Questions?</h3>
                            <span className="also-read-date">Sep 21, 2026</span>
                        </article>
                    </div>
                </section>
            </main>


        </div>
    );
};