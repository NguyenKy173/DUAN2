import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../contact/CartContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Payment = () => {
  const nav = useNavigate();
  const { cart, clearCart } = useCartContext();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Bạn cần đăng nhập để thanh toán!");
      return;
    }

    fetch(`http://localhost:3000/carts?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCartData(data[0].items);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy giỏ hàng:", error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Bạn cần đăng nhập để đặt hàng!");
      return;
    }

    try {
      const cartResponse = await fetch(`http://localhost:3000/carts?userId=${userId}`);
      const carts = await cartResponse.json();

      if (!carts.length) {
        alert("Không tìm thấy giỏ hàng của bạn!");
        return;
      }

      const cartId = carts[0].id;

      const newOrder = {
        id: `DH${Math.floor(Math.random() * 1000000)}`,
        userId,
        totalPrice: cartData.reduce((total, item) => total + item.price * item.quantity, 0),
        status: "Đang xử lý",
        paymentMethod: formData.paymentMethod,
        information: { ...formData },
        items: cartData.map((item) => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),
        createdAt: new Date().toISOString(),
      };

      const orderResponse = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!orderResponse.ok) {
        throw new Error("Lỗi khi tạo đơn hàng");
      }

      if (formData.paymentMethod === "Online") {
        const totalAmount = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
        try {
          const response = await fetch("http://localhost:3002/create_payment_url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: totalAmount,
              orderId: `DH${Math.floor(Math.random() * 1000000)}`,
              orderInfo: `Thanh toán đơn hàng`,
            }),
          });
      
          const result = await response.json();
      
          if (result.paymentUrl) {
            // 👉 redirect tới VNPAY trước, đơn hàng tạo sau khi thanh toán về returnUrl
            window.location.href = result.paymentUrl;
            return;
          } else {
            alert("Không tạo được liên kết thanh toán VNPAY");
            return;
          }
        } catch (error) {
          console.error("❌ Lỗi khi gọi API tạo thanh toán VNPAY:", error);
          return;
        }
      }
      

      // ✅ Nếu chọn COD: xoá giỏ hàng và reload lại cartData
      // Sau khi PATCH xong
      await clearCart(); // ← xóa cả trên server và update state

        alert("Đặt hàng thành công!");

        setTimeout(() => {
          nav("/ok");
        }, 300);
      }
       catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  return (
    <section className="container max-w-screen-xl m-auto mb-4">
      <h1 className="font-semibold text-[32px] mt-16 mb-8">Billing Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form>
            <div className="mt-4">
              <label className="font-medium">Họ và tên</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border border-solid border-neutral-300 block w-full p-2 mt-2 outline-none" />
            </div>
            <div className="mt-4">
              <label className="font-medium">Địa chỉ</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="border border-solid border-neutral-300 block w-full p-2 mt-2 outline-none" />
            </div>
            <div className="mt-4">
              <label className="font-medium">Số điện thoại</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="border border-solid border-neutral-300 block w-full p-2 mt-2 outline-none" />
            </div>
            <div className="mt-4">
              <label className="font-medium">Phương thức thanh toán</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="border border-solid border-neutral-300 block w-full p-2 mt-2 outline-none">
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="Online">Thanh toán online</option>
              </select>
            </div>
          </form>
        </div>
        <div>
          <p className="font-semibold text-2xl flex justify-between">
            <span>Sản phẩm</span>
            <span>Giá</span>
          </p>
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <p key={item.id} className="flex justify-between mt-4">
                <span className="text-neutral-500">
                  {item.name} <b className="font-medium text-black">X{item.quantity}</b>
                </span>
                <span className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</span>
              </p>
            ))
          ) : (
            <p className="text-gray-500 mt-4">Không có sản phẩm trong giỏ hàng</p>
          )}
          <p className="flex justify-between mt-4">
            <span>Tổng tiền</span>
            <span className="font-bold text-xl text-yellow-500">
              {cartData.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}đ
            </span>
          </p>
          <hr className="my-8 border border-neutral-300" />
          <div className="text-center mt-8">
            <button onClick={handlePlaceOrder} className="border border-solid border-yellow-600 text-yellow-600 font-semibold py-2 px-24 inline-block hover:bg-yellow-600 hover:text-white">
              {formData.paymentMethod === "COD" ? "Đặt hàng" : "Thanh toán ngay"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
