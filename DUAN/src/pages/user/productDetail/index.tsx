import { useCart } from "../../../contact/cartContact";
import { useOne } from "../../../hooks";
import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
   
  const { data: products } = useOne({ resource: "products", id });
  

  return (
    <>
      <main className="container max-w-screen-xl m-auto">
        <section className="mt-16">
          <div className="grid grid-cols-2 gap-8">
            <div className="grid grid-cols-6 gap-8">
              <div className="col-span-1 *:mb-4">
                {products && <img src={products.image} alt="" />}
                {products && <img src={products.image} alt="" />}
                {products && <img src={products.image} alt="" />}
                {products && <img src={products.image} alt="" />}
                {products && <img src={products.image} alt="" />}
              </div>
              <div className="col-span-5">
                {products && <img src={products.image} alt=""   className="w-full h-full object-cover"/>}
              </div>
            </div>
            {/* <!-- END  --> */}
            <div>
                
                <p className="font-semibold text-xl">{products?.name}</p>
              <p className="font-bold text-[40px] text-[#EF4444] my-2">
              {products?.price}đ
              </p>
              <div className="flex items-center">
                <div className="*:text-[#FFC700] border-r border-solid border-neutral-400 pr-4 mr-4">
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                  <span className="material-icons">star</span>
                </div>
                <span className="font-medium text-sm  text-[#9F9F9F]">
                  5 Customer Review
                </span>
              </div>
              <p className="font-medium my-4">
              {products?.description}

              </p>
              <div>
                <p className="text-[#A3A3A3] mb-1">size</p>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center text-white rounded bg-yellow-600 w-[30px] h-[30px]">
                    L
                  </div>
                  <div className="flex items-center justify-center text-white rounded bg-neutral-400 w-[30px] h-[30px]">
                    XL
                  </div>
                  <div className="flex items-center justify-center text-white rounded bg-neutral-400 w-[30px] h-[30px]">
                    XS
                  </div>
                </div>
              </div>
              <div className="mt-4  mb-8">
                <p className="text-[#A3A3A3] mb-1">color</p>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center  w-[30px] h-[30px] rounded-full bg-[#816DFA]"></div>
                  <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#000000]"></div>
                  <div className="flex items-center justify-center  w-[30px] h-[30px] rounded-full bg-[#B88E2F]"></div>
                </div>
              </div>
              <div>
                <form action="">
                  <div className="border border-solid border-neutral-400 w-fit rounded inline-block">
                    <button className="py-2 px-4">-</button>
                    <input
                      type="text"
                      value="1"
                      className="w-[30px] text-center"
                    />
                    <button className="py-2 px-4">+</button>
                  </div>
                  <Link to="/cart">
                  <button 
                      onClick={(e) => {
                          e.preventDefault();
                          const userId = localStorage.getItem("userId");
                          if (!userId) {
                              alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
                              return;
                          }
                          if (products) {
                              addToCart(products.id); // ✅ Dùng 'products.id' thay vì 'item.id'
                          }
                      }}
                      className="border border-yellow-700 text-yellow-700 w-40 font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white transition ml-3">
                      Add to Cart
                  </button>

                  </Link>
                  <button
                    type="submit"
                    className="border border-solid border-yellow-600 rounded py-2 px-10 ml-3 hover:bg-neutral-800 hover:text-white"
                  >
                    + Compared
                  </button>
                </form>
              </div>
              <hr className="text-[#A3A3A3] mt-8 mb-3" />
              <div className="*:mb-3 *:text-[#A3A3A3]">
                <p>SKU : SS00</p>
                <p>Category: Sofa</p>
                <p>Tags: Sofa, Chair, Home, Shop</p>
              </div>
            </div>
          </div>
          {/* <!-- END  --> */}
          <div className="mt-16">
            <div className="*:font-semibold *:text-xl *:mr-16 border-b pb-4 mb-8">
              <a href="">Description</a>
              <a href="" className="text-[#A3A3A3]">
                Additional Information
              </a>
              <a href="" className="text-[#A3A3A3]">
                Reviews [5]
              </a>
            </div>
            <div className="*:text-[#A3A3A3] *:font-medium">
              <p className="mb-2">
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
                portable active stereo speaker takes the unmistakable look and
                sound of Marshall, unplugs the chords, and takes the show on the
                road.
              </p>
              <p className="mb-8">
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage styled engineering. Setting the bar as one of the
                loudest speakers in its className, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
                clear midrange and extended highs for a sound that is both
                articulate and pronounced. The analogue knobs allow you to fine
                tune the controls to your personal preferences while the
                guitar-influenced leather strap enables easy and stylish travel.
              </p>
              <div className="flex gap-8">
                <img src="./1.jpg" alt="" />
                <img src="./1.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="my-16">
          <div className=" mb-4">
            <h2 className="font-semibold text-[40px] text-center">
              New product
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="overflow-hidden">
                <Link to="/productdetail">
                  <img
                    src="./image 1.png"
                    alt=""
                    className="hover:scale-125 duration-1000"
                  />
                </Link>
              </div>
              <div className="bg-[#F5F5F5] p-4">
                <h3 className="font-semibold text-xl">Syltherine</h3>
                <p className="text-[#898989] text-base mt-1 mb-2">
                  Stylish cafe chair
                </p>
                <p className="font-semibold text-xl text-red-600 mb-3">
                  2.500.000đ
                </p>
                <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white">
                  <Link to="/productdetail">Add to cart</Link>
                </button>
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <Link to="/productdetail">
                  <img
                    src="./image 1.png"
                    alt=""
                    className="hover:scale-125 duration-1000"
                  />
                </Link>
              </div>
              <div className="bg-[#F5F5F5] p-4">
                <h3 className="font-semibold text-xl">Syltherine</h3>
                <p className="text-[#898989] text-base mt-1 mb-2">
                  Stylish cafe chair
                </p>
                <p className="font-semibold text-xl text-red-600 mb-3">
                  2.500.000đ
                </p>
                <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white">
                  <Link to="/cart">Add to cart</Link>
                </button>
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <Link to="/productdetail">
                  <img
                    src="./image 1.png"
                    alt=""
                    className="hover:scale-125 duration-1000"
                  />
                </Link>
              </div>
              <div className="bg-[#F5F5F5] p-4">
                <h3 className="font-semibold text-xl">Syltherine</h3>
                <p className="text-[#898989] text-base mt-1 mb-2">
                  Stylish cafe chair
                </p>
                <p className="font-semibold text-xl text-red-600 mb-3">
                  2.500.000đ
                </p>
                <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white">
                  <Link to="/cart">Add to cart</Link>
                </button>
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <Link to="/productdetail">
                  <img
                    src="./image 1.png"
                    alt=""
                    className="hover:scale-125 duration-1000"
                  />
                </Link>
              </div>
              <div className="bg-[#F5F5F5] p-4">
                <h3 className="font-semibold text-xl">Syltherine</h3>
                <p className="text-[#898989] text-base mt-1 mb-2">
                  Stylish cafe chair
                </p>
                <p className="font-semibold text-xl text-red-600 mb-3">
                  2.500.000đ
                </p>
                <button className=" border border-solid border-yellow-700 text-yellow-700 w-full font-semibold text-base py-2 hover:bg-yellow-700 hover:text-white">
                  <Link to="/cart">Add to cart</Link>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default ProductDetail;
