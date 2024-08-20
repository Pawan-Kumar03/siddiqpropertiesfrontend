// router.jsx
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Main from "../layouts/Main";
import PlaceAnAdPage from "../pages/PlaceAnAdPage";
import EditPropertyForm from "../pages/EditPropertyForm";
import PropertyDetails from "../pages/PropertyDetails";
import PropertiesPage from "../pages/PropertiesPage";
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
            {
                path: "/properties",
                element: <PropertiesPage />, // Add this route
            },
        ],
    },
]);

export default router;
