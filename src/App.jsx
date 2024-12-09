import React from 'react'
import {BrowserRouter as Router, Routes,Route,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import SignupPage from './Pages/SignupPage'
import About from './Pages/About'
import ContactPage from './Pages/ContactPage.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import Home from './Pages/Home.jsx'
import topheader from './assets/images/Top-header.png'
import footer from './assets/images/Footer.png'
import CartPage from './Pages/CartPage.jsx'
import CheckOutPage from './Pages/CheckOutPage.jsx'
import AccountPage from './Pages/AccountPage.jsx'
import WishListPage from './Pages/WishListPage.jsx'
import ProductDetailsPage from './Pages/ProductDetailsPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'



function NavigationSelect() {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  return (
    <select onChange={handleNavigation} defaultValue="">
      <option value="" disabled>
        profile
      </option>
      <option value="/AccountPage">Manage My Account</option>
      <option value="#">My Order</option>
      <option value="#">My Cancellations</option>
      <option value="#">My Reviews</option>
      <option value="#">Logout</option>
    </select>
  );
}



function App() {
  return (
    <>
        <Router>
            <img src={topheader} alt="Top-Header" />
          
              <Navbar/>
              <NavigationSelect />
          
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/ContactPage' element={<ContactPage/>}/>
                <Route path='/About' element={<About/>}/>
                <Route path='/SignupPage' element={<SignupPage/>}/>
                <Route path='/CartPage' element={<CartPage/>}/>
                <Route path='/CheckOutPage' element={<CheckOutPage/>}/>
                <Route path='/AccountPage' element={<AccountPage/>}/>
                <Route path='/WishListPage' element={<WishListPage/>}/>
                <Route path='/ProductDetailsPage' element={<ProductDetailsPage/>}/>
                <Route path='/LoginPage' element={<LoginPage/>}/>
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
            <img src={footer} alt="Footer" />
        </Router>
    </>
  );
}

export default App
