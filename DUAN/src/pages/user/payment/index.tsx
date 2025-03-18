const Payment = () => {
    return (
        <>
        <section className="container max-w-screen-xl m-auto">
            <h1 className="font-semibold text-[40px] mt-16 mb-8">Billing details</h1>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <form action="">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <label  className="font-medium " >Firstname</label>
                                <input type="text" name="firstname" className="border border-solid border-neutral-300 block w-full outline-none p-2 mt-2"/>
                            </div>
                            <div>
                                <label  className="font-medium ">Lastname</label>
                                <input type="text" name="lastname" className="border border-solid border-neutral-300 block w-full outline-none p-2 mt-2"/>
                            </div>
                        </div>
                        <div className="mt-8">
                            <label  className="font-medium ">Company Name (Optional)</label>
                            <input type="text" name="company" className="block w-full p-2 border border-solid border-neutral-300 outline-none mt-2"/>
                        </div>
                        <div className="mt-8">
                            <label  className="font-medium ">Country / Region</label>
                            <div className="border border-solid border-neutral-300 p-2 mt-2">
                                <select name="country" id="" className="w-full  ">
                                    <option value="" className="hidden">Choose your country</option>
                                    <option value="vietnam">Viet nam</option>
                                    <option value="america">America</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-8">
                            <label  className="font-medium ">Street address</label>
                            <input type="text" name="address" className="block w-full p-2 border border-solid border-neutral-300 outline-none mt-2"/>
                        </div>
                        <div className="mt-8">
                            <label className="font-medium ">Town/City</label>
                            <input type="text" name="city" className="block w-full p-2 border border-solid border-neutral-300 outline-none mt-2"/>
                        </div>
                        <div className="mt-8">
                            <label  className="font-medium ">Province</label>
                            <div className="border border-solid border-neutral-300 p-2 mt-2">
                                <select name="country" id="" className="w-full  ">
                                    <option value="" className="hidden">Choose your province</option>
                                    <option value="vietnam">Viet nam</option>
                                    <option value="america">America</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-8">
                            <label className="font-medium ">ZIP code</label>
                            <input type="text" name="code" className="block w-full p-2 border border-solid border-neutral-300 outline-none mt-2"/>
                        </div>
                        <div className="mt-8">
                            <label  className="font-medium ">Phone</label>
                            <input type="text" name="phone" className="block w-full p-2 border border-solid border-neutral-300 outline-none mt-2"/>
                        </div>
                        <div className="mt-8">
                            <label  className="font-medium ">Email address</label>
                            <input type="text" name="email" className="block w-full p-2 border border-solid border-neutral-300 outline-none mt-2"/>
                        </div>
                    </form>
                </div>
                {/* <!-- END FORM --> */}
                <div>
                    <p className="*:font-semibold *:text-2xl flex justify-between">
                        <span>Product</span>
                        <span>Subtotal</span>
                    </p>
                    <p className="flex justify-between mt-4">
                        <span className="text-neutral-500">Asgaard sofa <b className="font-medium text-black">X1</b></span>
                        <span className="font-medium">25.000.000đ</span>
                    </p>
                    <p className="flex justify-between  mt-4">
                        <span >Subtotal</span>
                        <span className="font-medium">25.000.000đ</span>
                    </p>
                    <p className="flex justify-between  mt-4">
                        <span >Total</span>
                        <span className="font-bold text-xl text-yellow-500">25.000.000đ</span>
                    </p>
                    <hr className="my-8 border border-neutral-300"/>
                    <div className="mt-8">
                        <div>
                            <input type="radio" name="payment-method"/>
                            <span className="font-medium ml-2">Direct Bank Transfer</span>
                            <p className="text-[#A3A3A3] mt-3">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                        </div>
                        <div className="my-4">
                            <input type="radio" name="payment-method"/>
                            <span className="font-medium text-[#A3A3A3] ml-2 ">ATM Bank Transfer</span>
                        </div>
                        <div >
                            <input type="radio" name="payment-method"/>
                            <span className="font-medium text-[#A3A3A3] ml-2 ">Cash On Delivery</span>
                        </div>
                    </div>
                    {/* <!-- END PAYMENT-METHOD --> */}
                     <p className=" text-[#262626]">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <span className="font-semibold">privacy policy.</span> </p>
                     <div className="text-center mt-8">
                        <a href="./index.html" className="border border-solid border-yellow-600 text-yellow-600 font-semibold py-2 px-24 inline-block hover:bg-yellow-600 hover:text-white">Place order</a>
                     </div>
                </div>
            </div>
            
            
        </section>
        </>
    )
}

export default Payment;