// router.jsx
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Main from "../layouts/Main";
import PlaceAnAdPage from "../pages/PlaceAnAdPage";
import EditPropertyForm from "../pages/EditPropertyForm";
import PropertyDetails from "../pages/PropertyDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/place-an-ad",
                element: <PlaceAnAdPage />,
            },
            {
                path: "/edit-property/:id",
                element: <EditPropertyForm />,
            },
            {
                path: "/property/:id",
                element: <PropertyDetails />,
            },
        ],
    },
]);

export default router;
