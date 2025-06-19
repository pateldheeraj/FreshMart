import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import { Searchpage } from "../pages/Searchpage.jsx";
import {Login} from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { ForgotPassword } from "../pages/ForgotPassword.jsx";
import { OtpVerification } from "../pages/OtpVerification.jsx";
import { ResetPassword } from "../pages/ResetPassword.jsx";
import { UserMenuMobile } from "../pages/UserMenuMobile.jsx";
import { Dashboard } from "../layouts/Dashboard.jsx";
import { Profile } from "../pages/Profile.jsx";
import {Category} from '../pages/Category.jsx'
import {SubCategory} from '../pages/SubCategory.jsx'
import {Product} from '../pages/Product.jsx'
import {UploadProduct} from '../pages/UploadProduct.jsx'
import AdminPermision from "../components/AdminPermisson.jsx";
import { ProductListPage } from "../pages/ProductListPage.jsx";
import { DisplayProductPage } from "../pages/DisplayProductPage.jsx";

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
                path : "search",
                element: <Searchpage/>
            },
            {
                path : "register",
                element: <Register/>
            },
            {
                path : "login",
                element: <Login/>
            },
            {
                path : "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element: <OtpVerification/>
            },
            {
                path : "reset-password",
                element: <ResetPassword/>
            },
            {
                path : "user",
                element: <UserMenuMobile/>
            },
            {
                path : "dashboard",
                element: <Dashboard/>,
                children:[
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "category",
                        element : <AdminPermision> <Category/> </AdminPermision> 
                    },
                    {
                        path : "subcategory",
                        element : <AdminPermision> <SubCategory/> </AdminPermision> 
                    },
                    {
                        path : "product",
                        element : <AdminPermision> <Product/> </AdminPermision>
                    },
                    {
                        path : "upload-product",
                        element : <AdminPermision> <UploadProduct/> </AdminPermision>
                    },
                ]
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <DisplayProductPage/>
            }
        ]
    }
])

export {router}

