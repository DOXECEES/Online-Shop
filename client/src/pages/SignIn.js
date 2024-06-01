import React, { useContext, useState } from 'react';
import './SignIn.css';
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../util/const';
import { Context } from '..';

const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { user } = useContext(Context);
    const navigate = useNavigate("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password)
            return;

        try {
            await axios.post(API_URL + LOGIN_ROUTE, { email, password }
            ).then(res => {
                user.setIsAdmin(true);
                user.setUser(true);
                user.setEmail(email);
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('email', email)
                navigate("/", { replace: true });
            }).catch(error => {
                setError(error.response.data.message);
            });

        }
        catch (error) {
            console.error('Error during authentication:', error);
        }

        console.log('Signin form submitted:', { email, password });
    };


    return (
        <div className="auth-form-container">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Введите email...'
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Пароль:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Введите пароль...'
                        />
                    </label>
                </div>
                <div>
                    {error && <div className="error-message">{error}</div>}
                </div>

                <div className="button-group">
                    <Button type="submit" className="submit-button">
                        Войти
                    </Button>
                    <Link to={REGISTRATION_ROUTE}>
                        <Button variant="outline-light" size="lg" type="button" className="register-button">
                            Зарегистрироваться
                        </Button>
                    </Link>
                </div>
            </form>

        </div>
    );
};

export default SigninForm;