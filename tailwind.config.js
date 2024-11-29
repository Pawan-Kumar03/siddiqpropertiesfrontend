/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        container: {
            center: true,
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1170px",
                "2xl": "1170px",
            },
        },
        extend: {
            colors: {
                primary: {
                    400: "#f23d3d",
                    500: "#e00000",
                    600: "#ba0000",
                },
                gray: {
                    100: "#f5f5f5",
                    200: "#e5e5e5",
                    300: "#d4d4d4",
                    400: "#a3a3a3",
                    500: "#737373",
                    600: "#525252",
                    700: "#404040",
                    800: "#262626",
                    900: "#171717",
                },
                custom: "#c5a47e",
            },
            fontFamily: {
                parkinsans: ["'Parkinsans'", "sans-serif"], // Add Parkinsans
                playfair: ["'Playfair Display'", "serif"], // Add Playfair Display
                impact: ["'Impact'", "sans-serif"], // Add Impact
                josefin: ["'Josefin Sans'", "sans-serif"], // Add Josefin Sans
                openSans: ["'Open Sans'", "sans-serif"], // Add Open Sans
                parkinsans: ["'Parkinsans'", "sans-serif"], // Add Parkinsans
                playfair: ["'Playfair Display'", "serif"], // Add Playfair Display
                lato: ["'Lato'", "sans-serif"], // Add Lato
            }
        },
    },
    plugins: [],
};
