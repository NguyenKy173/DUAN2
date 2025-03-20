import { Link } from "react-router-dom";
import "./sidebar.css"
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dropdowns, setDropdowns] = useState<{ auth: boolean; multi: boolean; multiTwo: boolean }>({
        auth: false,
        multi: false,
        multiTwo: false
    });

    // Hàm toggle sidebar
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    // Hàm toggle dropdown (menu được đảm bảo có kiểu dữ liệu rõ ràng)
    const toggleDropdown = (menu: keyof typeof dropdowns) => {
        setDropdowns((prev) => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };
    return (
        <>
        <Helmet>
        <link rel="icon" type="image/x-icon" href="https://htmlcss.fullstack.edu.vn/assets/f8_icon.png" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </Helmet>
      {/* <div className="wrapper">
      <aside id="sidebar" className={isExpanded ? "expand" : ""}>
        <div className="d-flex justify-between p-4">
          <div className="sidebar-logo">
            <Link to="#">Admin</Link>
          </div>
          <button className="toggle-btn border-0" type="button" onClick={toggleSidebar}>
                <i className={`bx ${isExpanded ? "bxs-chevrons-left" : "bxs-chevrons-right"}`}></i>
          </button>

        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <a className="sidebar-link has-dropdown" onClick={() => toggleDropdown("multi")}> 
              <i className='bx bxs-user-account'></i>
              <span>List</span>
            </a>
            {dropdowns.multi && (
              <ul className="sidebar-dropdown list-unstyled">
                <li className="sidebar-item">
                  <Link to="/header" className="sidebar-link">List Nhân viên</Link>
                  <Link to="/header-project" className="sidebar-link">List Projects</Link>
                  <Link to="/header-task" className="sidebar-link">List Tasks</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link has-dropdown" onClick={() => toggleDropdown("auth")}> 
              <i className='bx bxs-bug-alt'></i>
              <span>Auth</span>
            </a>
            {dropdowns.auth && (
              <ul className="sidebar-dropdown list-unstyled">
                <li className="sidebar-item">
                  <Link to="#" className="sidebar-link">Login</Link>
                </li>
                <li className="sidebar-item">
                  <Link to="#" className="sidebar-link">Register</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <div className="sidebar-footer">
            <a className="sidebar-link" >
                <i className="bx bxs-log-out"></i>
                <span> LogOut</span>
            </a>
        </div>

      </aside>
      <div className="main">
        <nav className="navbar navbar-expand px-4 py-3"></nav>
        <div className="list">
          <h3 className="mt-3">nhân viên</h3>
        </div>
      </div>
    </div> */}
    <div className="wrapper">
  <aside id="sidebar" className={isExpanded ? "expand" : ""}>
    <div className="d-flex justify-between p-4">
      <div className="sidebar-logo">
        <Link to="/admin" >Admin</Link>
      </div>
      <button className="toggle-btn border-0" type="button" onClick={toggleSidebar}>
        <i className={`bx ${isExpanded ? "bxs-chevrons-left" : "bxs-chevrons-right"}`}></i>
      </button>
    </div>

    {/* Sidebar content */}
    <ul className="sidebar-nav">
      <li className="sidebar-item">
        <a className="sidebar-link has-dropdown" onClick={() => toggleDropdown("multi")}> 
          <i className='bx bxs-user-account'></i>
          <span>List</span>
        </a>
        {dropdowns.multi && (
          <ul className="sidebar-dropdown list-unstyled">
            <li className="sidebar-item">
              <Link to="/admin/adminList" className="sidebar-link">List Sản Phẩm</Link>
              <Link to="/header-project" className="sidebar-link">List User</Link>
            </li>
          </ul>
        )}
      </li>
    </ul>

    <div className="sidebar-footer">
      <a className="sidebar-link">
        <i className="bx bxs-log-out"></i>
        <span> LogOut</span>
      </a>
    </div>
  </aside>

  
</div>

        
        
        </>
    );
};

export default Sidebar;
