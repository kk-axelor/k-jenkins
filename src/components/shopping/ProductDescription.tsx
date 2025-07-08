import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/ShoppingCartSlice";
import { useEffect } from "react";
import { fetchProductById } from "../../redux/slices/ProductSlice";
import "./ProductDescription.scss";
import { useTheme } from "../../hooks/useTheme";

const ProductDescription = () => {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedProduct, status, error } = useAppSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id)));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <div className="loading">Loading product details...</div>;
  }

  if (status === "failed" || !selectedProduct) {
    return <div className="error">Error: {error || "Product not found"}</div>;
  }

  const discountedPrice =
    selectedProduct.price * (1 - selectedProduct.discountPercentage / 100);

  return (
    <div className="product-description" data-theme={theme}>
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Products
      </button>

      <div className="product-detail-container">
        <div className="product-images">
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="main-image"
          />
          <div className="image-gallery">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${selectedProduct.title} ${index + 1}`}
                className="gallery-image"
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{selectedProduct.title}</h1>
          <p className="brand">{selectedProduct.brand}</p>
          <div className="rating">
            <span>⭐ {selectedProduct.rating}</span>
            <span className="stock">Stock: {selectedProduct.stock}</span>
          </div>

          <div className="pricing">
            <span className="current-price">${discountedPrice.toFixed(2)}</span>
            {selectedProduct.discountPercentage > 0 && (
              <>
                <span className="original-price">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                <span className="discount">
                  -{selectedProduct.discountPercentage}%
                </span>
              </>
            )}
          </div>

          <p className="description">{selectedProduct.description}</p>

          <div className="product-details">
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>
            <p>
              <strong>SKU:</strong> {selectedProduct.sku}
            </p>
            <p>
              <strong>Weight:</strong> {selectedProduct.weight}g
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {selectedProduct.availabilityStatus}
            </p>
            <p>
              <strong>Warranty:</strong> {selectedProduct.warrantyInformation}
            </p>
            <p>
              <strong>Shipping:</strong> {selectedProduct.shippingInformation}
            </p>
            <p>
              <strong>Return Policy:</strong> {selectedProduct.returnPolicy}
            </p>
          </div>

          <button
            onClick={() => dispatch(addToCart(selectedProduct))}
            className="add-to-cart-btn"
            disabled={selectedProduct.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          {selectedProduct.reviews.map((review, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <span className="reviewer-name">{review.reviewerName}</span>
                <span className="review-rating">⭐ {review.rating}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <span className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
