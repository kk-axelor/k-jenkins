import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/ShoppingCartSlice";
import { fetchProducts } from "../../redux/slices/ProductSlice";
import { useOnScroll } from "../../hooks/useOnScroll";
// @ts-ignore
import confetti from "canvas-confetti";
import { stat } from "fs";

const fireConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
  });
};

const ProductList = () => {
  const products = useAppSelector((state) => state.product.items);
  const total = useAppSelector((state) => state.shoppingCart.total);
  const productStatus = useAppSelector((state) => state.product.status);
  const error = useAppSelector((state) => state.product.error);
  const [skip, setSkip] = useState(0);
  const dispatch = useAppDispatch();
  const { scrollRef, fetchMore, setFetchMore } = useOnScroll();

  useEffect(() => {
    console.log("Initial load");
    dispatch(fetchProducts({ skip: 0 }));
  }, [dispatch]);

  useEffect(() => {
    if (fetchMore && productStatus !== "loading") {
      console.log("Loading more data, skip:", skip + 10);
      dispatch(fetchProducts({ skip: skip + 10 }));
      setSkip((prevSkip) => prevSkip + 10);
      setFetchMore(false);
      scrollRef.current = false;
    }
  }, [fetchMore, productStatus, dispatch, skip]);

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
                onClick={() => {
                  dispatch(addToCart(product));
                  total === 0 && fireConfetti();
                }}
                data-testid={`add-to-cart-${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <div>{productStatus === "loading" && <p>loading...</p>}</div>
      </div>
    </div>
  );
};

export default ProductList;
