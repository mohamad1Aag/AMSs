// src/components/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";  // استيراد Link
import './Home.css';

import Header from "./Header";


function Home() {
  const [navVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <>    <div className="main">
    <Header />

      <div className="content">
        <h3>اهلا بكم في موقع AMS.WEB للتجارة العامة في مدينة سوريا محافظة اللاذقية</h3>
        <div className="main-box">AMS.WEB</div>
        <Link to="/services">
          <button className="btn">الذهاب الي صفحة الخدمات</button>
        </Link>
      </div>
    </div>
    </>

  )
}

export default Home;
