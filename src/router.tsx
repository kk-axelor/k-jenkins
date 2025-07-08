import { Provider } from "react-redux";
import { createBrowserRouter, Outlet } from "react-router";
import { store } from "./redux/store";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Navbar from "./components/navbar/Navbar";
import ShoppingPage from "./pages/Shopping";
import Login from "./pages/Login";
import ProductDescription from "./components/shopping/ProductDescription";
import { ThemeContextProvider } from "./context/ThemeContext";

const AppLayout = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <AuthProvider>
          <Navbar />
          <Outlet />
        </AuthProvider>
      </ThemeContextProvider>
    </Provider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "shopping",
        element: <ShoppingPage />,
      },
      {
        path: "product/:id",
        element: <ProductDescription />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
