import React from "react";
import { Link } from "react-router-dom";
import Home from '../../Pages/Home'
import About from '../../Pages/About'
import ContactPage from '../../Pages/ContactPage'
import SignupPage from "../../Pages/SignupPage";

import './Navbar.css'
function Navbar(){
    return (
        <nav>
            <ul>
                
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/About'>About</Link></li>
                <li><Link to='/ContactPage'>Contact</Link></li>
                <li><Link to='/SignupPage'>Signup</Link></li>
                
                
            </ul>
        </nav>
    );
}
export default Navbar