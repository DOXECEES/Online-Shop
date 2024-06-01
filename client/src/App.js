
import { Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignupForm from './components/Registration';
import Main from './pages/Main';
import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE } from './util/const'
import { createContext, useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import SigninForm from './pages/SignIn';
import ProfilePage from './pages/Profile'
import { Context } from '.';
import Basket from './pages/Basket';
import { Spinner } from "react-bootstrap";
import { check, getRole } from './http/AuthAPI';
import ProductsByCategory from './components/ProductsByCategory/ProductsByCategory';
import Layout from './pages/Layout';
import ProductDetail from './components/ProductDetail/ProductDetail';
import About from './pages/About';


const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path={MAIN_ROUTE} >
            <Route path={MAIN_ROUTE} element={<Main />}>
            </Route>
            <Route path={"/product"} element={<Layout />}>
                <Route path=":id" element={<ProductDetail />} />

            </Route>
            <Route path={"/about"} element={<About />} />


            <Route path={"/lay/"} element={<Layout />}>
                <Route path="basket" element={<Basket />}></Route>

            </Route>


            <Route path={LOGIN_ROUTE} element={<SigninForm />}>

            </Route>
            <Route path={"profile"} element={<Layout />}>
                <Route path={"user"} element={<ProfilePage />} />

                <Route path={"admin"} element={<ProfilePage />} />
            </Route>

            <Route path={REGISTRATION_ROUTE} element={<SignupForm />}>



            </Route>

        </Route >

    ));

const App = observer(() => {

    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token == null) {
            user.setUser(false);
            user.setIsAdmin(false);
        }
        else {
            user.setUser(true);
            if (getRole(localStorage.getItem('email')).then((data) => {
                user.setIsAdmin(Boolean(data.data));
            }));

            user.setEmail(localStorage.getItem('email'));
        }
    }, []);

    return (
        <div className="App">


            <RouterProvider router={router} />
        </div>
    );
});

export default App;
