import React, { useContext, useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import axios from "axios";

import { API_URL, REGISTRATION_ROUTE, LOGIN_ROUTE } from "../util/const";
import { Context } from './../index';

import './Registration.css';
import { register } from '../http/AuthAPI';
import { observer } from 'mobx-react-lite';



const SignupForm = observer(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setVisible] = useState(false);
    const [status, setStatus] = useState(null);

    const { user } = useContext(Context);


    const navigate = useNavigate("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRole(false);
        if (password.length < 8) {
            setVisible(true);
            setErrorMessage('Пароль должен быть не менее 8 символов');
        }
        else if (passwordRepeat === password) {
            setVisible(false);
            console.log('Form submitted:', { email, password });

            const responses = await axios.post(API_URL + REGISTRATION_ROUTE, {
                email,
                password,
                role
            }).then((response) => {
                localStorage.setItem('token', response.data);
                localStorage.setItem('email', email);
                user.setEmail(email);
                user.setIsAdmin(true);
                user.setUser(true);
                navigate("/", { replace: true });
            }).catch((error) => {
                setStatus(error.response.data.message);
            });

        }
        else {
            setVisible(true);
            setErrorMessage('Пароли не совпадают');
        }
    };

    return (
        <div className="registration-container">
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Введите email...'
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)
                        }
                        placeholder='Введите пароль...'
                        required
                    />
                </div>
                <div className="form-group">
                    <label> Повторите пароль:
                        <input
                            type="password"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            placeholder='Повторите пароль...'
                            required
                        />
                    </label>

                </div>
                <button type="submit" className="register-button">Зарегистрироваться</button>


                {
                    isVisible &&
                    <div className='error_message_div'>
                        {errorMessage}
                    </div>
                }
                {status && <p>{status}</p>}


            </form>
        </div>);

});

export default SignupForm;
