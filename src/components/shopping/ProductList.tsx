import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, Product } from "../../redux/slices/ShoppingCartSlice";
import { fetchProducts } from "../../redux/slices/ProductSlice";
import { useOnScroll } from "../../hooks/useOnScroll";
// @ts-ignore
import confetti from "canvas-confetti";
import ProductSearch from "../productSearch/ProductSearch";

const fireConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
  });
};

const ProductList = () => {
  const { items: products, searchQuery } = useAppSelector(
    (state) => state.product
  );
  const total = useAppSelector((state) => state.shoppingCart.total);
  const productStatus = useAppSelector((state) => state.product.status);
  const error = useAppSelector((state) => state.product.error);
  const { scrollRef, fetchMore, setFetchMore } = useOnScroll();

  const [skip, setSkip] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("Initial load");
    dispatch(fetchProducts({ skip: 0 }));
    setSkip(0);
  }, [dispatch, searchQuery]);

  useEffect(() => {
    if (fetchMore && productStatus !== "loading") {
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
        <div className="flex gap-2 justify-between">
          <h2>Available Products</h2>
          <ProductSearch />
        </div>
        <div className="products-grid">
          {products.map((product: Product) => (
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
