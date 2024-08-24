import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Main from "../layouts/Main";
import PlaceAnAdPage from "../pages/PlaceAnAdPage";
import EditPropertyForm from "../pages/EditPropertyForm";
import PropertyDetails from "../pages/PropertyDetails";
import PropertiesPage from "../pages/PropertiesPage";
import Login from "../pages/Login"; 
import Signup from "../pages/Signup";
import TermsAndConditions from "../pages/TermsAndConditions";

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
                element: <PropertiesPage />, 
            },
            {
                path: "/login",  
                element: <Login />,
            },
            {
                path: "/signup",  
                element: <Signup />,
            },
            {
                path: "/terms-and-conditions",   // Add route for Terms and Conditions
                element: <TermsAndConditions />,
            },
        ],
    },
]);

export default router;
