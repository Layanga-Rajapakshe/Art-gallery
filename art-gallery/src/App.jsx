import { Routes, Route } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Home";
import { NavbarDemo } from "./components/NavBar";

export default function App() {
  return (
    <div>
    <NavbarDemo />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
    </Routes>
    </div>
  )
}