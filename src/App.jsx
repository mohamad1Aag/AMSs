import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Home from "./components/Home";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Business from "./components/Business";
import AdminDash from '../admin-dashboard/src/components/AdminDash.jsx';
import User from "../admin-dashboard/src/pages/Users/User";
import Product from "../admin-dashboard/src/pages/Products/Products.jsx";
import Category from "../admin-dashboard/src/pages/Categories/Category.jsx";
import Orders from "../admin-dashboard/src/Orders/Orders.jsx";
import Reports from "../admin-dashboard/src/Reports/Reports.jsx";
import Settings from "../admin-dashboard/src/Settings/Settings.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import ProductList from "./components/Cart/ProductList.jsx";
import ListProducts  from "../admin-dashboard/src/pages/Products/ListProducts";
import AddProduct from "../admin-dashboard/src/pages/Products/AddProduct.jsx";

import Login from '../admin-dashboard/src/components/Login'; // تسجيل دخول الأدمن
import SectionDetails from './components/SectionDetails'; // الصفحة اللي بدنا نعملها
 // تسجيل دخول الأدمن


function App() {
  // حالة تسجيل دخول الأدمن
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      {isAuthenticated && (
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <button onClick={handleLogout}>🔓 تسجيل الخروج</button>
        </div>
      )}

      <Routes>
        {/* صفحات عامة */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/business" element={<Business />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/ProductList" element={<ProductList />} />

        {/* تسجيل دخول الأدمن */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* لوحة تحكم الأدمن محمية */}
        <Route
          path="/AdminDash"
          element={isAuthenticated ? <AdminDash /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <User /> : <Navigate to="/login" />}
        />
        <Route
          path="/Product"
          element={isAuthenticated ? <Product /> : <Navigate to="/login" />}
        />
        <Route
          path="/Category"
          element={isAuthenticated ? <Category /> : <Navigate to="/login" />}
        />
        <Route
          path="/Orders"
          element={isAuthenticated ? <Orders /> : <Navigate to="/login" />}
        />
        <Route
          path="/Reports"
          element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/Settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-section"
          element={isAuthenticated ? <Settings /> : <Navigate to="/AddSection" />}
        />
        <Route
          path="/list-sections"
          element={isAuthenticated ? <Settings /> : <Navigate to="/ListSections" />}
        />
        <Route
          path="/add-product"
          element={isAuthenticated ? <AddProduct  /> : <Navigate to="/add-product" />}
        />
        <Route
          path="/products"
          element={isAuthenticated ? <ListProducts /> : <Navigate to="/products" />}
        />
          <Route path="/section/:id" element={<SectionDetails />} />
      
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
