import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePages from './pages/HomePages';
import About from "./pages/About";
import Contact from "./pages/Contact";
import EcoTips from "./pages/EcoTips";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import Catalog from "./pages/Catalog";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import DetailProduct from "./pages/DetailProduct";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/about" element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/daily-tips" element={<EcoTips />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/detail/:productId"
          element={
            <ProtectedRoute>
              <DetailProduct />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  )
}

export default App;