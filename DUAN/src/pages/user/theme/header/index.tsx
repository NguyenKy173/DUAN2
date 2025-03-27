import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import "./style.css"
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
        <section className="container max-w-screen-xl m-auto flex item-center justify-between py-4">
            <img src="./logo.png" alt=""/>
            <ul className="flex gap-8 font-medium text-xl">
                
                <li className="hover:hover:text-amber-500"><Link to ="/">Home</Link></li>
                <li className="hover:hover:text-amber-500"><Link to ="/shop">Shop</Link></li>
                <li className="hover:hover:text-amber-500"><Link to ="">About</Link></li>
                <li className="hover:hover:text-amber-500"><Link to ="">Contact</Link></li>
            </ul>
            {/* <div className="flex gap-4">
                <span className="material-symbols-outlined">person</span>
                <span className="material-symbols-outlined">search</span>
                <span className="material-symbols-outlined">favorite</span>
                <span className="material-symbols-outlined">shopping_cart</span>
            </div> */}
            <div className="flex gap-4">
                <span className="material-symbols-outlined icon"><Link to ="/homeuser"><AiOutlineUser /></Link></span>
                <span className="material-symbols-outlined icon"><AiOutlineSearch /></span>
                <span className="material-symbols-outlined icon"><AiOutlineHeart /></span>
                <span className="material-symbols-outlined icon"  ><Link to='cart'><AiOutlineShoppingCart /></Link></span>
            </div>
        </section>
   
        </>
    )
}
export default Header;