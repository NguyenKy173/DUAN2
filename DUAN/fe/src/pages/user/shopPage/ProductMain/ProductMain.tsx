// import { useCart } from "../../../../contact/cartContact";
import { useCartContext } from "../../../../contact/CartContext";
import "./ProductMain.css";
import { Link } from "react-router-dom";

const ProductMain = ({ filterProducts }) => {
    const {addToCart} = useCartContext();
    const fomatter = (Number:any) => {
        return new Intl.NumberFormat("vi-VN",{
            style:"currency",
            currency:"VND"
        }).format(Number)
    }
  return (
    
    <div className="grid grid-cols-3 gap-8">
        {
            filterProducts.map((item:any)=>{
                return(
                <div>
                <div className="overflow-hidden">
                    <Link to={`/${item.id}/productdetail`}><img src={item.image} alt="" className="w-full h-64 object-cover hover:scale-125 duration-1000" /></Link>
                </div>
                <div className="bg-[#F5F5F5] p-4">
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <p className="text-[#898989] text-base mt-1 mb-2">{item.description}</p>
                    <p className="font-semibold text-xl text-red-600 mb-3">{ fomatter(item.price)}</p>
                    <Link to="/cart">
                    <button 
                                onClick={(e) => {
                                    e.preventDefault(); // Ngăn chặn hành động điều hướng trước khi thêm vào giỏ hàng
                                    const userId = localStorage.getItem("userId");
                                    if (!userId) {
                                        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
                                        return;
                                    }
                                    addToCart(item.id);
                                }}
                                className="border border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white transition"
                                >
                                Add to Cart
                            </button>
                  </Link>
                </div>
            </div>
            )})
        }
    </div>
  );
};

export default ProductMain;
