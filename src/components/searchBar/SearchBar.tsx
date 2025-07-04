import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import {
  clearProductList,
  fetchProductByQuery,
  updateSearchQuery,
} from "../../redux/slices/ProductSlice";
import { Product } from "../../redux/slices/ShoppingCartSlice";
import { useNavigate } from "react-router";
import "./searchBar.scss";

export function SearchBar() {
  const [text, setText] = useState("");
  const { items: products } = useAppSelector(
    (state: RootState) => state.product
  );
  const dispatch = useAppDispatch();
  const debouceText = useDebounce(text, 400);

  useEffect(() => {
    dispatch(updateSearchQuery(debouceText));
    if (debouceText.trim() === "") {
      dispatch(clearProductList());
    } else {
      dispatch(fetchProductByQuery(debouceText));
    }
  }, [debouceText]);

  return (
    <div className="relative">
      <div className="search-bar ">
        <input
          type="text"
          placeholder="Search products... "
          className="search-bar-input"
          onChange={(e) => setText(e.target.value.trim())}
        />
        <Search className="text-primary cursor-pointer" />
      </div>
      <ProductList products={products} />
    </div>
  );
}

function ProductList({ products }: { products: Product[] }) {
  const navigate = useNavigate();
  const handleClick = (id: number) => navigate(`/product/${id}`);

  return (
    <div className="search-list-wrapper">
      {products.map((item: Product) => (
        <div
          className="search-list"
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          <div className="product_img">
            <img src={item.thumbnail} alt={item.title} className="" />
          </div>
          <p className="product-title">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
