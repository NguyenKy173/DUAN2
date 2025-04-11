import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

// Hàm fetch đơn hàng từ API
const fetchOrders = async () => {
  const response = await axios.get("http://localhost:3000/orders");
  return response.data;
};

// Hàm cập nhật trạng thái đơn hàng
const updateOrderStatus = async ({ orderId, status }: { orderId: string; status: string }) => {
  const response = await axios.patch(`http://localhost:3000/orders/${orderId}`, {
    status,
  });
  return response.data;
};

// Hàm xóa đơn hàng
const deleteOrder = async (orderId: string) => {
  const response = await axios.delete(`http://localhost:3000/orders/${orderId}`);
  return response.data;
};

const OrderHistory = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const navigate = useNavigate(); // Dùng để quay lại trang quản lý đơn hàng
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const mutationUpdateStatus = useMutation({
    mutationFn: updateOrderStatus, // Dùng đúng cách với mutationFn
  });

  const mutationDeleteOrder = useMutation({
    mutationFn: deleteOrder,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  // Lọc các đơn hàng của người dùng
  const userOrders = orders.filter((order) => order.userId === userId);

  const handleStatusChange = (orderId: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    mutationUpdateStatus.mutate({ orderId, status: newStatus });
  };

  const handleDelete = (orderId: string) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
    if (confirmed) {
      mutationDeleteOrder.mutate(orderId);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/admin/adminListOrders")}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Quay lại
      </button>

      <h2 className="text-2xl font-semibold mt-4">Lịch sử đơn hàng</h2>
      {userOrders.length === 0 ? (
        <div>Không có đơn hàng nào.</div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left">Mã đơn hàng</th>
                <th className="p-4 text-left">Ngày mua</th>
                <th className="p-4 text-right">Tổng tiền</th>
                <th className="p-4 text-left">Trạng thái</th>
                <th className="p-4 text-left">Tình trạng</th>
                <th className="p-4 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right font-semibold text-blue-500">
                    {order.totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(event) => handleStatusChange(order.id, event)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đã gửi hàng">Đã gửi hàng</option>
                      <option value="Hoàn thành">Hoàn thành</option>
                      <option value="Hủy">Hủy</option>
                    </select>
                  </td>
                  <td className="p-4">{order.paymentMethod}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
