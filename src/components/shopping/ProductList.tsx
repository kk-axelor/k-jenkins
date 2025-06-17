import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/ShoppingCartSlice";

const ProductList = () => {
  const products = useAppSelector((state) => state.product.items);
  const dispatch = useAppDispatch();
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
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p>{product.description}</p>
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
