import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Centure from './components/Centure/Centure.jsx'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import Welcome from './components/Welcome/Welcome.jsx'
import NewRelease from './components/NewRelease/NewRelease.jsx'
import ExploreCategories from './components/ExploreCategories/ExploreCategories.jsx'
import BestSelling from './components/BestSelling/BestSelling.jsx'
import FAQ from './components/FAQ/FAQ.jsx'
import Subscribe from './components/Subscribe/Subscribe.jsx'
import Footer from './components/Footer/Footer.jsx'
import Blog from './components/Blog/Blog.jsx'
import CategoriePage from './Page/CategoriePage/CategoriePage.jsx'
import AllCategoriesPage from './Page/AllCategoriesPage/AllCategoriesPage.jsx'
import SeriesPage from './Page/SeriesPage/SeriesPage.jsx'
import Features from './components/Features/Features.jsx'
import './App.css'
import ProductPage from './Page/ProductPage/ProductPage.jsx'

const Home = () => {
  return (
    <>
      <Centure />
      <Header />
      {/* <img className='hero_line' src="../src/assets/hero_line.svg" alt="" /> */}
      <Hero />
      <Features />
      <Welcome />
      <NewRelease />
      <ExploreCategories />
      <BestSelling />
      <Blog />
      <FAQ />
      <Subscribe />
      <Footer />
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriePage />} />
        <Route path="/all-categories" element={<AllCategoriesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </Router>
  )
}

export default App