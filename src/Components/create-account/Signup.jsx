import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import image from '../../assets/images/Side Image.png';
import google from '../../assets/images/Icon-Google.png';
import './Create-account.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateAccount = async (e) => {
        e.preventDefault(); // Prevent form submission

        try {
            const response = await fetch('https://fakestoreapi.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: { firstname: name.split(' ')[0], lastname: name.split(' ')[1] || '' },
                    email: email,
                    password: password,
                    address: {
                        city: 'unknown', // Placeholder address as the API requires it
                        street: 'unknown',
                        number: 0,
                        zipcode: '00000',
                        geolocation: { lat: '0.00', long: '0.00' },
                    },
                    phone: '1234567890', // Placeholder phone
                }),
            });

            if (response.ok) {
                const newUser = await response.json();
                alert('Account created successfully!');
                console.log(newUser); // Log created user details
                navigate('/'); // Navigate to the home page
            } else {
                alert('Failed to create account. Please try again.');
            }
        } catch (error) {
            console.error('Error creating account:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="signup-container">
                <img src={image} alt="photo" className="signup-img" />
                <form action="" className="signup-form" onSubmit={handleCreateAccount}>
                    <h2>Create an account</h2>
                    <p>Enter your details below</p>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email or Phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="create-account-btn" type="submit">
                        Create Account
                    </button>
                    <button className="google-signup-btn">
                        <img src={google} alt="" className="google-icon" /> Sign up with Google
                    </button>
                    <p>
                        Already have account? <Link to="/LoginPage">Login</Link>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Signup;
