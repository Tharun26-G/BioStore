import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg py-3 px-8 rounded-full flex justify-center items-center gap-8 z-50">
      <h1 className="text-xl font-bold text-gray-800">BioStore</h1>
      <Link to="/profile" className="text-lg font-medium text-gray-600 hover:text-blue-500">
        Profile
      </Link>
      <Link to="/social-links" className="text-lg font-medium text-gray-600 hover:text-blue-500">
        Social Links
      </Link>
      <Link to="/store" className="text-lg font-medium text-gray-600 hover:text-blue-500">
        Store
      </Link>
    </nav>
  );
}
