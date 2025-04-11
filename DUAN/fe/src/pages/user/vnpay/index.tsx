import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const VnpayReturn = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    const responseCode = params.get("vnp_ResponseCode");
    const orderId = params.get("vnp_TxnRef");

    if (responseCode === "00") {
      alert(`Thanh toán đơn hàng ${orderId} thành công!`);
      // Gọi backend để xác nhận hoặc cập nhật đơn hàng
    } else {
      alert("Thanh toán thất bại hoặc bị hủy.");
    }
  }, []);

  return <div className="text-center mt-20">Đang xử lý kết quả thanh toán...</div>;
};

export default VnpayReturn;
