import { Link } from "react-router-dom";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import "./style.css";
import { useCart } from "../../../contact/cartContact";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

//Fetch api từ db
const fetchProduct = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/products");
  if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
  return response.json();
};
const HomePage = () => {
  const { addToCart } = useCart();

  const fomatter = (Number: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number);
  };
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories");
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json();
  };
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Không tìm thấy sản phẩm</p>;

  const responsive: ResponsiveType = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // Custom Nút Trái
  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 hover:bg-yellow-700"
    >
      ❮
    </button>
  );

  // Custom Nút Phải
  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg z-10 hover:bg-yellow-700"
    >
      ❯
    </button>
  );
  return (
    <>
      <section className="container max-w-screen-xl m-auto mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[40px]">New product</h2>
          <Link
            to="/shop"
            className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-base text-yellow-500"
          >
            View all product
          </Link>
        </div>
        <div className="grid  gap-8">
          <Carousel
            responsive={responsive}
            containerClass="relative"
            itemClass="p-2"
            arrows={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {products?.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="overflow-hidden">
                  <Link to={`/${item.id}/productdetail`}>
                    <img
                      src={item.image}
                      alt=""
                      className="hover:scale-110 transition-transform duration-500 w-100"
                    />
                  </Link>
                </div>
                <div className="bg-[#F5F5F5] p-4">
                  <h3 className="font-semibold text-xl">{item.name}</h3>
                  <p className="text-[#898989] text-base mt-1 mb-2">
                    {item.description}
                  </p>
                  <p className="font-semibold text-xl text-red-600 mb-3">
                    {fomatter(item.price)}
                  </p>

                  <Link to="/cart">
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          quantity: 1,
                        })
                      }
                      className="border border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white transition"
                    >
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
          <div></div>
        </div>
      </section>
      <section className="container max-w-screen-xl m-auto mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[40px]">Bộ sưu tập</h2>
          <Link
            to="/shop"
            className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-base text-yellow-500"
          >
            View all{" "}
          </Link>
        </div>
        <div className="grid  gap-2 pb-2 border-solid">
          {categories && categories.length > 0 ? (
            <Carousel
              responsive={responsive}
              containerClass="relative"
              itemClass="p-2"
              arrows={true}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
            >
              {categories?.map((item: any) => (
                <div key={item.id} className="relative group">
                  <img src={item.image} alt="" className="w-100" />
                  <Link
                    to="/shop"
                    className="absolute left-1/2 -translate-x-1/2 bottom-4 bg-black/50 text-white text-center px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-700"
                  >
                    <p className="font-bold text-lg">{item.name}</p>
                  </Link>
                </div>
              ))}
            </Carousel>
          ) : (
            <p className="text-center text-lg">Không có danh mục nào</p>
          )}
        </div>
      </section>
      <section className="container max-w-screen-xl m-auto mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-[40px]">News</h2>
          <a
            href=""
            className="border border-solid border-yellow-500 px-4 py-2 font-semibold text-base text-yellow-500"
          >
            View all news
          </a>
        </div>
        <div className="grid grid-cols-4 gap-8 pb-3">
          <div>
            <div>
              <img src="./image 2.jpg" alt="" />
            </div>
            <div>
              <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1">
                <span className="material-symbols-outlined mr-2">
                  {" "}
                  calendar_month{" "}
                </span>
                24/04/2024
              </p>
              <h3 className="font-semibold text-xl mb-3">
                A bedroom must have something like this
              </h3>
              <a
                href=""
                className="text-red-600 font-semibold text-base flex items-center"
              >
                Xem chi tiết{" "}
                <span className="material-symbols-outlined ml-2">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div>
            <div>
              <img src="./image 2.jpg" alt="" />
            </div>
            <div>
              <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1">
                <span className="material-symbols-outlined mr-2">
                  {" "}
                  calendar_month{" "}
                </span>
                24/04/2024
              </p>
              <h3 className="font-semibold text-xl mb-3">
                A bedroom must have something like this
              </h3>
              <a
                href=""
                className="text-red-600 font-semibold text-base flex items-center"
              >
                Xem chi tiết{" "}
                <span className="material-symbols-outlined ml-2">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div>
            <div>
              <img src="./image 2.jpg" alt="" />
            </div>
            <div>
              <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1">
                <span className="material-symbols-outlined mr-2">
                  {" "}
                  calendar_month{" "}
                </span>
                24/04/2024
              </p>
              <h3 className="font-semibold text-xl mb-3">
                A bedroom must have something like this
              </h3>
              <a
                href=""
                className="text-red-600 font-semibold text-base flex items-center"
              >
                Xem chi tiết{" "}
                <span className="material-symbols-outlined ml-2">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div>
            <div>
              <img src="./image 2.jpg" alt="" />
            </div>
            <div>
              <p className="text-[#9CA3AF] font-semibold text-sm flex items-center mt-4 mb-1">
                <span className="material-symbols-outlined mr-2">
                  {" "}
                  calendar_month{" "}
                </span>
                24/04/2024
              </p>
              <h3 className="font-semibold text-xl mb-3">
                A bedroom must have something like this
              </h3>
              <a
                href=""
                className="text-red-600 font-semibold text-base flex items-center"
              >
                Xem chi tiết{" "}
                <span className="material-symbols-outlined ml-2">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
