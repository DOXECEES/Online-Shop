import { Link, Outlet } from "react-router-dom";
import "./Layout.css"
import SearchBar from "../components/SearchBar";

import ModalWindow from "../components/Dialog";
import { useState, useContext, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import companyLogo from "../components/assets/b.png"
import vkIcon from "../assets/vk.png"
import facebookIcon from "../assets/facebook.png"
import youtubeIcon from "../assets/youtube.png"
import ProductCard from "../components/ProductCard/ProductCard";
import CListGroup from "../components/CListGroup/CListGroup"
import { Context } from './../index';
import { observer } from "mobx-react-lite";
import Button from "../components/MyButton/MyButton"

import { toJS } from "mobx";

import { BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, MAIN_ROUTE, ABOUT_ROUTE } from "../util/const";
import { GetCategories, GetTypes, GetBrands } from "../http/GoodsAPI";

const Layout = observer(({ children }) => {

    const { user, goods } = useContext(Context);

    const [curTab, setCurTab] = useState(1);
    const [curType, setCurType] = useState(1);


    function logout() {
        user.setIsAdmin(false);
        user.setUser(false);

        localStorage.removeItem('token');
    }

    useEffect(() => {
        GetCategories().then(data => {
            goods.setCategories(data.data)
        });
    }, [])


    // useEffect(() => {
    //     GetTypes(curTab)
    //         .then(data => {
    //             goods.setTypes(data.data)
    //         });
    // }, []);

    // useEffect(() => {
    //     GetBrands(toJS(goods.selectedType).id)
    //         .then(date => {
    //             goods.setBrands(date.data)
    //         });

    // }, [goods.selectedType])

    return (
        <div className="flex_wrapper">
            <header className="main_header">

                <Link to={"/about"} className="link">
                    <img src={companyLogo} alt="easter egg" />
                </Link>



                <nav className="nav_main_header">


                    <Button to={BASKET_ROUTE} className="max_link">Корзина</Button>
                    {
                        !user.user &&
                        <Button to={LOGIN_ROUTE} className="max_link">Войти</Button>
                    }
                    {
                        user.user &&
                        <Button to={PROFILE_ROUTE} className="max_link">Профиль</Button>
                    }
                    {
                        user.user &&
                        <button className="max_link" onClick={logout}>Выйти</button>
                    }

                    <Button to={MAIN_ROUTE}>Главная</Button>
                    <Button to={ABOUT_ROUTE}>О нас</Button>

                </nav>

            </header >

            <main className="container">
                <Outlet />
            </main>

            <footer className="main_footer">
                <div className="container_main_footer">
                    <div className="container_item_main_footer">
                        <nav>
                            <Link className="main_footer_link">Пользовательское соглашение</Link>
                            <Link className="main_footer_link">Вакансии</Link>
                            <Link className="main_footer_link">Политика обработки персональных данных</Link>
                        </nav>
                    </div>
                    <div className="container_item_main_footer">
                        <span className="span_main_footer"> © 2024-2024 НАЗВАНИЕ</span>
                    </div>
                </div>

                <div className="container_main_footer">
                    <div className="container_item_main_footer">
                        <span className="span_main_footer">В СОЦИАЛЬНЫХ СЕТЯХ</span>
                    </div>
                    <div className="container_item_main_footer">
                        <div className="socialmedia_icons_main_footer">
                            <img src={vkIcon} alt="vk"></img>
                            <img src={facebookIcon} alt="facebook"></img>
                            <img src={youtubeIcon} alt="youtube"></img>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
});

export default Layout;