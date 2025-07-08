import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const {
    items: products,
    status: productStatus,
    searchQuery,
  } = useAppSelector((state) => state.product);
  const total = useAppSelector((state) => state.shoppingCart.total);
  const error = useAppSelector((state) => state.product.error);
  const { scrollRef, fetchMore, setFetchMore } = useOnScroll();

  const [skip, setSkip] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Initial load");
    dispatch(fetchProducts({ skip: 0 }));
    setSkip(0);
  }, [dispatch]);

  useEffect(() => {
    if (fetchMore && productStatus !== "loading" && !searchQuery) {
      dispatch(fetchProducts({ skip: skip + 10 }));
      setSkip((prevSkip) => prevSkip + 10);
      setFetchMore(false);
      scrollRef.current = false;
    }
  }, [
    fetchMore,
    productStatus,
    dispatch,
    skip,
    searchQuery,
    setFetchMore,
    scrollRef,
  ]);

  if (productStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="product-list" data-testid="product-list">
        <div className="flex gap-2 justify-between product-list-header">
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
              <div
                className="product-image-wrapper"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <h3
                className="product-card-title"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              >
                {product.title}
              </h3>
              <p>${product.price.toFixed(2)}</p>
              <p className="product-card-description">{product.description}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToCart(product));
                  total === 0 && fireConfetti();
                }}
                data-testid={`add-to-cart-${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
          {/* {products.length > 0 ? (
            <></>
          ) : (
            <div className="text-center">
              {status !== "loading" && <p> No products found</p>}
            </div>
          )} */}
        </div>

        <div>
          {productStatus === "succeeded" && products.length === 0 && (
            <p>No Product found</p>
          )}
        </div>
        <div>{productStatus === "loading" && <p>loading...</p>}</div>
      </div>
    </div>
  );
};

export default ProductList;
