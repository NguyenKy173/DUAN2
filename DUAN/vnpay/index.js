import express from "express";
import cors from "cors";
import { createPaymentUrl } from "./vnpay.js";

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint tạo URL thanh toán
app.post("/create_payment_url", createPaymentUrl);

app.listen(3002, () => {
  console.log("🚀 Server chạy tại http://localhost:3002");
});
