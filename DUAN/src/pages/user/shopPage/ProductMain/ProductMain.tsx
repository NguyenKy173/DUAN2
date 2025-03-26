import "./ProductMain.css";
import { Link } from "react-router-dom";

const ProductMain = ({ filterProducts }) => {
  return (
    
    <div className="grid grid-cols-3 gap-8">
        {
            filterProducts.map((item:any)=>{
                return(
                <div>
                <div className="overflow-hidden">
                    <Link to="/productdetail"><img src={item.image} alt="" className="hover:scale-125 duration-1000"/></Link>
                </div>
                <div className="bg-[#F5F5F5] p-4">
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <p className="text-[#898989] text-base mt-1 mb-2">{item.description}</p>
                    <p className="font-semibold text-xl text-red-600 mb-3">{item.price}</p>
                    <button
                        className="border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:text-white hover:bg-yellow-700"><Link to = "/cart">Add to cart</Link></button>
                </div>
            </div>
            )})
        }
    </div>
  );
};

export default ProductMain;
