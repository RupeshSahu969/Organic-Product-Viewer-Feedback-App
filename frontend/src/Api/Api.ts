import axios from "axios";
const API = axios.create({ baseURL: "https://crrud-product.onrender.com" });

export const getProducts = () => API.get("/products");
export const postProducts = (data: FormData) => API.post("/products", data);
export const getProduct = (id: string) => API.get(`/products/${id}`);
export const getProductsByCategory = (category: string) => API.get(`/products?category=${category}`);
export const deleteProduct = (id: string) => API.delete(`/products/${id}`);
export const postFeedback = (data: { productId: string; name: string; message: string; }) => API.post("/feedback", data);
export const getCategories = () => API.get("/products");
