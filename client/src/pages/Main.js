import { Link } from "react-router-dom";
import "./Main.css"
import SearchBar from "../components/SearchBar";

import ModalWindow from "../components/Dialog";
import { useState, useContext, useEffect, Children } from "react";
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
import Filter from "../components/Filter";

const Main = observer(({ child }) => {

    const { user, goods } = useContext(Context);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriceMax, setFilterPriceMax] = useState(10000);
    const [filterPriceMin, setFilterPriceMin] = useState(0);
    const [GPU, setGpu] = useState('');
    const [CPU, setCpu] = useState('');
    const [mother, setMother] = useState('');
    const [RAM, setRam] = useState(0);
    const [power, setPower] = useState(0);

    const [stuff, setStuff] = useState([]);



    const product = {
        image: 'https://example.com/product.jpg',
        name: 'Product Name',
        price: '$99.99',
        characteristics: ['Characteristic 1', 'Characteristic 2', 'Characteristic 3'],
    };

    function logout() {
        user.setIsAdmin(false);
        user.setUser(false);

        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    const applyFilters = (computer) => {
        const priceMatch = (parseFloat(computer.price) >= parseFloat(filterPriceMin)) &&
            (parseFloat(computer.price) <= parseFloat(filterPriceMax));
        const processorRegExp = /Процессор: (.+)/;
        const gpuRegExp = /Графический процессор: (.+)/;
        const motherboardRegExp = /Материнская плата: (.+)/;
        const ramRegExp = /Оперативная память: (.+)/;
        const storageRegExp = /Накопитель: (.+)/;
        const psuRegExp = /Блок питания: (.+)/;

        const processorMatch = computer.specifications.match(processorRegExp);
        const gpuMatch = computer.specifications.match(gpuRegExp);
        const motherboardMatch = computer.specifications.match(motherboardRegExp);
        const ramMatch = computer.specifications.match(ramRegExp);
        const storageMatch = computer.specifications.match(storageRegExp);
        const psuMatch = computer.specifications.match(psuRegExp);

        const processor = processorMatch ? processorMatch[1] : null;
        const gpu = gpuMatch ? gpuMatch[1] : null;
        const motherboard = motherboardMatch ? motherboardMatch[1] : null;
        const ram = ramMatch ? ramMatch[1] : null;
        const storage = storageMatch ? storageMatch[1] : null;
        const psu = psuMatch ? psuMatch[1] : null;

        const isMatchCpu = processor.includes(CPU);
        const isMatchGpu = gpu.includes(GPU);
        const isMatchMother = motherboard.includes(mother);
        const isMatchRam = ram.includes(String(RAM));
        const isMatchSupply = psu.includes(String(power));


        console.log(priceMatch && isMatchCpu && isMatchGpu && isMatchMother && isMatchRam && isMatchSupply)
        return priceMatch && isMatchCpu && isMatchGpu && isMatchMother && isMatchSupply;
    };

    const handleSearch = () => {
        const filteredComps = goods.categories.filter(comp =>
            comp.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).filter(comp => applyFilters(comp));
        setStuff(filteredComps)

    };

    useEffect(() => {
        GetCategories().then(data => {
            goods.setCategories(data.data)
            setStuff(goods.categories)
        });
    }, [])


    useEffect(() => {
        GetBrands(toJS(goods.selectedType).id)
            .then(date => {
                goods.setBrands(date.data)
            });

    }, [goods.selectedType])

    return (
        <div className="flex_wrapper">
            <header className="main_header">

                <Link to={"/about"} className="link">
                    <img src={companyLogo} alt="easter egg" />
                </Link>

                <input
                    type="text"
                    placeholder="Поиск"
                    className="ser"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />


                <nav className="nav_main_header">

                    {
                        user.user &&
                        <Button to={BASKET_ROUTE} className="max_link">Корзина</Button>
                    }
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
                <div className="elements-container">
                    <Filter minPrice={filterPriceMin} setFilterPriceMin={setFilterPriceMin} maxPrice={filterPriceMax} setFilterPriceMax={setFilterPriceMax} mother={mother}
                        setMother={setMother}
                        oper={RAM}
                        setOper={setRam}
                        powerSupply={power}
                        setPowerSupply={setPower}
                        CPU={CPU}
                        setCpu={setCpu}
                        GPU={GPU}
                        setGpu={setGpu}
                        handler={handleSearch}></Filter>

                    <div className="products_grid">
                        {stuff.map(brand =>
                            <ProductCard
                                id={brand.id}
                                image={brand.image}
                                title={brand.title}
                                price={brand.price}
                                specifications={brand.specifications}
                                key={brand.id}
                            />
                        )}
                    </div>
                </div>

            </main >

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
        </div >
    );
})

export default Main;