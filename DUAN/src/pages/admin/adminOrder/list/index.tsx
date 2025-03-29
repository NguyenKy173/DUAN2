import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate để chuyển trang
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Hàm fetch người dùng từ API
const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3000/user");
  return response.data;
};

// Hàm fetch đơn hàng từ API
const fetchOrders = async () => {
  const response = await axios.get("http://localhost:3000/orders");
  return response.data;
};

const AdminOrderList = () => {
  const navigate = useNavigate(); // Hook để điều hướng đến trang khác
  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (usersLoading || ordersLoading) {
    return <div>Loading...</div>;
  }

  if (usersError || ordersError) {
    return <div>Error loading data</div>;
  }

  // Lọc người dùng có đơn hàng
  const usersWithOrders = users.filter((user) => {
    return orders.some((order) => order.userId === user.id); // Kiểm tra xem người dùng có đơn hàng hay không
  });

  const handleViewDetails = (userId) => {
    navigate(`/admin/history/${userId}`); // Chuyển đến trang lịch sử đơn hàng với userId
  };

  // Lọc các đơn hàng của người dùng
  const getOrderDetails = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-4xl pb-2">Quản lí đơn hàng</h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden pt-2">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-left">
              <th className="p-4 text-center">#</th>
              <th className="p-4">Tên người dùng</th>
              <th className="p-4">Địa chỉ</th>
              <th className="p-4">Số điện thoại</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {usersWithOrders.map((user, index) => {
              // Lấy đơn hàng của người dùng
              const userOrders = getOrderDetails(user.id);

              // Lấy thông tin địa chỉ và số điện thoại từ đơn hàng
              const userAddress = userOrders[0]?.information?.address || "N/A";
              const userPhone = userOrders[0]?.information?.phone || "N/A";

              return (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-center text-gray-600">{index + 1}</td>
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{userAddress}</td>
                  <td className="p-4">{userPhone}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleViewDetails(user.id)}
                      className="mr-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderList;
