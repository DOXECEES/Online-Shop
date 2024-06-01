import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './SearchBar.css';
import { Context } from '..';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const { user, goods } = useContext(Context)

    const cheak = () => {
        {

        }
    }

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onClick={cheak}
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;