import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

const ShoeSizeOptions = ({ product, handleEnableScroll, open }) => {
    return (
        <div
            className={`absolute top-0 left-0 w-full h-screen bg-black z-[99] flex flex-col-reverse md:flex-row justify-end modal ${
                open ? "show" : ""
            }`}
        >
            <div className="flex items-center justify-center w-full">
                <img src="./shop-logo.svg" width={240} height={240} alt="close moddal" />
            </div>
            <div className="relative flex flex-col h-full p-8 bg-white md:w-[480px] border-l-8 border-l-[#fde047]">
                <div className="flex items-center justify-between px-4 pb-4 border-b border-b-slate-200">
                    <p className="font-bold tracking-widest uppercase md:text-sm lg:text-base">
                        Choose size ({product.sizes.length})
                    </p>
                    <button className="px-4 py-4 rounded-full hover:bg-slate-50" onClick={handleEnableScroll}>
                        <img src="./close.svg" width={20} height={20} alt="close moddal" />
                    </button>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] py-4 gap-2">
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

ShoeSizeOptions.propTypes = {
    product: PropTypes.shape({
        sizes: PropTypes.array.isRequired,
    }).isRequired,
    handleEnableScroll: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ShoeSizeOptions;
