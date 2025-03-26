import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Payment = () => {
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    paymentMethod: "COD", // Mặc định là thanh toán khi nhận hàng
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cartData");
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    const newOrder = {
      id: Math.floor(Math.random() * 1000000), // Tạo mã đơn hàng ngẫu nhiên
      date: new Date().toLocaleDateString(),
      total: cartData.reduce((total, item) => total + item.price * item.quantity, 0),
      status: "Đang xử lý",
      items: cartData,
    };
  
    // Lấy danh sách đơn hàng hiện tại từ localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    storedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(storedOrders)); // Lưu lại đơn hàng mới
  
    if (formData.paymentMethod === "COD") {
      alert("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
    } else {
      alert("Chuyển hướng đến trang thanh toán online...");
    }
  
    // Xóa giỏ hàng khỏi localStorage và cập nhật state
    localStorage.removeItem("cartData");
    setCartData([]); // Cập nhật UI
  };

  return (
    <section className="container max-w-screen-xl m-auto mb-4">
      <h1 className="font-semibold text-[32px] mt-16 mb-8">Billing Details</h1>
      <div className="grid grid-cols-2 gap-8">
        {/* FORM THANH TOÁN */}
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
              <label className="font-medium">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="border border-solid border-neutral-300 block w-full p-2 mt-2 outline-none" />
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

        {/* TÓM TẮT GIỎ HÀNG */}
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
