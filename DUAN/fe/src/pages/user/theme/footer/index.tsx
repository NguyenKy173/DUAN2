import { Link } from "react-router-dom";
const Footer = () =>{
    return (
        <>
        <footer className="bg-[#262626] text-white pt-16 pb-8">
        <div className="grid grid-cols-4 gap-8 container max-w-screen-xl m-auto mb-16">
            <div>
                <img src="./logo2.svg" alt="" className="mb-4"/>
                <p>400 University Drive Suite 200 Coral Gables,FL 33134 USA</p>
            </div>
            <div>
                <h3 className="font-semibold text-xl mb-4">Sitemap</h3>
                <ul>
                    <li className="mb-4"><Link to="/">Home</Link></li>
                    <li className="mb-4"><Link to="/shop">Shop</Link></li>
                    <li className="mb-4"><Link to="">About</Link></li>
                    <li><Link to="">Contact</Link></li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-xl mb-4">Help</h3>
                <ul>
                    <li className="mb-4"><a href="">Payment Options</a></li>
                    <li className="mb-4"> <a href="">Returns</a></li>
                    <li ><a href="">Privacy Policies</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-xl mb-4">Location</h3>
                <ul>
                    <li className="mb-4"><a href="">support@euphoria.in</a></li>
                    <li className="mb-4"> <a href="">Ahmedabad Main Road</a></li>
                    <li ><a href="">Udaipur, India- 313002</a></li>
                </ul>
            </div>
        </div>
        
        {/* <p className="text-center mt-8 ">Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved</p> */}
        <p className="text-center mt-8 ">Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved</p>
     </footer>
        </>
    )
}
export default Footer;