// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useAuth } from "../../context/AuthContext";
import { toogleCart } from "../../redux/slices/ShoppingCartSlice";
import { AppDispatch } from "../../redux/store";
import "./navbar.scss";
import { useTheme } from "../../hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import "./navbar.scss";

const Navbar: React.FC = () => {
  const { items } = useAppSelector((state) => state.shoppingCart);
  const { theme, toogleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();

  const cartItemCount = items.length;

  return (
    <nav className="navbar" data-theme={theme}>
      <div className="navbar-brand">
        <Link to="/">Shopping App</Link>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/shopping" className="navbar-item">
          Shop
        </Link>
        <CartBtn dispatch={dispatch} cartItemCount={cartItemCount} />
        <button onClick={toogleTheme} className="theme-btn">
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="user-menu">
            <span>Welcome, {user}</span>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

const CartBtn = ({
  dispatch,
  cartItemCount,
}: {
  dispatch: AppDispatch;
  cartItemCount: number;
}) => {
  return (
    <button
      className="navbar-item cart-btn"
      onClick={() => dispatch(toogleCart())}
    >
      Cart ({cartItemCount})
    </button>
  );
};

export default Navbar;
