import React, { useState } from "react";
import "./AdminPanel.css";
import axios from "axios";

const AdminPanel = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: ""
    });

    const [newProductDelete, setNewProductDelete] = useState({
        name: "",
        price: "",
        description: ""
    });

    const [code, setCode] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleInputDelete = (e) => {
        const { name, value } = e.target;
        setNewProductDelete({ ...newProductDelete, [name]: value });
    }

    const handleAddProduct = async () => {
        axios.post("http://localhost:5000/api/admin/add", {
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description
        }).then((response) => {
            if (response.status === 200)
                setCode("Успешно добавлено");
        }).catch((err) => {
            setCode("Не удалось добавить");

        })

    };

    const handleDeleteProduct = async () => {
        axios.post("http://localhost:5000/api/admin/delete", {
            name: newProductDelete.name,
            price: newProductDelete.price,
            description: newProductDelete.description
        }).then((response) => {
            if (response.status === 200)
                setCode("Успешно удалено");
        }).catch((err) => {
            setCode("Не удалось Удалить");
        });
    };

    return (
        <div className="admin-panel">
            <div className="form-container">
                <h2>Добавить новый товар</h2>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    placeholder="Название товара"
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="price"
                    value={newProduct.price}
                    placeholder="Цена"
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    value={newProduct.description}
                    placeholder="Описание"
                    onChange={handleInputChange}
                />
                <button onClick={handleAddProduct}>Добавить товар</button>
            </div>

            <div className="form-container">
                <h2>Удалить товар</h2>
                <input
                    type="text"
                    name="name"
                    value={newProductDelete.name}
                    placeholder="Название товара"
                    onChange={handleInputDelete}
                />
                <input
                    type="text"
                    name="price"
                    value={newProductDelete.price}
                    placeholder="Цена"
                    onChange={handleInputDelete}
                />
                <textarea
                    name="description"
                    value={newProductDelete.description}
                    placeholder="Описание"
                    onChange={handleInputDelete}
                />
                <button onClick={handleDeleteProduct}>Удалить товар</button>
            </div>
            <p className="response-message">{code}</p>
        </div>
    );
};

export default AdminPanel;
