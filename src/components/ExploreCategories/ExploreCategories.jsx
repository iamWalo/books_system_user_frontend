import React from 'react';
import './ExploreCategories.css';
import category_img from '../../assets/categories_img.svg';
const categories = [
  {
    id: 1,
    title: 'THE NATURAL WORLD',
    subtitle: 'Nature, earth & animals',
    image: category_img
  },
  {
    id: 2,
    title: 'HOW THINGS WORK',
    subtitle: 'Space, tech & the body',
    image: category_img
  },
  {
    id: 3,
    title: 'MIND & REST',
    subtitle: 'Sleep, Mental & Learning',
    image: category_img
  },
  {
    id: 4,
    title: 'PEOPLE & PLACES',
    subtitle: 'History, Traditions & words',
    image: category_img
  },
];

const ExploreCategories = () => {
  return (
    <section className="categories-container">
      {/* Header */}
      <div className="categories-header">
        {/* <span className="diamond-icon"><img src="../assets/newrelease_logo.svg" alt="" /></span> */}
        <h2>Explore By Categories</h2>
        <h3>Pick a world to wander into; every one is full of whys</h3>
      </div>

      {/* Stacked Cards List (1 card per row) */}
      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            {/* Image Container */}
            <div className="category-image-wrapper">
              <img
                src={category.image}
                alt={category.title}
                className="category-image"
              />
              <div className="category-overlay" />
            </div>

            {/* Text Overlay Content */}
            <div className="category-content">
              <h3 className="category-title">{category.title}</h3>
              <p className="category-subtitle">{category.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCategories;