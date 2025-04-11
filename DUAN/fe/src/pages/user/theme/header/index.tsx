import { useState, useEffect } from "react";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../../contact/CartContext";
import "./style.css";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const  context  = useCartContext();
    console.log("Cart context:", context); // nếu là null → chưa vào Provider
    const { cartQuantity } = context;

    useEffect(() => {
        const checkLoginStatus = () => {
            const userId = localStorage.getItem("userId");
            setIsLoggedIn(!!userId); // Kiểm tra nếu có userId thì đặt thành true
        };

        checkLoginStatus();

        // Theo dõi thay đổi trên localStorage
        const handleStorageChange = () => checkLoginStatus();
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <section className="container max-w-screen-xl m-auto flex items-center justify-between py-4">
            <img src="./logo.png" alt="Logo" />

            {/* Menu */}
            <ul className="flex gap-8 font-medium text-xl">
                <li className="hover:text-amber-500"><Link to="/">Home</Link></li>
                <li className="hover:text-amber-500"><Link to="/shop">Shop</Link></li>
                <li className="hover:text-amber-500"><Link to="/about">About</Link></li>
                <li className="hover:text-amber-500"><Link to="/contact">Contact</Link></li>
            </ul>

            {/* Icons */}
            <div className="flex gap-4 items-center">
                <span className="icon"><Link to="/homeuser"><AiOutlineUser /></Link></span>
                <span className="icon"><AiOutlineSearch /></span>
                <span className="icon"><AiOutlineHeart />
                </span>
                <span className="icon relative">
                    
                    <Link to="/cart"><AiOutlineShoppingCart /></Link>
                    {isLoggedIn && cartQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                            {cartQuantity}
                        </span>
                    )}
                </span>

                {/* Chỉ hiển thị nút Đăng nhập nếu chưa đăng nhập */}
                {!isLoggedIn && (
                    <Link 
                        to="/login" 
                        className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                    >
                        Đăng nhập
                    </Link>
                )}
            </div>
        </section>
    );
};

export default Header;
