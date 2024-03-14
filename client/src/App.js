
import { Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { SignupForm, createPostAction } from './components/Registration';
import Main from './pages/Main';

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" >
            <Route path="/" element={<Main />}>

            </Route>

            <Route path="about" element={<SignupForm />}>

            </Route>

        </Route>
    ));


function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
