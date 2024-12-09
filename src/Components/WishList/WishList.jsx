import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WishList.css";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch wishlist from localStorage
    const savedWishList = JSON.parse(localStorage.getItem("WishList")) || [];
    setWishList(savedWishList);
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Update localStorage after adding or updating the product
    localStorage.setItem("cart", JSON.stringify(cart));

    // Navigate to CartPage regardless of whether the product is new or already exists
    navigate('/CartPage');
  };

  const handleRemoveFromWishList = (productId) => {
    const updatedWishList = wishList.filter((product) => product.id !== productId);
    setWishList(updatedWishList);
    localStorage.setItem("WishList", JSON.stringify(updatedWishList));
  };

  const handleSeeMore = () => {
    setShowAll(true);
  };

  const itemsToDisplay = showAll ? wishList : wishList.slice(0, 4);

  return (
    <div className="wishlist-container">
      <h2>WishList ({wishList.length})</h2>
      <div className="wishlist-items">
        {itemsToDisplay.map((product) => (
          <div className="wishlist-item" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <p className="product-title">{product.title}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            <button
              className="remove-from-wishlist-button"
              onClick={() => handleRemoveFromWishList(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {!showAll && wishList.length > 4 && (
        <button className="see-more-button" onClick={handleSeeMore}>
          See More
        </button>
      )}
    </div>
  );
};

export default WishList;
