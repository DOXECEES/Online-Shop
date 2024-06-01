import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../index.js';
import './ProductDetail.css'; // Импорт файла стилей

const ProductDetail = () => {
    const { id } = useParams();
    const { user, goods } = useContext(Context);
    const product = goods.categories.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    const handleBuyClick = () => {
        console.log('Купить:', product.title);
    };

    return (
        <div className="product-detail">
            <div className="product-detail-info">
                <h1>{product.title}</h1>
                <p className="product-detail-price">Цена: {product.price} р.</p>
                <button onClick={handleBuyClick} className="product-detail-buy-button">Купить</button>
                <p>Описание: {product.description}</p>
                <h2>Характеристики:</h2>
                <ul>
                    {product.specifications.split('\n').map((spec, index) => (
                        <li key={index}>{spec}</li>
                    ))}
                </ul>
            </div>
            <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
    );
};

export default ProductDetail;
