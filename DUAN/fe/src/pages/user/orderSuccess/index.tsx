import "./orderSuccess.css";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <CheckCircle className="text-green-500 mb-4" size={80} />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
      </p>
      <Link
        to="/"
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default OrderSuccess;
