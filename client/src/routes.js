import { SignupForm } from "./components/Registration";
import Main from "./pages/Main";
import MAIN_ROUTE from "./util/const"

export const ROUTES_NO_AUTH = [
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "basket",
        element: <SignupForm />
    },
    {
        path: "about",
        element: <SignupForm />,
    }
]

export const ROUTES_AUTH = [
    
]