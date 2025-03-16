import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import "./style.css"
const Header = () => {
    return (
        <>
        <section className="container max-w-screen-xl m-auto flex item-center justify-between py-4">
            <img src="./logo.png" alt=""/>
            <ul className="flex gap-8 font-medium text-xl">
                <li className="hover:hover:text-amber-500"><a href="./index.html">Home</a></li>
                <li className="hover:hover:text-amber-500"><a href="./shop.html">Shop</a></li>
                <li className="hover:hover:text-amber-500"><a href="">About</a></li>
                <li className="hover:hover:text-amber-500"><a href="">Contact</a></li>
            </ul>
            {/* <div className="flex gap-4">
                <span className="material-symbols-outlined">person</span>
                <span className="material-symbols-outlined">search</span>
                <span className="material-symbols-outlined">favorite</span>
                <span className="material-symbols-outlined">shopping_cart</span>
            </div> */}
            <div className="flex gap-4">
                <span className="material-symbols-outlined icon"><AiOutlineUser /></span>
                <span className="material-symbols-outlined icon"><AiOutlineSearch /></span>
                <span className="material-symbols-outlined icon"><AiOutlineHeart /></span>
                <span className="material-symbols-outlined icon"><AiOutlineShoppingCart /></span>
            </div>
        </section>
        </>
    )
}
export default Header;