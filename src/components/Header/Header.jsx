import React, { useState } from 'react';
import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MobileMenu from '../MobileMenu/MobileMenu';
import title_logo from "../../assets/header_title.svg"


const Header = () => {
  // State bash n-tḥkkmu f l-menu (mḥlūl / msddūd)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-container">
      {/* Icon dyal Hamburger - Click y-ḥel l-menu */}
      <div
        className="menu-icon-btn"
        onClick={() => setIsMenuOpen(true)}
        role="button"
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Logo */}
      <img src={title_logo} alt="Header Title" className="header-logo" />

      {/* Search Icon */}
      <div className="search-icon-btn">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Header;