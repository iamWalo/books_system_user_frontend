import { Link } from 'react-router-dom';
import './ExploreCategories.css';
import category_img from '../../assets/categories_img.svg';
import { getImageUrl } from '../../api';

const ExploreCategories = ({ categories: propsCategories = [] }) => {
  const getCategoryImage = (category) => {
    const rawImage = category?.image;
    if (!rawImage) return category_img;
    return getImageUrl(rawImage);
  };

  const categoriesToDisplay = propsCategories.map((category) => ({
    id: category._id || category.id,
    title: category.name || category.title,
    subtitle: category.description || category.subtitle || '',
    image: getCategoryImage(category)
  }));

  return (
    <section className="categories-container">
      {/* Header */}
      <div className="categories-header">
        <h2>Explore By Categories</h2>
        <h3>Pick a world to wander into; every one is full of whys</h3>
      </div>

      {/* Stacked Cards List (1 card per row) */}
      <div className="categories-list">
        {categoriesToDisplay.length ? categoriesToDisplay.map((category) => (
          <div key={category.id} className="category-card">
            {/* Image Container */}
            <Link to={`/categories?id=${category.id}`} state={{ categoryImage: category.image }} className="category-image-wrapper">
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
            <Link to={`/categories?id=${category.id}`} state={{ categoryImage: category.image }} className="category-image-wrapper">
              <div className="category-content">
                <h3 className="category-title">{category.title}</h3>
                <p className="category-subtitle">{category.subtitle}</p>
              </div>
            </Link>
          </div>
        )) : <p>No categories are available right now.</p>}
      </div>
    </section>
  );
};

export default ExploreCategories;