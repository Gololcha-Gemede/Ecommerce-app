import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishListPage from "../../Pages/WishListPage";
import "./Account.css"; // Import the CSS file

function Account() {
  const [userInfo, setUserInfo] = useState(null); // State for fetched user data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/users/1"); // Fetch a specific user
      const data = await response.json();
      setUserInfo(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/users/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          password: formData.newPassword,
        }),
      });

      const updatedData = await response.json();
      console.log("User information updated successfully:", updatedData);
      alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Error updating user information. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch("https://fakestoreapi.com/users/1", {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Account deleted successfully!");
          console.log("Account deleted successfully");
          navigate("/"); // Redirect to home page or any other page after account deletion
        } else {
          alert("Failed to delete the account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account. Please try again.");
      }
    }
  };

  return (
    <div className="account-container">
      {/* First Section */}
      <div className="account-section">
        <h2>Manage My Account</h2>
        <p>
          <a href="#" onClick={(e) => { e.preventDefault(); fetchUserInfo(); }}>
            Fetch My Account Information
          </a>
        </p>
        <p>Address Book</p>
        <p>My Payment Options</p>
        <h2>My Orders</h2>
        <p>My Returns</p>
        <p>My Cancellations</p>
        <h2>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/WishlistPage"); }}>
            My Wishlists
          </a>
        </h2>
        {/* Display fetched user information */}
        {userInfo && (
          <div className="user-info">
            <h3>Fetched User Information:</h3>
            <p><strong>Name:</strong> {userInfo.name.firstname} {userInfo.name.lastname}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Address:</strong> {`${userInfo.address.number} ${userInfo.address.street}, ${userInfo.address.city}`}</p>
          </div>
        )}
      </div>

      {/* Second Section */}
      <div className="account-section">
        <h2>Edit Profile</h2>
        <form className="profile-form">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <h3>Password Changes</h3>
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-buttons">
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="button" onClick={handleSaveChanges}>Save Changes</button>
            <button type="button" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
