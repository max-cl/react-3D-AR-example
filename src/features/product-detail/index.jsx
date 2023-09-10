import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContainerPage from "../../components/ContainerPage";
import Viewer from "./components/Viewer";
import ShoeSizeOptions from "./components/ShoeSizeOptions";

import { PRODUCTS } from "../../data";

const ProductDetailFeature = () => {
    const [open, setOpen] = useState(false);
    const modelRef = useRef(null);
    let { id } = useParams();
    const product = PRODUCTS.filter((product) => product.id === id)[0];

    async function handleDisableScroll() {
        document.body.classList.add("remove-scroll");
        setOpen(true);
    }

    function handleEnableScroll() {
        document.body.classList.remove("remove-scroll");
        setOpen(false);
    }

    return (
        <div className="max-w-[1440px] bg-white work-sans relative">
            {/* Modal (Shoes sizes) */}
            {product.sizes ? (
                <ShoeSizeOptions product={product} handleEnableScroll={handleEnableScroll} open={open} />
            ) : null}

            {/* NAVBAR */}
            <Navbar />

            {/*  PRODUCTS */}
            <ContainerPage>
                <div className="container flex items-center justify-center h-full pt-4 pb-12 mx-auto">
                    {/* MODELS */}
                    <div className="relative grid w-full h-full grid-cols-1 grid-rows-6 p-6 lg:grid-cols-12 lg:grid-rows-1 md:p-0">
                        <div className="absolute top-0 left-0 z-50 font-bold lg:hidden">
                            <Link to="/" className="flex items-center">
                                <img src="/back.svg" alt="back to home" width={50} height={50} />
                                Home
                            </Link>
                        </div>
                        <div className="w-full h-full row-start-1 row-end-4 col-span-full lg:col-start-1 lg:col-end-8 bg-slate-50 lg:row-span-full">
                            <Viewer
                                ref={modelRef}
                                srcModel={product?.srcModel}
                                srcModelIOS={product?.srcModelIOS}
                                rotX={product?.rotX}
                                rotY={product?.rotY}
                            />
                        </div>

                        <div className="relative flex flex-col justify-center row-start-4 row-end-7 p-2 space-y-4 lg:p-16 col-span-full lg:col-start-8 lg:col-end-13 lg:row-span-full">
                            <div className="absolute top-0 left-0 hidden font-bold lg:block">
                                <Link to="/" className="flex items-center">
                                    <img src="/back.svg" alt="back to home" width={50} height={50} />
                                    Home
                                </Link>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-bold">{product?.productName}</p>
                                <svg
                                    className="w-6 h-6 text-gray-500 fill-current hover:text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                </svg>
                            </div>
                            <p className="text-gray-900">{`£ ${product?.productPrice}`}</p>
                            <div className="text-sm">
                                <h1 className="pt-3 font-bold">Description:</h1>
                                <p>{product?.description}</p>
                            </div>

                            {product.sizes ? (
                                <div className="w-full">
                                    <button
                                        className="px-4 py-2 bg-[#fde047] border border-[#fde047] text-black text-lg font-thin"
                                        onClick={handleDisableScroll}
                                    >
                                        Choose size
                                    </button>
                                </div>
                            ) : null}

                            <div className="w-full">
                                <button
                                    className="w-full px-16 py-5 bg-black text-[#fde047] text-lg font-thin"
                                    onClick={() => console.log(`Add to cart, productID: ${id}`)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerPage>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default ProductDetailFeature;
