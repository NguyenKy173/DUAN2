
import { useCartContext } from "../../../contact/CartContext";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCartContext();

  // Tính tổng số lượng sản phẩm
  const totalItems = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  
  // Tính tổng tiền giỏ hàng
  const totalPrice = cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  return (
    <main>
      <section className="container max-w-screen-xl m-auto grid grid-cols-12 gap-8 my-16">
        {/* Bảng sản phẩm */}
        <div className="col-span-8">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100 *:py-4 *:font-medium">
                <th className="text-left pl-4">Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.productId} className="*:py-4 *:text-center">
                    <td className="!text-left flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="inline mr-4 w-[80px] h-[80px] object-cover rounded"
                      />
                      <span className="font-medium text-[#A3A3A3]">{item.name}</span>
                    </td>
                    <td className="font-medium text-[#A3A3A3]">{item.price.toLocaleString()}đ</td>
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
                          onClick={() => decreaseQuantity(item.productId)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          onClick={() => increaseQuantity(item.productId)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</td>
                    <td>
                      <button onClick={() => removeFromCart(item.productId)}>
                        <MdDelete className="text-red-500 text-xl hover:text-red-700" />
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

        {/* Tổng kết giỏ hàng */}
        <div className="col-span-4 bg-neutral-100 p-8 rounded-lg shadow-md">
          <h2 className="font-semibold text-2xl mb-4">Cart Summary</h2>
          <p className="*:font-medium flex justify-between items-center mb-4">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </p>
          <p className="*:font-medium flex justify-between items-center mb-4">
            <span>Total Price</span>
            <span className="text-[#A3A3A3]">{totalPrice.toLocaleString()}đ</span>
          </p>

          {cart && cart.length > 0 && (
            <>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-700"
              >
                Clear Cart
              </button>
              <Link
                to="/payment"
                className="border border-yellow-500 text-yellow-600 w-full inline-block text-center py-2 rounded-lg hover:bg-yellow-600 hover:text-white mt-4"
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
