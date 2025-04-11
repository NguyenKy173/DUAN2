import Sidebar from "../sidebar";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom"; 
interface AdminLayoutProps {
    children: ReactNode;
}

// const AdminLayout = ({ children,...props }: AdminLayoutProps) => {
//     console.log("📌 AdminLayout rendering, children:", children);

//     return (
//         <div className="wrapper" {...props} >
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Nội dung chính */}
//             <div className="main">
//                 <nav className="navbar navbar-expand px-4 py-3"></nav>

//                 <div className="content p-4">
//                     <h2>test nội dung</h2>
//                     {children}  {/* 🔥 Thay đổi nội dung tại đây */}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;
const AdminLayout = ({ children }: AdminLayoutProps) => {
    console.log("📌 AdminLayout rendering, children:", children);

    return (
        <div className="wrapper">
            {/* Sidebar */}
            <Sidebar />

            {/* Nội dung chính */}
            <div className="main">
                <nav className="navbar navbar-expand px-4 py-3"></nav>

                <div className="content p-4">
                    {children || <Outlet />} {/* Nếu không có children, dùng <Outlet /> */}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
