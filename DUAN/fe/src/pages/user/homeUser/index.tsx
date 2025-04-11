import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Item {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  paymentMethod: string; // từ ngoài
  information: {
    name: string;
    address: string;
    phone: string;
    email?: string;
    paymentMethod: string; // trong information cũng có
  };
  items: Item[];
}

interface User {
  id: string;
  username: string;
  role: string;
  email: string;
}

const HomeUser = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Kiểm tra trạng thái đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(!!userId); // Nếu có userId thì set isLoggedIn = true
    };

    checkLoginStatus();

    // Lắng nghe sự thay đổi của localStorage
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const ordersRes = await fetch(`http://localhost:3000/orders?userId=${userId}`);
          const ordersData: Order[] = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };
  
    fetchOrders(); // Fetch lần đầu khi component mount
  
    const interval = setInterval(fetchOrders, 5000); // Cập nhật mỗi 5 giây
  
    return () => clearInterval(interval); // Cleanup khi unmount
  }, []);
  

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");

        if (storedUsername) {
          const userRes = await fetch(`http://localhost:3000/user?username=${storedUsername}`);
          const userData = await userRes.json();
          setUser(userData.length > 0 ? userData[0] : null);
        }

        if (userId) {
          const ordersRes = await fetch(`http://localhost:3000/orders?userId=${userId}`);
          const ordersData: Order[] = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchUserAndOrders();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Xóa userId khỏi localStorage
    setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
    window.dispatchEvent(new Event("storage")); // Cập nhật Header ngay lập tức
    navigate("/");
  };

  const handleCancelOrder = async (orderId: string) => {
    const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
    if (!confirmCancel) return;
  
    try {
      const updatedOrder = { status: "Hủy" };
  
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });
  
      if (!response.ok) {
        throw new Error("Cập nhật đơn hàng thất bại");
      }
  
      // Gọi lại API để lấy danh sách đơn hàng mới nhất
      const userId = localStorage.getItem("userId");
      if (userId) {
        const ordersRes = await fetch(`http://localhost:3000/orders?userId=${userId}`);
        const ordersData: Order[] = await ordersRes.json();
        setOrders(ordersData); // Cập nhật danh sách đơn hàng
      }
  
      alert("Đơn hàng đã được hủy!");
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  
  

  return (
    <section className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Thông tin cá nhân</h2>
        <div className="mb-8 grid grid-cols-2 gap-6 text-gray-700">
          <p><strong className="text-gray-900">Họ và tên:</strong> {user ? user.username : "Không xác định"}</p>
          <p><strong className="text-gray-900">Email:</strong> {user ? user.email : "Không xác định"}</p>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Lịch sử đơn hàng</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-semibold">Mã đơn hàng</th>
                <th className="p-4 text-left font-semibold">Ngày đặt</th>
                <th className="p-4 text-left font-semibold">Tổng tiền</th>
                <th className="p-4 text-left font-semibold">Trạng thái</th>
                <th className="p-4 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                
                orders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">#{order.id}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">{order.totalPrice.toLocaleString()}đ</td>
                    <td className={`p-4 font-medium ${
                      order.status === "Hoàn thành" ? "text-green-600" :
                      order.status === "Đang xử lí" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>{order.status}</td>
                    <td className="p-4 text-center ">
                      <button 
                        onClick={() => setSelectedOrder(order)} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-2">
                        Xem chi tiết
                      </button>
                      {order.status === "Đang xử lý" && (
                        <button 
                          onClick={() => handleCancelOrder(order.id)} 
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                          Hủy
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">Chưa có đơn hàng nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 space-y-6">
      {/* Title */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Đơn hàng #{selectedOrder.id}
        </h2>
        <p className="text-sm text-gray-500">
          Ngày đặt: {new Date(selectedOrder.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Grid thông tin đơn hàng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Thông tin người nhận */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">📦 Người nhận</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>👤 Họ tên:</strong> {selectedOrder.information.name}</p>
            <p><strong>📞 SĐT:</strong> {selectedOrder.information.phone}</p>
            <p><strong>🏠 Địa chỉ:</strong> {selectedOrder.information.address}</p>
            <p><strong>💳 Thanh toán:</strong> {selectedOrder.information.paymentMethod}</p>
          </div>
        </div>

        {/* Card: Thông tin đơn hàng */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">🧾 Chi tiết đơn</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>💰 Tổng tiền:</strong> {selectedOrder.totalPrice.toLocaleString()}đ</p>
            <p>
              <strong>📌 Trạng thái:</strong> 
              <span className={`ml-1 font-medium ${
                selectedOrder.status === "Đang xử lý"
                  ? "text-yellow-600"
                  : selectedOrder.status === "Hoàn tất"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {selectedOrder.status}
              </span>
            </p>
            {/* Nếu cần có thêm mã giao dịch hay gì nữa, thêm ở đây */}
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">🛍️ Sản phẩm đã đặt</h4>
        <div className="space-y-4">
          {selectedOrder.items.map((item, index) => (
            <div
              key={`${selectedOrder.id}-${index}`}
              className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 shadow-sm"
            >
              <img
                src={item.image || "default-image.jpg"}
                alt={item.name || "Sản phẩm"}
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-gray-800">{item.name || "Tên sản phẩm chưa có"}</p>
                <p className="text-gray-600">Giá: {item.price.toLocaleString()}đ</p>
                <p className="text-gray-600">Số lượng: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nút đóng */}
      <div className="flex justify-end">
        <button
          onClick={() => setSelectedOrder(null)}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}


        {isLoggedIn && (
          <div className="mt-8 flex space-x-4 justify-end">
            {user?.role === "1" && (
              <button 
                onClick={() => navigate("/admin")}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                Quản trị viên
              </button>
            )}
            <button 
              onClick={handleLogout} 
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeUser;
