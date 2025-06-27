import { Search } from "lucide-react";
import "./App.css";
import { useState } from "react";

function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample data for new arrivals
  const newArrivals = [
    {
      id: 1,
      name: "Minimalist Tote Bag",
      price: "$45.00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Classic White Sneakers",
      price: "$65.00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Linen Summer Dress",
      price: "$78.00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Slim Fit Jeans",
      price: "$59.00",
      image: "https://via.placeholder.com/150",
    },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      text: "Absolutely love the quality and style of everything I've purchased!",
      author: "Sarah M.",
    },
    {
      id: 2,
      text: "Fast shipping and the products exceed my expectations every time.",
      author: "James L.",
    },
  ];

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">ELEGANCE</div>
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <Search className="text-primary cursor-pointer" />
        </div>
        <div className="nav-links">
          <a href="#men">Men</a>
          <a href="#women">Women</a>
          <a href="#kids">Kids</a>
          <a href="#accessories">Accessories</a>
        </div>
        <div className="cart-icon">
          <span>🛒</span>
          <span className="cart-count">0</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Summer Collection 2025</h1>
          <p>Discover timeless elegance with our new arrivals</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div
            className="category-card"
            onClick={() => setActiveCategory("clothing")}
          >
            <div className="category-icon">👕</div>
            <h3>Clothing</h3>
          </div>
          <div
            className="category-card"
            onClick={() => setActiveCategory("shoes")}
          >
            <div className="category-icon">👟</div>
            <h3>Shoes</h3>
          </div>
          <div
            className="category-card"
            onClick={() => setActiveCategory("accessories")}
          >
            <div className="category-icon">👜</div>
            <h3>Accessories</h3>
          </div>
          <div
            className="category-card"
            onClick={() => setActiveCategory("beauty")}
          >
            <div className="category-icon">✨</div>
            <h3>Beauty</h3>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="product-grid">
          {newArrivals.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-indicators">
        <div className="trust-item">
          <div className="trust-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="trust-item">
          <div className="trust-icon">🔒</div>
          <h3>Secure Checkout</h3>
          <p>Safe & protected</p>
        </div>
        <div className="trust-item">
          <div className="trust-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>30 day return policy</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <div className="footer-column">
            <h3>About Us</h3>
            <a href="#about">Our Story</a>
            <a href="#sustainability">Sustainability</a>
            <a href="#careers">Careers</a>
          </div>
          <div className="footer-column">
            <h3>Customer Service</h3>
            <a href="#contact">Contact Us</a>
            <a href="#faq">FAQ</a>
            <a href="#shipping">Shipping & Returns</a>
          </div>
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#instagram">📷</a>
              <a href="#facebook">👤</a>
              <a href="#twitter">🐦</a>
              <a href="#pinterest">📌</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© 2023 ELEGANCE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const App = () => {
  return <Home />;
};

export default App;
