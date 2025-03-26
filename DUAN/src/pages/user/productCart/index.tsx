const ProductCart = () => {
    return (
        <>
        <main>
        <section className="container max-w-screen-xl m-auto grid grid-cols-12 gap-8 my-16">
                <div className="col-span-8">
                    <table className="w-full ">
                        <thead >
                            <tr className="bg-neutral-100 *:py-4 *:font-medium">
                                <th className="text-left pl-4">Product</th>
                                <th >Price</th>
                                <th >Quantity</th>
                                <th >Subtotal</th>
                                <th ></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="*:py-4 *:text-center">
                                <td className="!text-left"><img src="./jjj.jpg" alt="" className="inline" /><span className="font-medium text-neutral-400 ml-4">Asgaard sofa</span></td>
                                <td className="text-neutral-400 ">25.00.000đ</td>
                                <td>1</td>
                                <td>25.00.000đ</td>
                                <td><span className="material-icons text-red-500" >delete</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-span-4 bg-neutral-100 p-8">
                    <h2 className="font-semibold text-2xl mb-4">Cart total</h2>
                    <hr className="border-[#A3A3A3] mb-5" />
                    <p className="flex justify-between items-center mb-4">
                        <span className="font-medium ">Subtotal</span>
                        <span className="font-medium text-[#A3A3A3]">25.000.000đ</span>
                    </p>
                    <p className=" *:font-medium flex justify-between items-center mb-8">
                        <span>Total</span>
                        <span className="font-bold text-red-600 text-[20px]">25.000.000đ</span>
                    </p>
                    <a href="./payment.html" className="border border-solid border-yellow-500 text-yellow-500 w-full inline-block text-center py-2 hover:bg-yellow-500 hover:text-white">Check out</a>


                </div>

            </section>
            
        </main>
        </>
    )
}

export default ProductCart;