import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExploreCategories.css';
import category_img from '../../assets/categories_img.svg';
import { getCategories, mediaUrl } from '../../api';

const defaultCategories = [
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

const ExploreCategories = ({ categories: propsCategories = [] }) => {
  const [categories, setCategories] = useState(propsCategories);
  const [loading, setLoading] = useState(propsCategories.length === 0);

  useEffect(() => {
    if (propsCategories.length > 0) {
      setCategories(propsCategories);
      setLoading(false);
      return;
    }

    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [propsCategories]);

  // Image helper function using api.js mediaUrl
  const getCategoryImage = (category) => {
    const rawImage = category?.image || category?.coverImage || category?.bannerImage;
    if (!rawImage) return category_img;
    return mediaUrl(rawImage);
  };

  const categoriesToDisplay = categories.length > 0 ? categories.map((category) => ({
    id: category._id || category.id,
    title: category.name || category.title,
    subtitle: category.description || category.subtitle || '',
    // image: getCategoryImage(category)
  })) : defaultCategories;

  return (
    <section className="categories-container">
      {/* Header */}
      <div className="categories-header">
        <h2>Explore By Categories</h2>
        <h3>Pick a world to wander into; every one is full of whys</h3>
      </div>

      {/* Stacked Cards List (1 card per row) */}
      <div className="categories-list">
        {categoriesToDisplay.map((category) => (
          <div key={category.id} className="category-card">
            {/* Image Container */}
            <Link to="/categories" className="category-image-wrapper">
              <img
                src={category.image}
                alt={category.title}
                className="category-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = category_img;
                }}
              />
              <div className="category-overlay" />
            </Link>
            <Link to="/categories" className="category-image-wrapper">
              <div className="category-content">
                <h3 className="category-title">{category.title}</h3>
                <p className="category-subtitle">{category.subtitle}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCategories;