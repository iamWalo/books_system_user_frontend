import "./BestSelling.css"
import bestselling from "../../assets/bestselling_img.svg"
import { getImageUrl } from "../../api.js"

const BestSelling = ({ products = [] }) => {
  const booksToDisplay = products
    .filter((product) => product.status === "Active" && product.categories?.includes("best_selling"))
    .slice(0, 3)
    .map((product) => ({
      id: product._id || product.id,
      title: product.name,
      subtitle: product.subtitle || '',
      image: getImageUrl(product.productImages?.[0]) || bestselling
    }));

  return (
    <section className="bestselling-container">
      {/* Header */}
      <div className="bestselling-header">
        {/* <span className="diamond-icon">❖</span> */}
        <h2>Best Selling</h2>
        <h3>The titles curious readers keep coming back to</h3>
      </div>

      {/* Stacked Cards (1 per row) */}
      <div className="bestselling-list">
        {booksToDisplay.length ? booksToDisplay.map((book) => (
          <div key={book.id} className="bestselling-card">
            {/* Image Container */}
            <div className="bestselling-image-wrapper">
              <img
                src={book.image}
                alt={book.title}
                className="bestselling-image"
                onError={(event) => {
                  if (event.currentTarget.dataset.fallbackApplied) return;
                  event.currentTarget.dataset.fallbackApplied = 'true';
                  event.currentTarget.src = bestselling;
                }}
              />
            </div>
            {/* Typography */}
            <h3 className="bestselling-title">{book.title}</h3>
            <p className="bestselling-subtitle">{book.subtitle}</p>
          </div>
        )) : <p>No best sellers are available right now.</p>}
      </div>
    </section>
  );
};

export default BestSelling;