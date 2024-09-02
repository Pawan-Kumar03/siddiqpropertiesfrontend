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
import MyAds from "../pages/MyAds";
import ProfilePage from "../pages/ProfilePage";
import GetVerifiedPage from '../pages/GetVerifiedPage';
import AboutUsPage from '../pages/AboutUsPage';  // New Page
import ContactUsPage from '../pages/ContactUsPage';  // New Page
import VerifyPage from '../pages/VerifyPage'
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
                path: "/terms-and-conditions",   
                element: <TermsAndConditions />,
            },
            { path:"/my-ads", element:<MyAds />},
            {
                path: "/profile",
                element: <ProfilePage />, 
            },
            {
                path: "/get-verified",
                element: <GetVerifiedPage />, 
            },
            {
                path: "/about-us",
                element: <AboutUsPage />, 
            },
            {
                path: "/contact-us",
                element: <ContactUsPage />, 
            },
            {
                path: "/verify/:token",
                element: <VerifyPage />, 
            },
        ],
    },
]);

export default router;
