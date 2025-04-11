import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async () => {
  const response = await axios.get("http://localhost:3000/orders");
  return response.data;
};

const updateOrderStatus = async ({ id, status }) => {
  const response = await axios.patch(`http://localhost:3000/orders/${id}`, {
    status,
  });
  return response.data;
};

const AdminOrderList = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const mutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleStatusChange = (orderId, newStatus) => {
    mutation.mutate({ id: orderId, status: newStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Mã đơn</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Người mua</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">SĐT</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Địa chỉ</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Thanh toán</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Tổng tiền</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Ngày</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-blue-600">{order.id}</td>
                <td className="px-4 py-3">{order.information?.name || "N/A"}</td>
                <td className="px-4 py-3">{order.information?.phone || "N/A"}</td>
                <td className="px-4 py-3">{order.information?.address || "N/A"}</td>
                <td className="px-4 py-3">{order.information?.paymentMethod || "N/A"}</td>
                <td className="px-4 py-3 text-red-600 font-semibold">
                  {order.totalPrice.toLocaleString()}đ
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 bg-white"
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Hoàn tất">Hoàn tất</option>
                    <option value="Đã huỷ">Đã huỷ</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderList;
