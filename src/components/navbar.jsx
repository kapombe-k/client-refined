export default function NavBar() {
    return (
        <>
            <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">

                <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-800">Logo</span>
                </div>


                <div className="flex gap-3">
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                        Sign In
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors">
                        Sign Up
                    </button>
                </div>
            </nav>
        </>
    );
}