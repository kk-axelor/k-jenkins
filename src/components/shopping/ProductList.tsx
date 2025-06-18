import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/ShoppingCartSlice";
import { fetchProducts } from "../../redux/slices/ProductSlice";

const ProductList = () => {
  const products = useAppSelector((state) => state.product.items);
  const productStatus = useAppSelector((state) => state.product.status);
  const error = useAppSelector((state) => state.product.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return <div>Loading products...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="product-list" data-testid="product-list">
        <h2>Available Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              data-testid="product-item"
            >
              <div className="product-image-wrapper">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <h3 className="product-card-title">{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p className="product-card-description">{product.description}</p>
              <button
                onClick={() => dispatch(addToCart(product))}
                data-testid={`add-to-cart-${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
