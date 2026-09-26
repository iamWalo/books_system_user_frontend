import { useEffect, useLayoutEffect, useState } from 'react'
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
import { OneBlogPage } from './Page/OneBlogPage/OneBlogPage.jsx'
import {
  getBlogCategories,
  getBlogs,
  getCategories,
  getProducts,
  getSeries,
} from './api.js'

const Home = ({ products, categories, blogs }) => {
  return (
    <>
      {/* <img className='hero_line' src="../src/assets/hero_line.svg" alt="" /> */}
      <Hero />
      <Features />
      <Welcome />
      <NewRelease products={products} />
      <ExploreCategories categories={categories} />
      <BestSelling products={products} />
      <Blog blogs={blogs} />
      <FAQ />
      <Subscribe />
    </>
  )
}

const ScrollToTopOnLoad = () => {
  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    return () => {
      window.history.scrollRestoration = 'auto'
    }
  }, [])

  return null
}

const App = () => {
  const [data, setData] = useState({ products: [], categories: [], series: [], blogs: [], blogCategories: [] })

  useEffect(() => {
    Promise.all([getProducts(), getCategories(), getSeries(), getBlogs(), getBlogCategories()])
      .then(([products, categories, series, blogs, blogCategories]) => {
        setData({ products, categories, series, blogs, blogCategories })
      })
      .catch((error) => {
        console.error('Unable to load API data', error)
      })
  }, [])

  return (
    <Router>
      <ScrollToTopOnLoad />
      <Routes>
        <Route path="/" element={<PageLayout><Home products={data.products} categories={data.categories} blogs={data.blogs} /></PageLayout>} />
        <Route path="/categories" element={<PageLayout breadcrumbItems={['🏠 Home', 'Categories', "Children's Books"]}><CategoriePage categories={data.categories} /></PageLayout>} />
        <Route path="/all-categories" element={<PageLayout breadcrumbItems={['🏠 Home', 'Categories', "Children's Books"]}><AllCategoriesPage categoriesData={data.categories} /></PageLayout>} />
        <Route path="/series" element={<PageLayout breadcrumbItems={['🏠 Home', 'Series', "Children's Books"]}><SeriesPage seriesData={data.series} /></PageLayout>} />
        <Route path="/product" element={<PageLayout breadcrumbItems={['🏠 Home', 'Categories', "Children's Books"]}><ProductPage products={data.products} /></PageLayout>} />
        <Route path="/blogs" element={<PageLayout breadcrumbItems={['🏠 Home', 'Series', "Children's Books"]}><BlogsPage blogsData={data.blogs} blogCategories={data.blogCategories} /></PageLayout>} />
        <Route path="/article" element={<PageLayout breadcrumbItems={['🏠 Home', 'Series', "Children's Books"]}><OneBlogPage blogsData={data.blogs} categories={data.categories} blogCategories={data.blogCategories} /></PageLayout>} />
      </Routes>
    </Router>
  )
}

export default App