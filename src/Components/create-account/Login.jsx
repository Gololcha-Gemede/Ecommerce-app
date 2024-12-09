import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import image from "../../assets/images/Side Image.png";
import "./Create-account.css";

function Login() {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // React Router's useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    try {
      // Call the login API
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email, // Replace with your username field
          password, // Password from the state
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        console.log("Login Response:", data);

        // Save token or user info in local storage if needed
        localStorage.setItem("token", data.token);

        // Navigate to the home page
        navigate("/");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <>
      <div className="login-container">
        <img src={image} alt="photo" className="signup-img" />
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login to Exclusive</h2>
          <p>Enter your details below</p>
          <input
            type="text"
            placeholder="Email or Phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          <p>
            <button className="login-btn" type="submit">
              Login
            </button>{" "}
            <a href="">Forget Password?</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
