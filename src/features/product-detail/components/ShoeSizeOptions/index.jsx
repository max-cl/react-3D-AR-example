import { toast } from "react-hot-toast";

const ShoeSizeOptions = ({ product, handleEnableScroll }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-screen bg-black z-[99] flex flex-col-reverse md:flex-row justify-end">
            <div className="flex items-center justify-center w-full">
                <img src="./shop-logo.svg" width={240} height={240} alt="close moddal" />
            </div>
            <div className="relative flex flex-col h-full p-8 bg-white md:w-[480px] border-l-8 border-l-[#fde047]">
                <div className="flex items-center justify-between px-4 pb-4 border-b border-b-slate-200">
                    <p className="font-bold tracking-widest uppercase">Choose size ({product.sizes.length})</p>
                    <button className="px-4 py-4 rounded-full hover:bg-slate-50" onClick={handleEnableScroll}>
                        <img src="./close.svg" width={20} height={20} alt="close moddal" />
                    </button>
                </div>
                <div className="flex flex-wrap justify-center w-full h-auto gap-1 py-4">
                    {product.sizes.map((size) => (
                        <button
                            className="p-4 border cursor-pointer border-slate-200 hover:bg-slate-50"
                            onClick={() =>
                                toast.success(`You have chosen size "${size}" for your footwear.`, {
                                    icon: "👏",
                                })
                            }
                            key={size}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShoeSizeOptions;
