import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index.js';
import './Basket.css';
import axios from 'axios';
import { GetBasket } from '../http/GoodsAPI.js';
import { toJS } from 'mobx';

const Basket = () => {
    const { user, goods } = useContext(Context);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRemoveFromBasket = (productId) => {
        goods.deleteItemFromBasket(productId);
        console.log('Удалить товар из корзины:', productId);
        console.log(goods.itemsInBasket);

    };


    const fetchCartItems = async () => {
        axios.get(`http://localhost:5000/api/shopping-cart/${localStorage.getItem('email')}`)
            .then(response => {
                setCartItems(response.data);
                console.log(cartItems);
            })
            .catch(error => {
                console.error('Error fetching shopping cart items:', error);
            });
    }

    const handleRemove = async (itemId) => {

        console.log(itemId);
        axios.delete(`http://localhost:5000/api/shopping-cart/${localStorage.getItem('email')}/${itemId.ItemID}`)
            .then(response => {
                if (response.status === 200) {
                    setCartItems(prevItems => prevItems.filter(item => item.ItemID !== itemId.ItemID));
                    console.log(response.data.message);
                }
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
            });
    }



    useEffect(() => {
        fetchCartItems(cartItems);
        console.log(cartItems)
    }, []);

    useEffect(() => {
        if (!user.email)
            return;


    }, [cartItems]);



    const handleCheckout = () => {
        console.log('Оформить заказ');
        console.log(cartItems)
        cartItems.map((item) => {
            handleRemove(item);
        })
    };

    return (
        <div className="Basket">
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <p className="empty-Basket-message">Корзина пуста</p>
            ) : (
                <div className="Basket-items">
                    {cartItems.map((item, index) => (

                        <div key={item.id} className="Basket-item">
                            <img src={"data:image/webp;base64,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"} alt={goods.categories[item.ProductID - 1].title} className="Basket-item-image" />
                            <div className="Basket-item-info">
                                <h3>{goods.categories[item.ProductID - 1].title}</h3>
                                <p>Цена: {goods.categories[item.ProductID - 1].price} р.</p>
                                <button className="checkout-button" onClick={() => handleRemove(item)}>Удалить</button>
                            </div>
                        </div>
                    ))
                    }
                    <div className='cheakout-div'>
                        <button className="checkout-button" onClick={handleCheckout}>Оформить заказ</button>
                    </div>
                </div >
            )}
        </div >
    );

}
export default Basket;
