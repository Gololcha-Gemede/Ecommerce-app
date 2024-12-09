import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Checkout.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    paymentMethod: "",
  });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    // Calculate subtotal
    const calculatedSubtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      userId: 1, // Hardcoded user ID for example purposes
      date: new Date().toISOString(),
      products: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      billingDetails: {
        firstName: formData.firstName,
        companyName: formData.companyName,
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
      },
      paymentMethod: formData.paymentMethod,
      total: subtotal,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order placed successfully:", result);

        // Clear the cart and navigate to the home page
        localStorage.removeItem("cart");
        alert("Order placed successfully!");
        navigate("/");
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="checkout-container">
      {/* Billing Details Section */}
      <div className="billing-details">
        <h1>Billing Details</h1>
        <form>
          <label>
            First Name <span className="required">*</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Company Name
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Street Address <span className="required">*</span>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Apartment
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Town/City <span className="required">*</span>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone Number <span className="required">*</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email <span className="required">*</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          
        </form>
      </div>

      {/* Order Summary Section */}
      <div className="order-summary">
        <h2>Your Order</h2>
        <div className="order-items">
          {cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <p>{item.title}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <p className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <p className="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </p>
        <p className="summary-row">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </p>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Bank"
              onChange={handleInputChange}
            />
            Bank
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              onChange={handleInputChange}
            />
            Cash on Delivery
          </label>
        </div>
        <input
          type="text"
          placeholder="Coupon Code"
          className="coupon-input"
        />
        <button className="apply-coupon-button">Apply Coupon</button>
        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
