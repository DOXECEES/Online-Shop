import React, { useState } from 'react';
import './SignIn.css';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from 'axios';

const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password)
            return;

        let data = JSON.stringify({
            password: password,
            username: email
        });

        try {
            axios.post('http://localhost:5000/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res);
                console.log(res.data);
            });
        }
        catch (error) {
            console.error('Error during authentication:', error);
        }

        console.log('Signin form submitted:', { email, password });
    };


    return (
        <div className="auth-form-container">
            <h2>Signin Form</h2>
            <form onSubmit={handleSubmit} className="auth-form">
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

                <div className="button-group">
                    <Button type="submit" className="submit-button">
                        Sign In
                    </Button>
                    <Link to="/about">
                        <Button variant="outline-light" size="lg" type="button" className="register-button">
                            Register
                        </Button>
                    </Link>
                </div>
            </form>

        </div>
    );
};

export default SigninForm;