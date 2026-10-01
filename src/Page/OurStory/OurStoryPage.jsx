import React from 'react';
import { Link } from 'react-router-dom';
import './OurStoryPage.css';

// SVG imports from your Figma assets
import bannerImg from '../../assets/our_story_banner.svg';
import storyImg1 from '../../assets/story_img_1.svg';
import storyImg2 from '../../assets/story_img_2.svg';
import storyImg3 from '../../assets/story_img_3.svg';
import storyImg4 from '../../assets/story_img_4.svg';
import storyImg5 from '../../assets/story_img_5.svg';
import storyImg6 from '../../assets/story_img_6.svg';
import storyImg7 from '../../assets/story_img_7.svg';
import bookCoverImg from '../../assets/book_whys_forest.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Centure from '../../components/Centure/Centure';

export const OurStoryPage = () => {
    return (
        <div className="our-story-page-root">
            <Centure />
            <Header />
            {/* Top Banner Graphic */}
            <div className="story-top-banner">
                <img src={bannerImg} alt="The Whys Forest Banner" className="story-banner-image" />
            </div>

            <main className="our-story-container">
                {/* Header Title Section */}
                <header className="story-header">
                    <span className="story-overline">THE ORIGIN OF WHYQUEST</span>
                    <h1 className="story-main-title">Once upon<br />a question...</h1>
                    <div className="story-divider-ornament">◇</div>
                </header>

                {/* Vertical Story Paragraphs with SVG Graphics */}
                <section className="story-blocks-list">
                    <div className="story-block">
                        <div className="story-image-wrapper">
                            <img src={storyImg1} alt="Story illustration 1" />
                        </div>
                        <p className="story-paragraph">
                            Somewhere past the edge of the map, in a place where old stories echo and stars gleam, there grows a forest unlike any other — <span className="highlight-text">The Whys Forest</span>. Its trees don't grow from seeds. They grow from questions.
                        </p>
                    </div>

                    <div className="story-block">
                        <div className="story-image-wrapper">
                            <img src={storyImg2} alt="Story illustration 2" />
                        </div>
                        <p className="story-paragraph">
                            Every time a child asks a question in our world — <em>"Why is the sky blue?"</em>, <em>"Why do I have to sleep?"</em>, a tiny seed of wonder drops down — and softly takes root in the moss, waiting to grow.
                        </p>
                    </div>

                    <div className="story-block">
                        <div className="story-image-wrapper">
                            <img src={storyImg3} alt="Story illustration 3" />
                        </div>
                        <p className="story-paragraph">
                            If it sits unanswered for long enough, it can spark into a glowing lamp inside a bit of ancient wood, deep within the woods.
                        </p>
                    </div>

                    <div className="story-block">
                        <div className="story-image-wrapper">
                            <img src={storyImg4} alt="Story illustration 4" />
                        </div>
                        <p className="story-paragraph">
                            For the longest time, no one got saved there. The questions glowed in the forest without answers.
                        </p>
                    </div>

                    <div className="story-block">
                        <div className="story-image-wrapper">
                            <img src={storyImg5} alt="Story illustration 5" />
                        </div>
                        <p className="story-paragraph">
                            Deep in the Whys Forest, a giant oak tree rests a secret. In its branch, a small glowing egg began to stir.
                        </p>
                    </div>

                    <div className="story-block">
                        <div className="story-image-wrapper">
                            <img src={storyImg6} alt="Story illustration 6" />
                        </div>
                        <p className="story-paragraph">
                            From that egg came Tock, who learned to gather missing pieces of wisdom into a spark.
                        </p>
                    </div>

                    <div className="story-block">
                        <div className="story-image-wrapper">
                            <img src={storyImg7} alt="Story illustration 7" />
                        </div>
                        <p className="story-paragraph">
                            So Tock followed the lantern's light, where every question led to a new adventure — and a new answer. The Whys Forest is where WhyQuest started long ago.
                        </p>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="story-quote-section">
                    <span className="quote-mark">“</span>
                    <blockquote className="quote-text">
                        The full story is bound in its own book, waiting on the same shelf as everything else he's found.
                    </blockquote>
                </section>

                {/* Read The Full Story Callout */}
                <section className="story-book-cta-section">
                    <span className="story-overline">ENTER THE WHYS FOREST</span>
                    <h2 className="cta-title">Read the<br />full story</h2>
                    <div className="story-divider-ornament">◇</div>

                    <p className="cta-description">
                        Every child's education begins with a question. Join us on Tock's first big Whys Forest story to find out!
                    </p>

                    <div className="cta-book-card">
                        <img src={bookCoverImg} alt="The Whys Forest Book Cover" className="cta-book-cover" />
                        <h3 className="cta-book-title">The Whys Forest</h3>
                        <p className="cta-book-subtitle">How Tock Began Wondering & Asking Why</p>

                        <a href="#amazon" className="cta-amazon-btn">
                            Buy on Amazon
                        </a>
                        <span className="cta-shipping-note">In stock & fast shipping</span>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default OurStoryPage;