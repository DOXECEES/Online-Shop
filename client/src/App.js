
import { Route, Routes, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { SignupForm, createPostAction } from './components/Registration';
import Layout from './components/Layout';

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" >
            <Route path="/" element={<Layout />}>
            
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
