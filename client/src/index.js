import React, { StrictMode, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStogare from './storage/UserStorage';
import Goods from './storage/Goods';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStogare(),
        goods: new Goods()
    }}>
        <App />

    </Context.Provider>
);
