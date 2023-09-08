import { forwardRef } from "react";

import { useScreenSize } from "../../../../hooks/useScreenSize";
import Viewer from "../Viewer";

const imgArrowRight = "/right-arrow-white.svg";
const SRC_MODEL = "compressed/shoes2.glb";
const SRC_MODEL_IOS = "compressed/usdz/shoes2.usdz";

const HeroSection = forwardRef(({ changeModelColor }, ref) => {
    const modelRef = ref;
    const { screenWitdh } = useScreenSize();

    return (
        <div className="relative container mx-auto h-[calc(100dvh_-_60px)] max-h-[100dvh] max-w-[100dvw] md:max-h-[64vh] md:h-[64vh] bg-right bg-cover box-content flex bg-white border-t border-t-slate-100 border-b border-b-slate-100">
            <div
                className="z-10 container mx-auto bg-black lg:w-5/6 relative
                before:bottom-0 before:right-0 before:content-[''] before:absolute before:bg-yellow-300 before:w-1/2 before:h-[50%] before:z-10
                md:[clip-path:polygon(0%_0%,75%_0%,100%_100%,100%_100%,0%_100%)]"
            >
                <div className="flex flex-col items-start justify-center w-full h-full px-24 tracking-wide">
                    <p className="z-20 pb-8 font-thin tracking-widest text-white uppercase lg:text-sm">
                        New collection
                    </p>
                    <p className="z-20 text-6xl font-bold tracking-widest text-white uppercase lg:text-8xl">
                        Summer 2023
                    </p>
                </div>
                <div className="absolute z-50 flex items-center space-x-4 bottom-8 right-16">
                    <a
                        className="inline-block text-sm font-bold leading-relaxed tracking-widest text-white no-underline uppercase cursor-pointer"
                        href="#section-products"
                    >
                        Discover
                    </a>
                    <img src={imgArrowRight} alt="go to discover" width={20} height={20} />
                </div>
            </div>
            <div className="container justify-center hidden md:flex">
                <Viewer
                    ref={modelRef}
                    srcModel={SRC_MODEL}
                    srcModelIOS={SRC_MODEL_IOS}
                    rotX={90}
                    rotY={90}
                    setCursorFn={screenWitdh < 1024 ? false : true}
                    modelLoaded={true}
                />

                <div className="absolute z-[41] flex items-center justify-end bottom-8 right-12 gap-x-0">
                    <button
                        className="blur-[0.5px] border border-gray-100 w-12 h-12 md:w-12 md:h-12 bg-white shaddow shadow-white text-black active:translate-y-[1px]"
                        onClick={() => changeModelColor("FFFFFF")}
                    >
                        W
                    </button>
                    <button
                        className="blur-[0.5px] border border-gray-500 w-12 h-12 md:w-12 md:h-12 bg-black shaddow shadow-black text-white active:translate-y-[1px]"
                        onClick={() => changeModelColor("000000")}
                    >
                        N
                    </button>
                    <button
                        className="blur-[0.5px] border border-green-100 w-12 h-12 md:w-12 md:h-12 bg-green-700 shaddow shadow-green-700 text-white active:translate-y-[1px]"
                        onClick={() => changeModelColor("17803d")}
                    >
                        G
                    </button>
                    <button
                        className="blur-[0.5px] border border-blue-100 w-12 h-12 md:w-12 md:h-12 bg-blue-500 shaddow shadow-blue-500 text-white active:translate-y-[1px]"
                        onClick={() => changeModelColor("3C82F6")}
                    >
                        B
                    </button>
                    <button
                        className="blur-[0.5px] border border-orange-100 w-12 h-12 md:w-12 md:h-12 bg-orange-500 shaddow shadow-orange-500 text-white active:translate-y-[1px]"
                        onClick={() => changeModelColor("F97315")}
                    >
                        O
                    </button>
                </div>
            </div>
        </div>
    );
});

export default HeroSection;
