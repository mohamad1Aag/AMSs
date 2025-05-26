import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./components/Home";
import Services from "./components/Services"; // مثال صفحة خدمات
import About from "./components/About";
import Contact from "./components/Contact";
import Business from "./components/Business";
import LoginForm from './components/LoginForm/LoginForm';
import AdminDash from '../admin-dashboard/src/components/AdminDash.jsx';
import User from "../admin-dashboard/src/pages/Users/User";
import Product from "../admin-dashboard/src/pages/Products/Products.jsx";
import Category from "../admin-dashboard/src/pages/Categories/Category.jsx";
import Orders from "../admin-dashboard/src/Orders/Orders.jsx";
function App() {
  const [user, setUser] = useState(null);
  const handleLogin = userData => {
    setUser(userData);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }
 
 
  return (<>

    <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>أهلًا {user.username}!</h1>
    <button onClick={() => {
      fetch('/logout').then(() => setUser(null));
    }}>
      تسجيل الخروج
    </button>
  </div>
  
  

    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdminDash" element={<AdminDash />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/business" element={<Business />} /> 
        <Route path="/users" element={<User />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Orders" element={<Orders />} />

      </Routes>
    </BrowserRouter>
    </>);
}

export default App;
