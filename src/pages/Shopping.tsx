import React from "react";
import ProductList from "../components/shopping/ProductList";
import ShoppingCart from "../components/shopping/ShoppingCart";
import "./shopping.scss";

const ShoppingPage: React.FC = () => {
  return (
    <div className="shopping-page-container">
      <div className="shopping-page">
        <h1>Shopping App</h1>
        <div className="shopping-container">
          <ProductList />
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
