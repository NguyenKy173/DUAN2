import { Route,Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import HomePage from "./pages/user/homePage";
import MasterLayout from "./pages/user/theme/MasterLayout";

const renderUserRouter = () => {
    const userRouter = [
        {
            path:ROUTERS.USER.HOME,
            component: <HomePage/>
        }
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