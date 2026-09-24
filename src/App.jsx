import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Hero from './components/Hero/Hero.jsx'
import Welcome from './components/Welcome/Welcome.jsx'
import NewRelease from './components/NewRelease/NewRelease.jsx'
import ExploreCategories from './components/ExploreCategories/ExploreCategories.jsx'
import BestSelling from './components/BestSelling/BestSelling.jsx'
import FAQ from './components/FAQ/FAQ.jsx'
import Subscribe from './components/Subscribe/Subscribe.jsx'
import Blog from './components/Blog/Blog.jsx'
import CategoriePage from './Page/CategoriePage/CategoriePage.jsx'
import AllCategoriesPage from './Page/AllCategoriesPage/AllCategoriesPage.jsx'
import SeriesPage from './Page/SeriesPage/SeriesPage.jsx'
import Features from './components/Features/Features.jsx'
import './App.css'
import ProductPage from './Page/ProductPage/ProductPage.jsx'
import { BlogsPage } from './Page/BlogsPage/BlogsPage.jsx'
import PageLayout from './components/PageLayout/PageLayout.jsx'

const Home = () => {
  return (
    <>
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
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/categories" element={<PageLayout breadcrumbItems={['🏠 Home', 'Categories', "Children's Books"]}><CategoriePage /></PageLayout>} />
        <Route path="/all-categories" element={<PageLayout breadcrumbItems={['🏠 Home', 'Categories', "Children's Books"]}><AllCategoriesPage /></PageLayout>} />
        <Route path="/series" element={<PageLayout breadcrumbItems={['🏠 Home', 'Series', "Children's Books"]}><SeriesPage /></PageLayout>} />
        <Route path="/product" element={<PageLayout breadcrumbItems={['🏠 Home', 'Categories', "Children's Books"]}><ProductPage /></PageLayout>} />
        <Route path="/blogs" element={<PageLayout breadcrumbItems={['🏠 Home', 'Series', "Children's Books"]}><BlogsPage /></PageLayout>} />
      </Routes>
    </Router>
  )
}

export default App