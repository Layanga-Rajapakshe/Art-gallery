import { Routes, Route } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home";
import { NavbarDemo } from "./components/NavBar";
import Browse from "./pages/Browse";
import BuyProduct from "./pages/BuyProduct";

export default function App() {
  return (
    <div>
      <div>
    <NavbarDemo />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/productdetails" element={<BuyProduct />} />
    </Routes>
    </div>
    <div>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </div>
    </div>
  )
}