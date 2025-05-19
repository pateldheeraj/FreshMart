import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import { Searchpage } from "../pages/Searchpage.jsx";
import Login from "../pages/Login.jsx";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "/search",
                element: <Searchpage/>
            },
            {
                path : "/login",
                element: <Login/>
            }
        ]
    }
])

export {router}

