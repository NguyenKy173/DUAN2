import { Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { useDelete } from "../../../hooks";
import { useListCategories } from "../../../hooks/categoriesHooks";

const AdminList = () => {
  const { mutate } = useDelete({ resource: "products" });
  const { data: categories } = useListCategories({ resource: "categories" });

  const fomatter = (Number: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number);
  };
  const fetchList = async () => {
    const respon = await fetch("http://localhost:3000/products");
    if (!respon.ok) throw new Error("Không tìm thấy sản phẩm");
    return respon.json();
  };
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchList,
  });

  if (isLoading) return <p className="text-center text-lg">Loading........</p>;
  if (isError)
    return <p className="text-center text-red-500">Không tìm thấy sản phẩm</p>;
  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-4xl pb-2">Danh sách sản phẩm</h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ">
        <Link to="/admin/adminAdd"> Thêm mới</Link>
      </button>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden pt-2">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-left">
              <th className="p-4 text-center">#</th>
              <th className="p-4">Ảnh</th>
              <th className="p-4">Tên sản phẩm</th>
              <th className="p-4 text-right">Giá tiền</th>
              <th className="p-4">Mô tả</th>
              <th className="p-4">Danh mục</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.map((product, index) => {
              const category = categories?.find((cate:any) => cate.id === product.categoryId);

              return (
                <tr
                  key={product.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-center text-gray-600">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-right font-semibold text-blue-500">
                    {fomatter(product.price)}
                  </td>
                  <td className="p-4 text-gray-600">{product.description}</td>
                  <td className="p-4 font-semibold text-gray-800">
                    {category ? category.name : "Không xác định"}
                  </td>
                  {/* <td className="p-4 text-center">
                    <button className="mr-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                      <Link to={`/admin/${product.id}/update`}><Pencil size={16} /></Link>
                    </button>
                    <button className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => mutate(product.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                          <Trash2 size={16} />
                        </button>
                      </Popconfirm>
                    </button>
                  </td> */}
                  <td className="p-4 text-center">
                  <button className="mr-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
                    <Link to={`/admin/${product.id}/update`}><Pencil size={16} /></Link>
                  </button>
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => mutate(product.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </Popconfirm>
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
export default AdminList;
