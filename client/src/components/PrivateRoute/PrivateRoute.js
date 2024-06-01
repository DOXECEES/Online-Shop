import { Navigate, Outlet, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../index";


const PrivateRoute = observer((props) => {
    const { user } = useContext(Context)

    if (user.isAuth) {
        return <Outlet />
    } else {
        return <Navigate to="/logian" />;
    }
});

export default PrivateRoute;
