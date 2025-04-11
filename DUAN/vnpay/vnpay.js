import crypto from "crypto";
import moment from "moment";
import qs from "qs";

// Thông tin cấu hình sandbox
const vnp_TmnCode = "66QNOKCP";
const vnp_HashSecret = "T81OTBC0C65G10SJ7Z13JT4FT4HSSCQS";
const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = "http://localhost:5173/vnpay_return";

// Sắp xếp object theo thứ tự alphabet
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

export function createPaymentUrl(req, res) {
  const { amount, orderId, bankCode = "" } = req.body;

  const createDate = moment().format("YYYYMMDDHHmmss");
  const txnRef = orderId || `ORDER_${Date.now()}`;

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    "127.0.0.1";

  if (ipAddr === "::1") ipAddr = "127.0.0.1";

  // ⚠️ Bắt buộc nhân 100
  const amountFinal = Number(amount) * 100;

  let vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode,
    vnp_Locale: "vn",
    vnp_CurrCode: "VND",
    vnp_TxnRef: txnRef,
    vnp_OrderInfo: `Thanh toán đơn hàng ${txnRef}`,
    vnp_OrderType: "other",
    vnp_Amount: amountFinal.toString(),
    vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  // Nếu có bankCode (nhưng thường sandbox không cần)
  if (bankCode) {
    vnp_Params.vnp_BankCode = bankCode;
  }

  // B1: Sắp xếp và tạo chuỗi ký
  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });

  // B2: Tạo SHA512 HMAC
  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signed = hmac.update(signData).digest("hex");

  // B3: Gắn chữ ký
  sortedParams.vnp_SecureHash = signed;

  // B4: Tạo URL thanh toán
  const paymentUrl = `${vnp_Url}?${qs.stringify(sortedParams, {
    encode: true,
    format: "RFC3986",
  })}`;

  // Trả về frontend
  res.json({ paymentUrl });

  // Log đầy đủ để debug
  console.log("============================");
  console.log("✔️ ĐÃ TẠO URL THANH TOÁN:");
  console.log("➡️ URL:", paymentUrl);
  console.log("🧾 Dữ liệu ký:", signData);
  console.log("🔐 Chữ ký:", signed);
  console.log("============================");
}
