// Import necessary modules from React
import React, { useState } from 'react';
import './SignUp.css'; // Import the CSS file for styling

// Create a functional component for the signup form
const SignupForm = () => {
    // Define state variables to store user input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add further logic for form validation and submission here
        console.log('Form submitted:', { firstName, lastName, email, password });
    };

    return (
        <div className="signup-form-container">
            <h2>Signup Form</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                {/* First Name input */}
                <div className="form-group">
                    <label>
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>
                </div>

                {/* Last Name input */}
                <div className="form-group">
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>
                </div>

                {/* Email input */}
                <div className="form-group">
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>

                {/* Password input */}
                <div className="form-group">
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>

                {/* Submit button */}
                <button type="submit" className="submit-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

// Export the SignupForm component
export default SignupForm;
