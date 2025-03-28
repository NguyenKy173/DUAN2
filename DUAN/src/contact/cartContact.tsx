import { useEffect, useState } from "react";

interface CartItem {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

const API_CARTS = "http://localhost:3000/carts";
const API_PRODUCTS = "http://localhost:3000/products";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const userId = localStorage.getItem("userId");

  // ✅ Hàm gọi API chung, giảm code lặp
  const fetchData = async (url: string, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("API Fetch Error:", error);
      return null;
    }
  };

  // ✅ Chỉ load giỏ hàng khi component mount
  useEffect(() => {
    if (!userId) {
      console.warn("No userId found in localStorage");
      return;
    }

    const loadCart = async () => {
      const data = await fetchData(`${API_CARTS}?userId=${userId}`);
      setCart(data && data.length > 0 ? data[0].items : []);
    };

    loadCart();
  }, []);

  // ✅ Hàm cập nhật giỏ hàng, tránh fetch không cần thiết
  const updateCart = async (newCart: CartItem[]) => {
    if (!userId) return;

    try {
      const cartData = await fetchData(`${API_CARTS}?userId=${userId}`);

      if (cartData && cartData.length > 0) {
        await fetchData(`${API_CARTS}/${cartData[0].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, items: newCart }),
        });
      } else {
        await fetchData(API_CARTS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, items: newCart }),
        });
      }

      setCart(newCart); // ✅ Cập nhật state ngay lập tức, không cần fetch lại
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // ✅ Thêm sản phẩm vào giỏ hàng
  const addToCart = async (productId: number) => {
    if (!productId) return;

    try {
      const product = await fetchData(`${API_PRODUCTS}/${productId}`);
      if (!product) return console.error("Product not found!");

      const existingItem = cart.find((item) => item.productId === product.id);
      const newCart = existingItem
        ? cart.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cart, { productId: product.id, name: product.name, image: product.image, quantity: 1, price: product.price }];

      updateCart(newCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId: number) => {
    updateCart(cart.filter((item) => item.productId !== productId));
  };

  // ✅ Tăng số lượng sản phẩm
  const increaseQuantity = (productId: number) => {
    updateCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ✅ Giảm số lượng sản phẩm
  const decreaseQuantity = (productId: number) => {
    updateCart(
      cart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ✅ Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    updateCart([]);
  };

  return { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart };
};
