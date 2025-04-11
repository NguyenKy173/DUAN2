// import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const SidebarCate = ({categories,filterCategory,setfilterCategory}) => {  

  return (
    <div>
        <h2 className="font-semibold text-xl mb-4">Categories</h2>
                <ul>
                    <li className={filterCategory===0? `text-yellow-600 font-medium mb-2`: `text-[#737373] font-medium mb-2`} onClick={()=>setfilterCategory(0)}>All</li>
                    {console.log(filterCategory,"filter")}

                    {categories?.map((item:any)=>{
                      // {console.log(item.name,"item")
                      // }
                      return(
                    <li key={item.id} className={filterCategory===item.id ? `text-yellow-600 font-medium mb-2`: `text-[#737373] font-medium mb-2` } onClick={()=>setfilterCategory(item.id)}>
                      {item.name}</li>

                    )})}
                </ul>
    </div>
  )
}

export default SidebarCate
