import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "../page/home";
import NotFoundPage from "../page/NotFound";
import ProductDetailPage from "../page/product-detail";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </>
    )
);

const RoutesApp = () => {
    return <RouterProvider router={router} />;
};

export default RoutesApp;
