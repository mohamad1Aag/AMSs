import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ThemeContext } from "./ThemeContext";

import Home from "./components/Home";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Business from "./components/Business";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import UserEditProfile from "./components/UserProfile/UserEditProfile";
import ProductList from "./components/Cart/ProductList.jsx";
import Cart from "./components/Cart/Cart.jsx";

import AdminDash from "../admin-dashboard/src/components/AdminDash.jsx";
import User from "../admin-dashboard/src/pages/Users/User";
import Product from "../admin-dashboard/src/pages/Products/Products.jsx";
import ListProducts from "../admin-dashboard/src/pages/Products/ListProducts";
import AddProduct from "../admin-dashboard/src/pages/Products/AddProduct.jsx";
import Category from "../admin-dashboard/src/pages/Categories/Category.jsx";
import Orders from "../admin-dashboard/src/Orders/Orders.jsx";
import Reports from "../admin-dashboard/src/Reports/Reports.jsx";
import Settings from "../admin-dashboard/src/Settings/Settings.jsx";
import Login from "../admin-dashboard/src/components/Login";

import SectionDetails from "./components/SectionDetails";
import CaptainDashboard from "../captian/CaptainDashboard";
import CaptainLogin from "../captian/CaptainLogin";
import CaptainRegister from "../captian/CaptainRegister";  // <<-- أضفت هنا
import MyOrders from "./components/UserProfile/MyOrders";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "./i18n";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // أدمن
  const [userAuthenticated, setUserAuthenticated] = useState(false); // مستخدم عادي
  const [captainAuthenticated, setCaptainAuthenticated] = useState(false); // كابتن

  const { i18n } = useTranslation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    setUserAuthenticated(!!localStorage.getItem("userToken"));
    setCaptainAuthenticated(!!localStorage.getItem("captainToken"));
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("userToken");
    setUserAuthenticated(false);
  };

  const handleCaptainLogout = () => {
    localStorage.removeItem("captainToken");
    setCaptainAuthenticated(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  // حماية راوت الكابتن
  const CaptainProtectedRoute = ({ children }) => {
    if (!captainAuthenticated) {
      return <Navigate to="/captain/login" replace />;
    }
    return children;
  };

  return (
    <>
      {/* تسجيل الخروج للأدمن */}
      {isAuthenticated && (
        <div className="p-4 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            title="تسجيل خروج الأدمن"
          >
            🔓 تسجيل خروج الأدمن
          </button>
        </div>
      )}

      {/* تسجيل الخروج للمستخدم */}
      {userAuthenticated && !isAuthenticated && (
        <div className="p-4 text-center">
          <button
            onClick={handleUserLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            title="تسجيل خروج المستخدم"
          >
            🔓 تسجيل خروج المستخدم
          </button>
        </div>
      )}

      {/* تسجيل الخروج للكابتن */}
      {captainAuthenticated && (
        <div className="p-4 text-center">
          <button
            onClick={handleCaptainLogout}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
            title="تسجيل خروج الكابتن"
          >
            🔓 تسجيل خروج الكابتن
          </button>
        </div>
      )}

      <BrowserRouter>
        <Routes>
          {/* صفحات عامة */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business" element={<Business />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/UserEditProfile" element={<UserEditProfile />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />

          {/* تسجيل دخول الأدمن */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* تسجيل دخول الكابتن */}
          <Route path="/captain/login" element={<CaptainLogin />} />
          {/* تسجيل كابتن جديد */}
          <Route path="/captain/register" element={<CaptainRegister />} />

          {/* صفحات الأدمن محمية */}
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
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
          />
          <Route
            path="/list-sections"
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-product"
            element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={isAuthenticated ? <ListProducts /> : <Navigate to="/login" />}
          />

          {/* صفحة تفاصيل القسم */}
          <Route path="/section/:id" element={<SectionDetails />} />

          {/* لوحة تحكم الكابتن محمية */}
          <Route
            path="/CaptainDashboard"
            element={
              <CaptainProtectedRoute>
                <CaptainDashboard />
              </CaptainProtectedRoute>
            }
          />

          {/* صفحة طلبات المستخدم */}
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
