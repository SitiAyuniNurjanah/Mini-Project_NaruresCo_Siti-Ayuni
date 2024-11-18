import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EcoTips from "./pages/EcoTips";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import Catalog from "./pages/Catalog";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import DetailProduct from "./pages/DetailProduct";
import CartPage from "./pages/Cart";
import Dashboard from "./components/admin/Dashboard";
import FormProduct from "./components/admin/FormProduct";
import TableProduct from "./components/admin/TableProduct";
// import SuccessPage from "./pages/SuccessPages";
import FormCategory from "./components/admin/FormCategory";
import TableCategory from "./components/admin/TableCategory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/daily-tips" element={<EcoTips />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/catalog" element={<Catalog />} />
        {/* <Route path="/success" element={<SuccessPage />} /> */}
        <Route
          path="/detail/:productId"
          element={
            <ProtectedRoute>
              <DetailProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <FormProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/table-product"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <TableProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form-category"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <FormCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/table-category"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <TableCategory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
