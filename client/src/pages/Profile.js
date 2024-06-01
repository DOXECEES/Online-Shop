// ProfilePage.js
import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import avatarPlaceholder from '../assets/vk.png'; // 
import axios from 'axios';
import { Context } from '..';
import AdminPanel from './AdminPanel';

function ProfilePage() {

    const { user, goods } = useContext(Context);


    const [user_, setUser] = useState(null);
    const [address, setAddress] = useState({
        street: '',
        building: '',
        entrance: '',
        city: '',
        phone: ''
    });



    const save = () => {
        axios.post("http://localhost:5000/" + "api/profile", {
            street: address.street,
            home: address.building,
            entranceway: address.entrance,
            city: address.city,
            telephone: address.phone
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error('Error adding item to cart:', error);
        });
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setUser((prevUser) => ({
            ...prevUser,
            address: address,
        }));
        setAddress({
            street: '',
            building: '',
            entrance: '',
            city: '',
            phone: ''
        });
    };


    useEffect(() => {
        axios.get("http://localhost:5000/" + "api/profile")
            .then(response => {

                setAddress({
                    street: response.data[0].street,
                    building: response.data[0].home,
                    entrance: response.data[0].entranceway,
                    city: response.data[0].city,
                    phone: response.data[0].telephone
                });
            }).catch(error => {
                console.error('Error adding item to cart:', error);
            });
    }, [])

    return (
        <div className="profile-page">
            <div className="profile-page-content">
                <h2>Профиль пользователя</h2>
                <div className="user-info">
                    <div className="user-info-header">

                    </div>
                    <div className="user-info-details">
                        <p>Email: {localStorage.getItem('email')}</p>
                        <p>Адрес: {address.street}, {address.building}, подъезд {address.entrance}, {address.city}</p>
                        <p>Телефон: {address.phone}</p>
                    </div>
                </div>
                <div className="address-form">
                    <h3>Изменить адрес доставки</h3>
                    <form onSubmit={handleAddressSubmit}>
                        <label>
                            Улица:
                            <input
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={handleAddressChange}
                            />
                        </label>
                        <label>
                            Дом:
                            <input
                                type="text"
                                name="building"
                                value={address.building}
                                onChange={handleAddressChange}
                            />
                        </label>
                        <label>
                            Подъезд:
                            <input
                                type="text"
                                name="entrance"
                                value={address.entrance}
                                onChange={handleAddressChange}
                            />
                        </label>
                        <label>
                            Город:
                            <input
                                type="text"
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                            />
                        </label>
                        <label>
                            Телефон:
                            <input
                                type="text"
                                name="phone"
                                value={address.phone}
                                onChange={handleAddressChange}
                            />
                        </label>
                        <button type="submit" onClick={save}>Сохранить</button>
                    </form>
                </div>

                {
                    user.isAdmin &&
                    <AdminPanel></AdminPanel>
                }
            </div>
        </div>
    );
}

export default ProfilePage;
