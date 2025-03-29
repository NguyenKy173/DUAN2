import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      // Lấy danh sách users từ API
      const res = await fetch("http://localhost:3000/user");
      const users = await res.json();

      // Kiểm tra user có tồn tại không
      const user = users.find((u: any) => u.username === username && u.password === password);

      if (user) {
        // ✅ Lưu userId vào localStorage
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);

        alert("Đăng nhập thành công!");
        navigate("/"); // Điều hướng sang trang chính
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Đăng nhập
        </button>
        
        {/* Thêm dòng "Chưa có tài khoản? Đăng ký" */}
        <div className="mt-4 text-center">
          <span>Chưa có tài khoản? </span>
          <button
            onClick={() => navigate("/signup")}  // Điều hướng đến trang đăng ký
            className="text-blue-500 hover:underline"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
