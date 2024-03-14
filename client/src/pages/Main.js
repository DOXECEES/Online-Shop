import { Link } from "react-router-dom";
import "./Main.css"
import SearchBar from "../components/SearchBar";

import companyLogo from "../components/assets/a.png"
import ModalWindow from "../components/Dialog";
import { useEffect, useState } from "react";
import Tabs from "../components/MyTab/Tabs";
import Tab from "../components/MyTab/Tab";


export default function Main() {

    const [isAuth, setAuth] = useState(false);


    useEffect()

    return (
        <>
            <header className="layoutheader">

                <Link to={"/about"}>
                    <img src={companyLogo} alt="easter egg" />
                </Link>
                <SearchBar />

                <button>Корзина</button>
                {
                    !isAuth &&
                    <ModalWindow >
                    </ModalWindow>
                }
            </header >

            <main className="container">
                <div className="elements-container">
                    <Tabs>
                        <Tab title="All Goods" to={`/goods`} />
                        <Tab title="Electronics" to={`/goods/electronics`} />
                        <Tab title="Clothing" to={`/goods/clothing`} />
                        <Tab title="Books" to={`/goods/books`} />
                    </Tabs>
                </div>
            </main>

            <footer className="container">&copy; ReactRouter Tutorials 2022</footer>
        </>
    );
} 
