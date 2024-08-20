import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../components/CheckEmail";
import CheckPasswordPage from "../components/CheckPassword";
import Home from "../pages/home";
import MessagePage from "../components/MessagePage";
import Logo from '../pages/layouts/logo'

const router = createBrowserRouter([
{
    path : "/",
    element : <App/>,
    children : [
        {
            path : "register",
            element : <Logo><RegisterPage/></Logo>
        },
        {
            path : 'email',
            element : <Logo><CheckEmailPage/></Logo>
        },
        {
            path : 'password',
            element : <Logo><CheckPasswordPage/></Logo>
        },
        {
            // path : 'forgot-password',
            // element : <AuthLayouts><Forgotpassword/></AuthLayouts>
        },
        {
            path : "",
            element : <Home/>,
            children : [
                {
                    path : ':userId',
                    element : <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router