import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string;
  brand: string;
}

const ProductCard: React.FC<{ p: Product }> = ({ p }) => {
  const [hovered, setHovered] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
  
      try {
        await axios.delete(`https://crrud-product.onrender.com/products/${p._id}`);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    
  };

  return (
    <Link
      to={`/products/${p._id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 transform hover:scale-[1.02] flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-48 object-cover rounded-md"
        />
        {hovered && (
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            title="Delete Product"
          >
            <FaTrash size={14} />
          </button>
        )}
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
        <p className="text-sm text-gray-500">{p.brand}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
