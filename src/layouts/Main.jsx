import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from '../shared/Footer'
export default function Main() {
    return (
        <div className="bg-primary min-h-screen relative overflow-x-hidden">
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    );
}
