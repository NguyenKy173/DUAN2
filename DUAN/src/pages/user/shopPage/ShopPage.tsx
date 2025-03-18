import React from 'react'
import './ShopPage.css'
import SidebarCate from './SidebarCate/SidebarCate'
import ProductMain from './ProductMain/ProductMain'

const ShopPage = () => {
  return (
    <div>
          <section className="container max-w-screen-xl m-auto grid grid-cols-12 gap-8 mt-16">
            <div className="col-span-3">
              <SidebarCate/>
            </div>
            {/* <!-- End Categories --> */}
            <div className=" col-span-9 ">
                <ProductMain/>
                {/* <!-- End Product --> */}
                <div className="mt-8">
                    <a href="" className="py-2 px-4 bg-yellow-600 inline-block text-white font-bold rounded-md">1</a>
                    <a href="" className="py-2 px-4 bg-neutral-400 inline-block text-white font-bold rounded-md">2</a>
                    <a href="" className="py-2 px-4 bg-neutral-400 inline-block text-white font-bold rounded-md">3</a>
                    <a href="" className="py-2 px-4 bg-neutral-400 inline-block text-white font-bold rounded-md">Next</a> 
                </div>
                {/* <!-- End Pagination --> */}
            </div>
        </section>
        {/* <!-- End Section Products --> */}
        <section className="bg-[#FFF7ED] py-16 mt-16">
            <div className="container max-w-screen-xl m-auto grid grid-cols-4">
                <div className="flex gap-5 items-center">
                    <img src="assets/image/quantity-1.png" alt=""/>
                    <div>
                        <h3 className="font-semibold text-xl mb-1">High Quality</h3>
                        <p className="text-[#898989]">Crafted from top materials</p>
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <img src="assets/image/quantity-2.png" alt=""/>
                    <div>
                        <h3 className="font-semibold text-xl mb-1">24 / 7 Support</h3>
                        <p className="text-[#898989]">Dedicated support</p>
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <img src="assets/image/quantity-3.png" alt=""/>
                    <div>
                        <h3 className="font-semibold text-xl mb-1">Warranty Protection</h3>
                        <p className="text-[#898989]">Over 2 years</p>
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <img src="assets/image/quantity-4.png" alt=""/>
                    <div>
                        <h3 className="font-semibold text-xl mb-1">Free Shipping</h3>
                        <p className="text-[#898989]">Order over 150 $</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default ShopPage
