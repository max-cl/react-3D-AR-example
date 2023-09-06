import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-screen h-screen">
            <div className="absolute top-0 left-0 flex items-center w-full p-8 underline tex8-xl">
                <img src="./back.svg" alt="not found logo" width={50} height={50} />
                <Link to="/">Go back</Link>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-4xl font-thin uppercase">Page not found!</h1>{" "}
                    <img src="./not-found.svg" alt="not found logo" width={100} height={100} />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
