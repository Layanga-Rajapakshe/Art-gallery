import { Routes, Route } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home";
import { NavbarDemo } from "./components/NavBar";
import BuyProduct from "./pages/BuyProduct";
import BrowseArtGallery from "./pages/Browse";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import "./App.css"; // Make sure to create this CSS file
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <div>
      <NavbarDemo />
    <div className="app-background">
      <div className="glass-container">
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseArtGallery />} />
            <Route path="/productdetails" element={<BuyProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}