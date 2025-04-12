// src/pages/admin/adminStatistics.tsx

import { useQuery } from "@tanstack/react-query";

const AdminStatistics = () => {
  const fetchStats = async () => {
    const [orders, products, users] = await Promise.all([
      fetch("http://localhost:3000/orders").then((res) => res.json()),
      fetch("http://localhost:3000/products").then((res) => res.json()),
      fetch("http://localhost:3000/user").then((res) => res.json()),
    ]);
    console.log({ orders, products, users });
    
    return { orders, products, users };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminStats"],
    queryFn: fetchStats,
  });

  if (isLoading) return <p>Đang tải thống kê...</p>;
  if (isError) return <p className="text-red-500">Lỗi tải thống kê</p>;

    const { orders, products, users } = data;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Thống kê</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{products.length}</p>
          <p>Sản phẩm</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{users.length}</p>
          <p>Người dùng</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">{orders.length}</p>
          <p>Đơn hàng</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl text-center">
          <p className="text-2xl font-bold">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalRevenue)}
          </p>
          <p>Doanh thu</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
