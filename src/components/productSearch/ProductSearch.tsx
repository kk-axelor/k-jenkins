import React, { use, useEffect, useState } from "react";
import "./productSearch.scss";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../redux/hooks";
import {
  clearProductList,
  fetchProductByQuery,
  fetchProducts,
  updateSearchQuery,
} from "../../redux/slices/ProductSlice";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouceText = useDebounce(searchTerm, 500);
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());
  };

  useEffect(() => {
    dispatch(updateSearchQuery(debouceText));
    if (debouceText.trim() === "") {
      dispatch(clearProductList());
      dispatch(fetchProducts({ skip: 0 }));
    } else {
      dispatch(fetchProductByQuery(debouceText));
    }
  }, [debouceText]);

  return (
    <div className="product-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="search-button">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductSearch;
