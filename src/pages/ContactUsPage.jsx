export default function ContactUsPage() {
    return (
        <div className="container mx-auto py-12 w-full max-w-md bg-grey-darker p-8 rounded shadow-md border-4 border-custom">
            <h1 className="text-3xl font-bold mb-6 text-custom text-center">Contact Us</h1>
            <form className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-custom text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-custom text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-custom text-sm font-bold mb-2" htmlFor="query">
                        Query
                    </label>
                    <textarea
                        id="query"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-custom  text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
