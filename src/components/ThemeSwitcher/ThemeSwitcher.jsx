import { useState, useEffect } from "react";
import { BiSolidSun, BiMoon } from "react-icons/bi";

const ThemeSwitcher = () => {
	const [darkMode, setDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme
			? savedTheme === "dark"
			: window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		document.documentElement.classList.toggle("dark", darkMode);
		localStorage.setItem("theme", darkMode ? "dark" : "light");
	}, [darkMode]);

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	return (
		<button
			className="p-2 rounded-md dark:text-gray-50"
			onClick={toggleTheme}
		>
			{darkMode ? <BiMoon /> : <BiSolidSun />}
		</button>
	);
};

export default ThemeSwitcher;