import { Route, Routes } from "react-router-dom";
// import { ROUTERS } from "./utils/router";
import AdminLayout from "./pages/admin/theme/adminLayout";
import Dashboard from "./pages/admin/dashBoard";
import AdminList from "./pages/admin/adminList";
import AdminAdd from "./pages/admin/admnAdd";
import AdminUpdate from "./pages/admin/adminUpdate/adminUpdate";

const renderAdminRouter = () => {
    // const adminRoutes = [
    //     {
    //         path: ROUTERS.ADMIN.DASHBOARD,
    //         component: <Dashboard />
    //     }
    // ];

    return (
        // <AdminLayout>
        //     <Routes>
        //         {adminRoutes.map((item, key) => (
        //             <Route key={key} path={item.path} element={item.component} />
        //         ))}
        //     </Routes>
        // </AdminLayout>
        <AdminLayout>
            <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="adminList" element={<AdminList />} />
                <Route path="adminAdd" element={<AdminAdd />} />
                <Route path="/:id/update" element={<AdminUpdate />} />
            </Routes>
        </AdminLayout>
        
    );
};

const AdminRouter = () => {
    return renderAdminRouter();
};

export default AdminRouter;



