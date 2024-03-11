import React, { useState } from 'react';
import { SignupForm } from './Registration';

import "./Dialog.css"
import MyButton from './MyButton/MyButton';
import SigninForm from '../pages/SignIn';

const ModalWindow = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button className="open-modal-button" onClick={openModal}>
                Войти
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <SigninForm></SigninForm>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ModalWindow;
