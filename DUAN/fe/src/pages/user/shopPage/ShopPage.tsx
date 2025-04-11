import { Link } from "react-router-dom";
import "./ShopPage.css";
import SidebarCate from "./SidebarCate/SidebarCate";
import ProductMain from "./ProductMain/ProductMain";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  categoryId: number,
}
const fetchCategories = async () => {
  const res = await fetch("http://localhost:3000/categories");
  return res.json();
};
const fetchProduct = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
  return response.json();
};
const ShopPage = () => {
  const [filterCategory, setfilterCategory] = useState(0);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const filterProducts = filterCategory== 0 ? products : products?.filter((item)=>filterCategory== item.categoryId);
  console.log(filterProducts);
  
  return (
    <div>
      
      <section className="container max-w-screen-xl m-auto grid grid-cols-12 gap-8 mt-16">
        <div className="col-span-3">
          <SidebarCate
            categories={categories}
            filterCategory={filterCategory}
            setfilterCategory={setfilterCategory}
          />
        </div>
        {/* <!-- End Categories --> */}
        <div className=" col-span-9 ">
          <ProductMain filterProducts={filterProducts}/>
          {/* <!-- End Product --> */}
          <div className="mt-8">
            <a
              href=""
              className="py-2 px-4 bg-yellow-600 inline-block text-white font-bold rounded-md"
            >
              1
            </a>
            <a
              href=""
              className="py-2 px-4 bg-neutral-400 inline-block text-white font-bold rounded-md"
            >
              2
            </a>
            <a
              href=""
              className="py-2 px-4 bg-neutral-400 inline-block text-white font-bold rounded-md"
            >
              3
            </a>
            <a
              href=""
              className="py-2 px-4 bg-neutral-400 inline-block text-white font-bold rounded-md"
            >
              Next
            </a>
          </div>
          {/* <!-- End Pagination --> */}
        </div>
      </section>
      {/* <!-- End Section Products --> */}
      <section className="bg-[#FFF7ED] py-16 mt-16">
        <div className="container max-w-screen-xl m-auto grid grid-cols-4">
          <div className="flex gap-5 items-center">
            <Link to="">
              <img src="assets/image/quantity-1.png" alt="" />
            </Link>
            <div>
              <h3 className="font-semibold text-xl mb-1">High Quality</h3>
              <p className="text-[#898989]">Crafted from top materials</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <Link to="">
              <img src="assets/image/quantity-2.png" alt="" />
            </Link>
            <div>
              <h3 className="font-semibold text-xl mb-1">24 / 7 Support</h3>
              <p className="text-[#898989]">Dedicated support</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <Link to="">
              <img src="assets/image/quantity-3.png" alt="" />
            </Link>
            <div>
              <h3 className="font-semibold text-xl mb-1">
                Warranty Protection
              </h3>
              <p className="text-[#898989]">Over 2 years</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <Link to="">
              <img src="assets/image/quantity-4.png" alt="" />
            </Link>
            <div>
              <h3 className="font-semibold text-xl mb-1">Free Shipping</h3>
              <p className="text-[#898989]">Order over 150 $</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
