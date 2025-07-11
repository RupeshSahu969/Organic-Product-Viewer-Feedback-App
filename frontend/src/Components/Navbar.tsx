import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons

const Navbar: React.FC = () => {
  // State to control the menu visibility on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-green-700">
          Organic Store
        </Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-gray-800">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="hidden lg:flex">
          <Link to="/" className="mr-4 text-gray-800 hover:text-green-600">
            Home
          </Link>
          <Link to="/products" className="mr-4 text-gray-800 hover:text-green-600">
            Products
          </Link>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-black text-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-white">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center mt-10">
          <Link
            to="/"
            className="mb-6 text-white text-xl hover:text-green-500"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="mb-6 text-white text-xl hover:text-green-500"
            onClick={toggleMenu}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
