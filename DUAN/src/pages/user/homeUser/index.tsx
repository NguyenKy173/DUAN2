import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeUser = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <section className="bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Thông tin cá nhân
        </h2>
        <div className="mb-8 grid grid-cols-2 gap-6 text-gray-700">
          <p><strong className="text-gray-900">Họ và tên:</strong> Nguyễn Văn A</p>
          <p><strong className="text-gray-900">Email:</strong> nguyenvana@example.com</p>
          <p><strong className="text-gray-900">Số điện thoại:</strong> 0123 456 789</p>
          <p><strong className="text-gray-900">Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Lịch sử đơn hàng
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-semibold">Mã đơn hàng</th>
                <th className="p-4 text-left font-semibold">Ngày đặt</th>
                <th className="p-4 text-left font-semibold">Tổng tiền</th>
                <th className="p-4 text-left font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4">#{order.id}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">{order.total.toLocaleString()}đ</td>
                    <td className={`p-4 font-medium ${order.status === 'Hoàn thành' ? 'text-green-600' : order.status === 'Đang xử lý' ? 'text-yellow-600' : 'text-red-600'}`}>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">Chưa có đơn hàng nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <Link to='/login' className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
            Đăng xuất
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeUser;
