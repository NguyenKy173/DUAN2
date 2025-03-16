import React from 'react'
import './CartPage.css'
import { MdDelete } from "react-icons/md";
const CartPage = () => {
  return (
    <div>
       <main>
        <section className="container max-w-screen-xl m-auto grid grid-cols-12 gap-8 my-16">
            <div className="col-span-8">
                <table className="w-full">
                    <thead >
                        <tr className=" bg-neutral-100 *:py-4 *:font-medium">
                            <th className="text-left pl-4">Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="*:py-4 *:text-center">
                            <td className="!text-left">
                                <img src="./image 1.png" alt="" className="inline mr-4 w-[80px]"/>
                                <span className="font-medium text-[#A3A3A3]">Asgaard sofa</span>
                            </td>
                            <td className="font-medium text-[#A3A3A3]"> 25.000.000đ</td>
                            <td className="font-medium">1</td>
                            <td className="font-medium">25.000.000đ</td>
                            <td><span className="material-icons text-red-500 text-500 icons"><MdDelete/></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-span-4 bg-neutral-100 p-8">
                <h2 className="font-semibold text-2xl mb-4">Cart Title</h2>
                <hr className="border-[#A3A3A3] mb-5"/>
                <p className="*:font-medium flex justify-between items-center mb-4">
                    <span>Subtotal</span>
                    <span className="text-[#A3A3A3]">25.000.000</span>
                </p>
                <p className="*:font-medium flex justify-between items-center mb-8">
                    <span>Total</span>
                    <span className="font-bold text-red-500 text-[20px]">25.000.000</span>
                </p>
                <a href="" className="border border-solid border-yellow-500 text-yellow-600 w-full inline-block text-center py-2 hover:bg-yellow-600 hover:text-white ">Checkout</a>
            </div>
        </section>
     </main>
    </div>
  )
}

export default CartPage
