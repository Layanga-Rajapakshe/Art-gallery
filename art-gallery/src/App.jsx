import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home";
import { NavbarDemo } from "./components/NavBar";
import ProductDetails from "./pages/ProductDetails";
import BrowseArtGallery from "./pages/Browse";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import "./App.css"; // Make sure this CSS file exists

export default function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {!hideNavAndFooter && <NavbarDemo />}
      <div className="app-background">
        <div className="glass-container">
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<BrowseArtGallery />} />
              <Route path="/productdetails/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}
