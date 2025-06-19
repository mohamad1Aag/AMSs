// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from 'react';

// import Home from "./components/Home";
// import Services from "./components/Services";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Business from "./components/Business";
// import AdminDash from '../admin-dashboard/src/components/AdminDash.jsx';
// import User from "../admin-dashboard/src/pages/Users/User";
// import Product from "../admin-dashboard/src/pages/Products/Products.jsx";
// import Category from "../admin-dashboard/src/pages/Categories/Category.jsx";
// import Orders from "../admin-dashboard/src/Orders/Orders.jsx";
// import Reports from "../admin-dashboard/src/Reports/Reports.jsx";
// import Settings from "../admin-dashboard/src/Settings/Settings.jsx";
// import UserProfile from "./components/UserProfile/UserProfile.jsx";
// import ProductList from "./components/Cart/ProductList.jsx";
// import ListProducts from "../admin-dashboard/src/pages/Products/ListProducts";
// import AddProduct from "../admin-dashboard/src/pages/Products/AddProduct.jsx";
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import Login from '../admin-dashboard/src/components/Login'; // تسجيل دخول الأدمن
// import SectionDetails from './components/SectionDetails'; // الصفحة اللي بدنا نعملها
// import CaptainDashboard from "../captian/CaptainDashboard";
// import UserEditProfile from "../src/components/UserProfile/UserEditProfile";

// function App() {
//   // حالة تسجيل دخول الأدمن
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // حالة تسجيل دخول المستخدم العادي
//   const [userAuthenticated, setUserAuthenticated] = useState(false);

//   useEffect(() => {
//     // تحقق من تسجيل دخول الأدمن
//     const token = localStorage.getItem('token');
//     if (token) setIsAuthenticated(true);

//     // تحقق من تسجيل دخول المستخدم العادي
//     const userToken = localStorage.getItem('userToken');
//     if (userToken) setUserAuthenticated(true);
//   }, []);

//   // تسجيل دخول الأدمن
//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   // تسجيل خروج الأدمن
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//   };

//   // تسجيل خروج المستخدم العادي
//   const handleUserLogout = () => {
//     localStorage.removeItem('userToken');
//     setUserAuthenticated(false);
//   };

//   return (<>
//     <div className="bg-red-500 text-white p-4">
//   Tailwind شغال ✅
// </div>


    
//     <BrowserRouter>
     

//       {/* زر تسجيل خروج المستخدم العادي */}
//       {isAuthenticated && (
//   <div style={{ padding: '1rem', textAlign: 'center' }}>
//     <button onClick={handleLogout}>🔓 تسجيل خروج الأدمن</button>
//   </div>
// )}

// {/* زر تسجيل خروج المستخدم العادي */}
// {userAuthenticated && !isAuthenticated && (
//   <div style={{ padding: '1rem', textAlign: 'center' }}>
//     <button onClick={handleUserLogout}>🔓 تسجيل خروج المستخدم</button>
//   </div>
// )}

//       <Routes>
//         {/* صفحات عامة */}
//         <Route path="/" element={<Home />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/business" element={<Business />} />
//         <Route path="/UserProfile" element={<UserProfile />} />
//         <Route path="/UserEditProfile" element={<UserEditProfile />} />
//         <Route path="/ProductList" element={<ProductList />} />

//         {/* تسجيل دخول الأدمن */}
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />

//         {/* لوحة تحكم الأدمن محمية */}
//         <Route
//           path="/AdminDash"
//           element={isAuthenticated ? <AdminDash /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/users"
//           element={isAuthenticated ? <User /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/Product"
//           element={isAuthenticated ? <Product /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/Category"
//           element={isAuthenticated ? <Category /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/Orders"
//           element={isAuthenticated ? <Orders /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/Reports"
//           element={isAuthenticated ? <Reports /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/Settings"
//           element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/add-section"
//           element={isAuthenticated ? <Settings /> : <Navigate to="/AddSection" />}
//         />
//         <Route
//           path="/list-sections"
//           element={isAuthenticated ? <Settings /> : <Navigate to="/ListSections" />}
//         />
//         <Route
//           path="/add-product"
//           element={isAuthenticated ? <AddProduct /> : <Navigate to="/add-product" />}
//         />
//         <Route
//           path="/products"
//           element={isAuthenticated ? <ListProducts /> : <Navigate to="/products" />}
//         />
        
//         {/* صفحة تفاصيل القسم */}
//         <Route path="/section/:id" element={<SectionDetails />} />

//         {/* لوحة تحكم الكابتن */}
//         <Route path="/CaptainDashboard" element={<CaptainDashboard />} />
//       </Routes>
//     </BrowserRouter>
//     </>
    
//   );
// }

// export default App;









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
import ListProducts from "../admin-dashboard/src/pages/Products/ListProducts";
import AddProduct from "../admin-dashboard/src/pages/Products/AddProduct.jsx";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Login from '../admin-dashboard/src/components/Login'; // تسجيل دخول الأدمن
import SectionDetails from './components/SectionDetails'; // الصفحة اللي بدنا نعملها
import CaptainDashboard from "../captian/CaptainDashboard";
import UserEditProfile from "../src/components/UserProfile/UserEditProfile";
import Cart from '../src/components/Cart/Cart.jsx';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);

    const userToken = localStorage.getItem('userToken');
    if (userToken) setUserAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    setUserAuthenticated(false);
  };

  return (
    <>
     

      <BrowserRouter>
        {/* أزرار تسجيل الخروج */}
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

          {/* تسجيل دخول الأدمن */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* صفحات الأدمن محمية */}
          <Route path="/AdminDash" element={isAuthenticated ? <AdminDash /> : <Navigate to="/login" />} />
          <Route path="/users" element={isAuthenticated ? <User /> : <Navigate to="/login" />} />
          <Route path="/Product" element={isAuthenticated ? <Product /> : <Navigate to="/login" />} />
          <Route path="/Category" element={isAuthenticated ? <Category /> : <Navigate to="/login" />} />
          <Route path="/Orders" element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} />
          <Route path="/Reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/Settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/add-section" element={isAuthenticated ? <Settings /> : <Navigate to="/AddSection" />} />
          <Route path="/list-sections" element={isAuthenticated ? <Settings /> : <Navigate to="/ListSections" />} />
          <Route path="/add-product" element={isAuthenticated ? <AddProduct /> : <Navigate to="/add-product" />} />
          <Route path="/products" element={isAuthenticated ? <ListProducts /> : <Navigate to="/products" />} />

          {/* صفحة تفاصيل القسم */}
          <Route path="/section/:id" element={<SectionDetails />} />

          {/* لوحة تحكم الكابتن */}
          <Route path="/CaptainDashboard" element={<CaptainDashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
