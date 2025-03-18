import { Route,Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homePage";
import ProductCart from "./pages/user/productCart";
import Payment from "./pages/user/payment";
import HomeUser from "./pages/user/homeUser";
import MasterLayout from "./pages/user/theme/MasterLayout";

const renderUserRouter = () => {
    const userRouter = [
        {
            path:ROUTERS.USER.HOME,
            component: <HomePage/>
        },
        {
            path:ROUTERS.USER.PRODUCTCART,
            component: <ProductCart/>
        },
        {
            path:ROUTERS.USER.PAYMENT,
            component: <Payment/>
        },
        {
            path:ROUTERS.USER.HOMEUSER,
            component: <HomeUser/>
        },
    ]
    return(
        <MasterLayout>
            <Routes>
                {
                    userRouter.map((item,key)=>(
                        <Route key={key} path={item.path} element={item.component}/>
                    )
                        
                    )
                }
            </Routes>
        </MasterLayout>
    )
}
const RouterCustom = () => {
    return renderUserRouter();
}
export default RouterCustom;