import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

export default function Main() {
	return (
		<div className="relative">
			<Navbar />
			<Outlet />
		</div>
	);
}
