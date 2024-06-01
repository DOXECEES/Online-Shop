import "./ProductsByCategory.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

const ProductsByCategory = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        // Получение списка товаров из вашего API
        axios.get(`http://localhost:5000/api/products?device=${category}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [category]);

    useEffect(() => {
        // Получение списка фильтров из вашего API
        axios.get('http://localhost:5000/api/filters')
            .then(response => {
                setFilters(response.data);
            })
            .catch(error => {
                console.error('Error fetching filters:', error);
            });
    }, []);

    useEffect(() => {
        // Фильтрация товаров при изменении выбранных фильтров
        axios.post('http://localhost:5000/api/filter-products', { selectedFilters })
            .then(response => {
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.error('Error filtering products:', error);
            });
    }, [selectedFilters]);

    const handleCheckboxChange = (filterId) => {
        setSelectedFilters(prevState => ({
            ...prevState,
            [filterId]: !prevState[filterId]
        }));
    };

    return (
        <div>
            <h2>Фильтры:</h2>
            <ul>
                {filters.map(filter => (
                    <li key={filter.id}>
                        <input
                            type="checkbox"
                            id={filter.id}
                            checked={selectedFilters[filter.id]}
                            onChange={() => handleCheckboxChange(filter.id)}
                        />
                        <label htmlFor={filter.id}>{filter.name}</label>
                    </li>
                ))}
            </ul>
            <h2>Товары:</h2>
            <ul>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))
                ) : (
                    products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ProductsByCategory;
