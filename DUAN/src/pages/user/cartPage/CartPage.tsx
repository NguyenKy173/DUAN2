import { useCart } from "../../../contact/cartContact";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <main>
      <section className="container max-w-screen-xl m-auto grid grid-cols-12 gap-8 my-16">
        <div className="col-span-8">
          <table className="w-full">
            <thead>
              <tr className=" bg-neutral-100 *:py-4 *:font-medium">
                <th className="text-left pl-4">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id} className="*:py-4 *:text-center">
                    <td className="!text-left">
                      <img src={item.image} alt="" className="inline mr-4 w-[80px]" />
                      <span className="font-medium text-[#A3A3A3]">{item.name}</span>
                    </td>
                    <td className="font-medium text-[#A3A3A3]">{item.price.toLocaleString()}đ</td>
                    <td className="font-medium  gap-2">
                      <button
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 "
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="ml-2 mr-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </td>
                    <td className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</td>
                    <td>
                      <button onClick={() => removeFromCart(item.id)}>
                        <MdDelete className="text-red-500 text-500 icons" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Giỏ hàng trống
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-span-4 bg-neutral-100 p-8">
          <h2 className="font-semibold text-2xl mb-4">Cart Summary</h2>
          <hr className="border-[#A3A3A3] mb-5" />
          <p className="*:font-medium flex justify-between items-center mb-4">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </p>
          <p className="*:font-medium flex justify-between items-center mb-4">
            <span>Total Price</span>
            <span className="text-[#A3A3A3]">
              {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}đ
            </span>
          </p>
          {cart.length > 0 && (
            <>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white w-full py-2 hover:bg-red-700"
              >
                Clear Cart
              </button>
              <Link
                to="/payment"
                onClick={() => localStorage.setItem("cartData", JSON.stringify(cart))}
                className="border border-solid border-yellow-500 text-yellow-600 w-full inline-block text-center py-2 hover:bg-yellow-600 hover:text-white mt-4"
                >
                Checkout
            </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default CartPage;
