import crypto from "crypto";
import moment from "moment";
import qs from "qs"; 

// Thông tin cấu hình VNPAY sandbox
const vnp_TmnCode = "66QNOKCP";
const vnp_HashSecret = "T81OTBC0C65G10SJ7Z13JT4FT4HSSCQS";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = "http://localhost:5173/vnpay_return";

// Sắp xếp object theo thứ tự alphabet và loại bỏ các tham số trùng lặp
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort(); // KHÔNG dùng trim ở đây vì key mà sai là phải fix từ đầu
  for (let key of keys) {
    const value = obj[key];
    sorted[key] = typeof value === "string" ? value.trim() : value;
  }
  return sorted;
}
export function createPaymentUrl(req, res) {
  const { amount, orderId, bankCode = "", orderInfo = "" } = req.body;

  const createDate = moment().format("YYYYMMDDHHmmss");
  const txnRef = orderId || `ORDER_${Date.now()}`;
  const ipAddr = "127.0.0.1";
  const amountFinal = Number(amount) * 100;

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: txnRef,
    vnp_OrderInfo: orderInfo || `Thanh toán đơn hàng ${txnRef}`,
    vnp_OrderType: "other",
    // vnp_Amount: amountFinal.toString(),
    vnp_Amount: amountFinal.toFixed(0),
    vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params.vnp_BankCode = bankCode;
  }

  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(signData).digest("hex");

  sortedParams.vnp_SecureHash = signed;

  const paymentUrl = `${vnp_Url}?${qs.stringify(sortedParams, {
    encode: true,
    format: "RFC3986",
  })}`;

  res.json({ paymentUrl });

  // DEBUG LOG
  console.log("============================");
  console.log("✔️ ĐÃ TẠO URL THANH TOÁN:");
  console.log("➡️ URL:", paymentUrl);
  console.log("🧾 Dữ liệu ký:", signData);
  console.log("🔐 Chữ ký:", signed);
  console.log("✅ Params đã ký:", sortedParams);
  console.log("============================");
}

