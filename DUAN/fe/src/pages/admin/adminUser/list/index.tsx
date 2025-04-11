import { Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Định nghĩa kiểu cho User
interface User {
  id: string;  // id là chuỗi trong API của bạn
  username: string;
  email: string;
  role: string; // role là chuỗi
}

const AdminList = () => {
  const fetchUsers = async (): Promise<User[]> => {
    const respon = await fetch("http://localhost:3000/user"); // Đảm bảo API trả về danh sách users
    if (!respon.ok) throw new Error("Không tìm thấy người dùng");
    return respon.json();
  };

  const { data: users, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleDelete = async (userId: string) => {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    
    if (confirmDelete) {
      try {
        const respon = await fetch(`http://localhost:3000/user/${userId}`, {
          method: "DELETE",
        });

        if (respon.ok) {
          alert("Đã xóa người dùng thành công!");
        } else {
          alert("Không thể xóa người dùng này!");
        }
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        alert("Đã có lỗi xảy ra khi xóa người dùng!");
      }
    } else {
      alert("Hành động xóa đã bị hủy!");
    }
  };

  if (isLoading) return <p className="text-center text-lg">Loading........</p>;
  if (isError) return <p className="text-center text-red-500">Không tìm thấy người dùng</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-4xl pb-2">Danh sách người dùng</h1>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden pt-2">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-left">
              <th className="p-4 text-center">#</th>
              <th className="p-4">Tên người dùng</th>
              <th className="p-4">Email</th>
              <th className="p-4">Vai trò</th> {/* Cột Vai trò */}
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users?.map((user, index) => (
              <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                <td className="p-4 text-center text-gray-600">{index + 1}</td>
                <td className="p-4 font-medium">{user.username}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4 text-gray-600">
                  {/* Kiểm tra và hiển thị "Admin" hoặc "User" dựa trên giá trị role */}
                  {user.role === "1" ? "Admin" : "User"}
                </td>
                <td className="p-4 text-center">
                  {/* Kiểm tra nếu role của user là "1" thì không hiển thị nút xóa */}
                  {user.role !== "1" && (  // So sánh với "1" (string)
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
