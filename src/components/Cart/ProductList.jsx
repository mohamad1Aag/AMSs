import React, { useState } from "react";
import Cart from "./Cart";
import "./Cart.css";

const ProductList = () => {
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: "منتج 1", price: 50 },
    { id: 2, name: "منتج 2", price: 30 },
    { id: 3, name: "منتج 3", price: 70 },
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item, index) => index !== productId));
  };

  return (
    <div className="shop-container">
      <h2>المنتجات</h2>
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>السعر: ${product.price}</p>
            <button onClick={() => addToCart(product)}>أضف إلى السلة</button>
          </div>
        ))}
      </div>

      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default ProductList;
