import { Route,Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homePage";
import Payment from "./pages/user/payment";
import HomeUser from "./pages/user/homeUser";
import MasterLayout from "./pages/user/theme/MasterLayout";
import ShopPage from "./pages/user/shopPage/ShopPage";
import CartPage from "./pages/user/cartPage/CartPage";
import ProductDetail from "./pages/user/productDetail";

const renderUserRouter = () => {
    const userRouter = [
        {
            path:ROUTERS.USER.HOME,
            component: <HomePage/>
        },
        {
            path: ROUTERS.USER.SHOP,
            component: <ShopPage/>
        },
        {
            path: ROUTERS.USER.CART,
            component: <CartPage/>
        },
        {
            path:ROUTERS.USER.PAYMENT,
            component: <Payment/>
        },
        {
            path:ROUTERS.USER.HOMEUSER,
            component: <HomeUser/>
        },
        {
            path:ROUTERS.USER.PRODUCTDETAIL,
            component: <ProductDetail/>
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