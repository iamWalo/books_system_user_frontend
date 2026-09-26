import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewRelease.css';
import newrelease_book_img from '../../assets/newrelease_book_img.svg';
import { getProducts, mediaUrl } from '../../api';

const NewRelease = ({ products: propsProducts = [] }) => {
  const [products, setProducts] = useState(propsProducts);
  const [loading, setLoading] = useState(propsProducts.length === 0);

  useEffect(() => {
    if (propsProducts.length > 0) {
      setProducts(propsProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [propsProducts]);

  // Image helper function using api.js mediaUrl
  const getProductImage = (product) => {
    const rawImage = product?.productImages?.[0] || product?.image;
    if (!rawImage) return newrelease_book_img;
    return mediaUrl(rawImage);
  };

  const defaultBooks = [
    {
      id: 1,
      title: 'The Whys Book Of Time',
      description: 'A thoughtful and engaging read for curious minds.',
      price: '18.99$',
      image: newrelease_book_img
    },
    {
      id: 2,
      title: 'The Whys Book Of Time',
      description: 'A thoughtful and engaging read for curious minds.',
      price: '18.99$',
      image: newrelease_book_img
    },
    {
      id: 3,
      title: 'The Whys Book Of Time',
      description: 'A thoughtful and engaging read for curious minds.',
      price: '18.99$',
      image: newrelease_book_img
    }
  ];

  const books = products.length > 0 ? products.slice(0, 3).map((product) => ({
    id: product._id || product.id,
    title: product.name || product.title,
    description: product.description
      ? product.description.replace(/<[^>]*>?/gm, '')
      : 'A thoughtful and engaging read for curious minds.',
    price: `${product.price}$`,
    image: getProductImage(product)
  })) : defaultBooks;

  return (
    <section className="new-release-container">
      {/* Header Badge */}
      <div className="new-release-header">
        <h2>New Release</h2>
        <h3>Fresh off the press and ready for the next big question</h3>
      </div>

      {/* Grid Layout */}
      <div className="books-grid">
        {books.map((book, index) => (
          <Link
            to={`/product?id=${book.id}`}
            key={book.id}
            className={`book-card ${index === 2 ? 'centered-card' : ''}`}
          >
            <div className="image-card-box">
              <img
                src={book.image}
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = newrelease_book_img;
                }}
              />
            </div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-subtitle">{book.description}</p>
            <span className="book-price">{book.price}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewRelease;