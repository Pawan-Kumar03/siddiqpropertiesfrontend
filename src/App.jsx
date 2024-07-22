import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ListingsProvider } from "./contexts/ListingsContext";
import './app.css'; 
export default function App() {
    return (
        <ListingsProvider>
            <div className="bg-grey-light text-grey-darkest min-h-screen">
                <RouterProvider router={router} />
            </div>
        </ListingsProvider>
    );
}
