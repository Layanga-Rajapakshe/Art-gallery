import { Routes, Route } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}