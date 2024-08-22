import logoDark from "../assets/logo.png";
import cart from "../assets/cart-image.png";

export default function Footer() {
	const data = [
		{
			category: "Company",
			items: [
				"About Us",
				"Advertising",
				"Careers",
				"Terms of Use",
				"Privacy Policy",
			],
		},
		{
			category: "UAE",
			items: [
				"Dubai",
				"Abu Dhabi",
				"Ras Al Khaimah",
				"Sharjah",
				"Fujairah",
				"Ajman",
				"Umm Al Quwain",
				"Al Ain",
			],
		},
		{
			category: "Get Social",
			items: ["Facebook", "Twitter", "Youtube", "Instagram"],
		},
		{
			category: "Support",
			items: ["Help", "Contact Us", "Call Us"],
		}
	];

	return (
		<footer className="bg-gray-800 dark:bg-gray-900 py-8 px-4 lg:px-0">
			<div className="container mx-auto">
				{/* Footer content for larger screens */}
				<div className="hidden lg:grid lg:grid-cols-4 gap-10 pb-6">
					{data.map((footerItem, index) => (
						<div key={index}>
							<h3 className="text-base font-semibold mb-4 text-custom">
								{footerItem.category}
							</h3>
							<ul className="space-y-1">
								{footerItem.items.map((item, itemIndex) => (
									<li key={itemIndex}>
										<a
											className="text-sm text-blue-400 hover:text-blue-500 hover:underline"
											href="#"
										>
											{item}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Footer content for smaller screens */}
				<div className="lg:hidden grid grid-cols-2 gap-6 pb-6">
					{data.map((footerItem, index) => (
						<div key={index}>
							<h3 className="text-base font-semibold mb-4 text-custom">
								{footerItem.category}
							</h3>
							<ul className="space-y-1">
								{footerItem.items.map((item, itemIndex) => (
									<li key={itemIndex}>
										<a
											className="text-sm text-blue-400 hover:text-blue-500 hover:underline"
											href="#"
										>
											{item}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Footer Bottom Section */}
				<div className="mt-8 flex flex-col items-center lg:items-start lg:flex-row justify-between">
					<div className="flex items-center space-x-4">
						<img className="w-32" src={logoDark} alt="Logo" /><small className="text-custom text-center lg:text-left mt-4 lg:mt-0">
						&copy; Maskan.com {new Date().getFullYear()}, All Rights Reserved.
					</small>
					</div>
					
						{/* <img className="w-36" src={cart} alt="Cart" /> */}

				</div>
			</div>
		</footer>
	);
}
