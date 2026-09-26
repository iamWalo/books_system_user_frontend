import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';
import blog1_img from '../../assets/blog_section_img.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { mediaUrl } from '../../api.js';

const blogData = [
  {
    id: 1,
    title: "Why Kids Ask 'Why' So Much",
    description: "A field guide to the question age what's really happening in your kid's brain between ages 3 and 7.",
    image: blog1_img
  },
  {
    id: 2,
    title: "Why Kids Ask 'Why' So Much",
    description: "A field guide to the question age what's really happening in your kid's brain between ages 3 and 7.",
    image: blog1_img
  },
  {
    id: 3,
    title: "Why Kids Ask 'Why' So Much",
    description: "A field guide to the question age what's really happening in your kid's brain between ages 3 and 7.",
    image: blog1_img
  },
  {
    id: 4,
    title: "Why Kids Ask 'Why' So Much",
    description: "A field guide to the question age what's really happening in your kid's brain between ages 3 and 7.",
    image: blog1_img
  },
  {
    id: 5,
    title: "Why Kids Ask 'Why' So Much",
    description: "A field guide to the question age what's really happening in your kid's brain between ages 3 and 7.",
    image: blog1_img
  }
];

const Blogs = ({ blogs = [] }) => {
  const blogsToDisplay = blogs.length > 0 ? blogs.slice(0, 5) : blogData;
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);

  // States to track active/disabled arrows
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollBounds();
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollBounds);
      return () => slider.removeEventListener('scroll', checkScrollBounds);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setDragScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    checkScrollBounds();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = dragScrollLeft - walk;
    checkScrollBounds();
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="blogs-section">
        <div className="blogs-header">
          <h2>Blogs</h2>
        </div>

        <div
          className={`blogs-slider ${isDragging ? 'active' : ''}`}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {blogsToDisplay.map((blog) => (
            <div className="blog-card" key={blog._id || blog.id}>
              <img src={mediaUrl(blog.bannerImage || blog.image) || blog1_img} alt={blog.title} className="blog-image" />
              <div className="blog-overlay" />
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <Link to={`/article?id=${blog._id || blog.id}`} className="blog-read-more">
                  <h4>Read More</h4>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="blogs-arrows">
          <button
            type="button"
            className="arrow-btn"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            type="button"
            className="arrow-btn"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>

    </>
  );
};

export default Blogs;