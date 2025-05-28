import React from "react";

const Cart = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>سلة المشتريات</h2>
      {cartItems.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(index)}>إزالة</button>
            </li>
          ))}
        </ul>
      )}
      <h3>الإجمالي: ${total}</h3>
    </div>
  );
};

export default Cart;
