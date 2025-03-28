import { Route, Routes } from "react-router-dom";
// import { ROUTERS } from "./utils/router";
import AdminLayout from "./pages/admin/theme/adminLayout";
import Dashboard from "./pages/admin/dashBoard";
import AdminList from "./pages/admin/adminList";
import AdminAdd from "./pages/admin/admnAdd";
import AdminOrderList from "./pages/admin/adminOrder/list";
import OrderHistory from "./pages/admin/adminOrder/history";
import UserList from "./pages/admin/adminUser/list";
const renderAdminRouter = () => {
    

    return (
        <AdminLayout>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="adminList" element={<AdminList />} />
                <Route path="adminAdd" element={<AdminAdd />} />
                <Route path="adminListOrders" element={<AdminOrderList />} />
                <Route path="history/:userId" element={<OrderHistory />} />
                <Route path="userList" element={<UserList />} />
            </Routes>
        </AdminLayout>
        
    );
};

const AdminRouter = () => {
    return renderAdminRouter();
};

export default AdminRouter;



