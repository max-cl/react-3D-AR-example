import React, { useRef, createRef } from "react";

import Viewer from "./components/Viewer";
import Navbar from "./components/Navbar";
import ContainerPage from "../../components/ContainerPage";
import HeroSection from "./components/HeroSection";
import ProductsNavbar from "./components/ProductsNavbar";
import Products from "./components/Products";
import Footer from "./components/Footer";

import { PRODUCTS } from "./data/index.js";

const ShopFeature = () => {
    const modelRef = useRef(null);
    const productsRef = useRef(PRODUCTS.map(() => createRef()));

    /**
     * The function changes the base color of a 3D model to the specified color.
     */
    const changeModelColor = (color) => {
        const [material] = modelRef.current.model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(`#${color}`);
    };

    return (
        <div className="max-w-[1440px] bg-white work-sans">
            {/* NAVBAR */}
            <Navbar />

            {/* HERO section */}
            <HeroSection changeModelColor={changeModelColor} ref={modelRef} />

            {/*  PRODUCTS */}
            <section className="py-8 bg-white">
                <div className="container flex flex-wrap items-center pt-4 pb-12 mx-auto">
                    <ProductsNavbar />

                    {/* MODELS */}
                    {PRODUCTS.map((product, index) => (
                        <Products
                            srcModel={product.srcModel}
                            srcModelIOS={product.srcModelIOS}
                            srcPoster={product.srcPoster}
                            modelLoaded={product.modelLoaded}
                            rotX={product.rotX}
                            rotY={product.rotY}
                            productName={product.productName}
                            productPrice={product.productPrice}
                            ref={productsRef.current[index]}
                            key={index}
                        />
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default ShopFeature;
