import React from "react";
import "./About.css"; // Подключаем CSS для стилизации страницы

const About = () => {
    return (
        <div className="about-container">
            <h2>О нас</h2>
            <p>
                Магазин компьютеров "TechStore" предлагает широкий ассортимент компьютерной техники и комплектующих.
                Мы работаем для того, чтобы каждый наш клиент мог найти идеальное решение для своих потребностей в области вычислительной техники.
            </p>
            <p>
                Наш магазин предлагает только качественные товары от ведущих производителей, таких как Intel, AMD, NVIDIA, ASUS, MSI и многих других.
                Мы гарантируем надежность и производительность продукции, а также отличный сервис и поддержку наших клиентов.
            </p>
            <p>
                Наши специалисты всегда готовы проконсультировать вас по всем вопросам, связанным с выбором и настройкой компьютерной техники.
                Мы стремимся к тому, чтобы каждый клиент остался доволен своей покупкой и получил от нас лучший сервис.
            </p>
            <p>
                Мы благодарим вас за выбор магазина "TechStore" и надеемся на долгосрочное сотрудничество!
            </p>
        </div>
    );
};

export default About;