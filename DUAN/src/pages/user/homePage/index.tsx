import { Link } from "react-router-dom";

const HomePage = () =>{
    return (
        <>
        <section >
         <img src="/banner.jpg" alt="" className="w-full"/>
        </section>
            {/* <!-- End Banner --> */}
        <section className="container max-w-screen-xl m-auto mt-16">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[40px]">New product</h2>
                <a href="/shop.html" className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-base text-yellow-500">View all product</a>
            </div>
            <div className="grid grid-cols-4 gap-8">
                <div>
                    <div className="overflow-hidden">
                        <a href="./product-detail.html"><img src="./image 1.png" alt="" className="hover:scale-125 duration-1000"/></a>
                    </div>
                    <div className="bg-[#F5F5F5] p-4">
                        <h3 className="font-semibold text-xl">Syltherine</h3>
                        <p className="text-[#898989] text-base mt-1 mb-2">Stylish cafe chair</p>
                        <p className="font-semibold text-xl text-red-600 mb-3" >2.500.000đ</p>
                        <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white"><Link to="/productcart">Add to Cart</Link></button>
                    </div>
                </div>
                <div>
                    <div className="overflow-hidden">
                        <a href="./product-detail.html"><img src="./image 1.png" alt="" className="hover:scale-125 duration-1000"/></a>
                    </div>
                    <div className="bg-[#F5F5F5] p-4">
                        <h3 className="font-semibold text-xl">Syltherine</h3>
                        <p className="text-[#898989] text-base mt-1 mb-2">Stylish cafe chair</p>
                        <p className="font-semibold text-xl text-red-600 mb-3" >2.500.000đ</p>
                        <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white"><Link to="/productcart">Add to Cart</Link></button>
                        <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white"><Link to='cart'>Add to cart</Link></button>
                    </div>
                </div>
                <div>
                    <div className="overflow-hidden">
                        <a href="./product-detail.html"><img src="./image 1.png" alt="" className="hover:scale-125 duration-1000"/></a>
                    </div>
                    <div className="bg-[#F5F5F5] p-4">
                        <h3 className="font-semibold text-xl">Syltherine</h3>
                        <p className="text-[#898989] text-base mt-1 mb-2">Stylish cafe chair</p>
                        <p className="font-semibold text-xl text-red-600 mb-3" >2.500.000đ</p>
                        <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white"><Link to="/productcart">Add to Cart</Link></button>
                        <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white"><Link to='cart'>Add to cart</Link></button>
                    </div>
                </div>
                <div>
                    <div className="overflow-hidden">
                        <a href="./product-detail.html"><img src="./image 1.png" alt="" className="hover:scale-125 duration-1000"/></a>
                    </div>
                    <div className="bg-[#F5F5F5] p-4">
                        <h3 className="font-semibold text-xl">Syltherine</h3>
                        <p className="text-[#898989] text-base mt-1 mb-2">Stylish cafe chair</p>
                        <p className="font-semibold text-xl text-red-600 mb-3" >2.500.000đ</p>
                        <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white"><Link to="/productcart">Add to Cart</Link></button>
                        <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white"><Link to='cart'>Add to cart</Link></button>
                    </div>
                </div>
            </div>
        </section>
        <section className="container max-w-screen-xl m-auto mt-16">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[40px]">Gallely</h2>
                <a href="" className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-base text-yellow-500">View all Gallely</a>
            </div>
            <div className="grid grid-cols-3 gap-8 ">
                <img src="./gallery.png" alt=""/>
                <img src="./gallery.png" alt=""/>
                <img src="./gallery.png" alt=""/>
                <img src="./gallery.png" alt=""/>
                <img src="./gallery.png" alt=""/>
                <img src="./gallery.png" alt=""/>
            </div>
        </section>
        <section className="container max-w-screen-xl m-auto mt-16">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[40px]">News</h2>
                <a href="" className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-base text-yellow-500">View all news</a>
            </div>
            <div className="grid grid-cols-4 gap-8">
                <div>
                    <div>
                        <img src="./image 2.jpg" alt=""/>
                    </div>
                    <div>
                        <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1"><span className="material-symbols-outlined mr-2"> calendar_month </span>24/04/2024</p>
                        <h3 className="font-semibold text-xl mb-3">A bedroom must have something like this</h3>
                        <a href="" className="text-red-600 font-semibold text-base flex items-center">Xem chi tiết <span className="material-symbols-outlined ml-2">arrow_forward</span></a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="./image 2.jpg" alt=""/>
                    </div>
                    <div>
                        <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1"><span className="material-symbols-outlined mr-2"> calendar_month </span>24/04/2024</p>
                        <h3 className="font-semibold text-xl mb-3">A bedroom must have something like this</h3>
                        <a href="" className="text-red-600 font-semibold text-base flex items-center">Xem chi tiết <span className="material-symbols-outlined ml-2">arrow_forward</span></a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="./image 2.jpg" alt=""/>
                    </div>
                    <div>
                        <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1"><span className="material-symbols-outlined mr-2"> calendar_month </span>24/04/2024</p>
                        <h3 className="font-semibold text-xl mb-3">A bedroom must have something like this</h3>
                        <a href="" className="text-red-600 font-semibold text-base flex items-center">Xem chi tiết <span className="material-symbols-outlined ml-2">arrow_forward</span></a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src="./image 2.jpg" alt=""/>
                    </div>
                    <div>
                        <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1"><span className="material-symbols-outlined mr-2"> calendar_month </span>24/04/2024</p>
                        <h3 className="font-semibold text-xl mb-3">A bedroom must have something like this</h3>
                        <a href="" className="text-red-600 font-semibold text-base flex items-center">Xem chi tiết <span className="material-symbols-outlined ml-2">arrow_forward</span></a>
                    </div>
                </div>
            </div>
        </section>
        
        </>
    )
}
export default HomePage;