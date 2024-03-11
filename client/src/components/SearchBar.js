import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./SearchBar.css"

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    useEffect(() => {
        axios
            .get("http://localhost:5000/express_backend")
            .then((response) => {
                setSearchTerm(response.data.express);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <form className="SearchBar" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            {/* <label>{searchTerm}</label> */}
            <button type="submit" hidden="true">ds</button>
        </form>
    );
};

export default SearchBar;