import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Notes from "./components/Notes";
import ShoppingPage from "./pages/Shopping";
import { useState } from "react";

function Home() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"notes" | "shopping">("notes");

  return (
    <div className="home-container">
      <h1>Welcome, {user}</h1>

      <div className="tabs">
        <button
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => setActiveTab("notes")}
          data-testid="notes-tab"
        >
          Notes
        </button>
        <button
          className={activeTab === "shopping" ? "active" : ""}
          onClick={() => setActiveTab("shopping")}
          data-testid="shopping-tab"
        >
          Shopping
        </button>
      </div>

      {activeTab === "notes" ? <Notes /> : <ShoppingPage />}

      <button onClick={logout}>Logout</button>
    </div>
  );
}
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Provider>
  );
};

const Main = () => {
  const { user } = useAuth();

  return user ? <Home /> : <Login />;
};

export default App;
