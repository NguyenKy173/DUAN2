import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu và nhập lại mật khẩu không khớp!");
      return;
    }

    try {
      const newUser = { username, email, password };

      // Gửi thông tin đăng ký lên API (cập nhật API URL nếu cần)
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        alert("Đăng ký thành công!");
        navigate("/login"); // Điều hướng về trang đăng nhập sau khi đăng ký thành công
      } else {
        alert("Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký tài khoản</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleSignup}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Đăng ký
        </button>

        <div className="mt-4 text-center">
          <span>Đã có tài khoản? </span>
          <button
            onClick={() => navigate("/login")}  // Điều hướng đến trang đăng nhập
            className="text-blue-500 hover:underline"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
