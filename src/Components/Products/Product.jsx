import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Product.css"; // Importing the CSS file

function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state; // Get the product details passed from HomeComponent

  const [updatedTitle, setUpdatedTitle] = useState(product.title);
  const [updatedPrice, setUpdatedPrice] = useState(product.price);
  const [updatedDescription, setUpdatedDescription] = useState(product.description);

  // Handle product update
  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: updatedTitle,
          price: updatedPrice,
          description: updatedDescription,
          image: product.image,
          category: product.category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        alert("Product updated successfully!");
        console.log(updatedProduct);
      } else {
        alert("Failed to update the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        navigate("/"); // Redirect to the home page or another relevant page
      } else {
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="product-details-container">
      {/* Image Section */}
      <div className="image-section">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>

      {/* Details Section */}
      <div className="details-section">
        <h2>Product Details</h2>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="textarea-field"
          />
        </div>
        <div className="product-rating">
          <strong>Rating:</strong> {product.rating.rate} / 5 ({product.rating.count} reviews)
        </div>
        <div className="button-group">
          {/* Update Button */}
          <button className="update-button" onClick={handleUpdateProduct}>
            Update
          </button>

          {/* Delete Button */}
          <button className="delete-button" onClick={handleDeleteProduct}>
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
