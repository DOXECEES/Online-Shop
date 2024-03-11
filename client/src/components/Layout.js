import { Link, Outlet } from "react-router-dom";
import "./Layout.css"
import SearchBar from "./SearchBar";

import companyLogo from "./assets/a.png"
import ModalWindow from "./Dialog";
import { useState } from "react";



export default function Layout() {

    const [isAuth, setAuth] = useState(false);


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
                <Outlet>
                    <Tabs>
                        <Tab label="All Goods" to={`/goods`} />
                        <Tab label="Electronics" to={`/goods/electronics`} />
                        <Tab label="Clothing" to={`/goods/clothing`} />
                        <Tab label="Books" to={`/goods/books`} />
                    </Tabs>
                </Outlet>
            </main>

            <footer className="container">&copy; ReactRouter Tutorials 2022</footer>
        </>
    );
} 
