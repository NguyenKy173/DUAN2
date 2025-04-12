import { useEffect, useMemo, useState } from "react";

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

  useEffect(() => {
    if (!userId) {
      console.warn("Vui lòng đăng nhập");
      return;
    }

    const loadCart = async () => {
      const data = await fetchData(`${API_CARTS}?userId=${userId}`);
      setCart(data && data.length > 0 ? data[0].items : []);
    };

    loadCart();
  }, []);

  // const updateCart = async (newCart: CartItem[]) => {
  //   if (!userId) return;

  //   try {
  //     const cartData = await fetchData(`${API_CARTS}?userId=${userId}`);

  //     if (cartData && cartData.length > 0) {
  //       await fetchData(`${API_CARTS}/${cartData[0].id}`, {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ userId, items: newCart }),
  //       });
  //     } else {
  //       await fetchData(API_CARTS, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ userId, items: newCart }),
  //       });
  //     }

  //     setCart(newCart);
  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //   }
  // };
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
  
      // ✅ Sau khi update thành công → cập nhật lại state ngay
      setCart([...newCart]); // tạo mảng mới để trigger re-render
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  
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

  const removeFromCart = (productId: number) => {
    updateCart(cart.filter((item) => item.productId !== productId));
  };

  const increaseQuantity = (productId: number) => {
    updateCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    updateCart(
      cart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
  
    const response = await fetch(`http://localhost:3000/carts?userId=${userId}`);
    const carts = await response.json();
    if (!carts.length) return;
  
    const cartId = carts[0].id;
  
    await fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [] }),
    });
  
    setCart([]); // ← hàm này cập nhật state trong hook (dùng useState hoặc useEffect)
  };
  

  // ✅ Đếm tổng số sản phẩm trong giỏ hàng
  const cartQuantity = useMemo(() => {
    const uniqueIds = new Set(cart.map(item => item.productId));
    return uniqueIds.size;
  }, [cart]);

  return {
    cart,
    cartQuantity, // 👉 Biến này sẽ tự cập nhật mỗi khi cart thay đổi
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
};
