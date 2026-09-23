import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'All Categories', path: '/all-categories' },
    { name: 'Series', path: '/series' },
    { name: 'Products', path: '/products' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Blogs', path: '/blogs' },
  ];

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="menu-close-btn" onClick={onClose} aria-label="Close menu">
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <nav className="menu-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={activeItem === item.name ? 'active' : ''}
                  onClick={() => {
                    setActiveItem(item.name);
                    onClose();
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="https://amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="menu-amazon-btn"
        >
          <FontAwesomeIcon icon={faShoppingBag} className="btn-icon" />
          Buy on Amazon
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;