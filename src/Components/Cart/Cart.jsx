import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate Subtotal and Total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/CheckOutPage"); // Redirect to Checkout page
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-header">
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      {cartItems.map((item, index) => (
        <div key={item.id} className="cart-row">
          {/* Product Column */}
          <div className="cart-column">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <p>{item.title}</p>
          </div>

          {/* Price Column */}
          <p>${item.price.toFixed(2)}</p>

          {/* Quantity Column */}
          <div className="cart-column">
            <div className="cart-item-actions">
              <button onClick={() => decreaseQuantity(index)} className="quantity-button">
                -
              </button>
              <p>{item.quantity}</p>
              <button onClick={() => increaseQuantity(index)} className="quantity-button">
                +
              </button>
              <button onClick={() => removeItem(index)} className="remove-button">
                Remove
              </button>
            </div>
          </div>

          {/* Subtotal Column */}
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      {/* Cart Total Section */}
      <div className="cart-total">
        <h2>Cart Total</h2>
        <p>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <p>
          <span>Shipping:</span>
          <span>Free</span>
        </p>
        <p>
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
