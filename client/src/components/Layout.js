import { Link, Outlet } from "react-router-dom";
import "./Layout.css"
import SearchBar from "./SearchBar";

import companyLogo from "./assets/a.png"
import ModalWindow from "./Dialog";
import { useState } from "react";
import Tabs from "./MyTab/Tabs";
import MyTab from "./MyTab/Tab";


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
                <div className="elements-container">
                    <Tabs>

                    </Tabs>
                </div>
            </main>

            <footer className="container">&copy; ReactRouter Tutorials 2022</footer>
        </>
    );
} 
