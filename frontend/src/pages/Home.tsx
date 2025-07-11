import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  brand: string;
  image: string;
  description: string;
  certification: string;
  category: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]); 
  const fetchProducts = async (category: string) => {
    try {
      const { data } = category
        ? await axios.get(`https://crrud-product.onrender.com/products?category=${category}`)
        : await axios.get("https://crrud-product.onrender.com/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data }: { data: Product[] } = await axios.get("https://crrud-product.onrender.com/products");
      const uniqueCategories = Array.from(new Set(data.map((product) => product.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  useEffect(() => {
    fetchCategories(); 
    fetchProducts(category); 
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-6">
      
      <select
        className="border p-2 rounded-md"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="">All Products</option>
      
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product._id} p={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
