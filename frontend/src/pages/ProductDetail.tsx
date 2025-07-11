import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FeedbackForm from "../pages/FeedbackForm";

interface ProductDetailType {
  _id: string;
  name: string;
  image: string;
  brand: string;
  description: string;
  certification: string;
  category: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [p, setP] = useState<ProductDetailType | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://crrud-product.onrender.com/products/${id}`)
        .then((res) => setP(res.data))
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id]);

  if (!p) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-2xl font-semibold mt-4">{p.name}</h1>
        <p className="text-gray-600">Brand: {p.brand}</p>
        <p className="text-gray-600">Category: {p.category}</p>
        <p className="text-gray-600">Certification: {p.certification}</p>
        <p className="mt-4">{p.description}</p>
        <FeedbackForm productId={p._id} />
      </div>
    </div>
  );
};

export default ProductDetail;
