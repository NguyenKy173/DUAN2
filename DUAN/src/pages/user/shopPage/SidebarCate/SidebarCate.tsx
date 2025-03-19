// import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
const SidebarCate = () => {
  return (
    <div>
        <h2 className="font-semibold text-xl mb-4">Categories</h2>
                <ul>
                    <li className="text-yellow-600 font-medium mb-2"><a href=""></a>Cafe chair</li>
                    <li className="text-[#737373] font-medium mb-2 hover:text-yellow-600"><Link to = "">Sofa</Link></li>
                    <li className="text-[#737373] font-medium mb-2 hover:text-yellow-600"><Link to = "">Lamp</Link></li>
                    <li className="text-[#737373] font-medium mb-2 hover:text-yellow-600"><Link to = "">Carpet</Link></li>
                    <li className="text-[#737373] font-medium mb-2 hover:text-yellow-600"><Link to = "">Cabinet</Link></li>
                    <li className="text-[#737373] font-medium  hover:text-yellow-600"><Link to = "">Tea table</Link></li>
                </ul>
    </div>
  )
}

export default SidebarCate
