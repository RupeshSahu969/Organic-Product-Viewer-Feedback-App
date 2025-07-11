import React, { useState } from "react";
import { postProducts } from "../Api/Api";

const ProductUpload: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        description: "",
        certification: "",
        category: "",
    });
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return setSuccessMsg("Please select an image.");

        const data = new FormData();
        data.append("name", formData.name);
        data.append("brand", formData.brand);
        data.append("description", formData.description);
        data.append("certification", formData.certification);
        data.append("category", formData.category);
        data.append("image", image);

        try {
            await postProducts(data);
            setSuccessMsg("Product uploaded successfully!");
            setFormData({ name: "", brand: "", description: "", certification: "", category: "" });
            setImage(null);
            setPreview(null);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
            <h2 className="text-xl font-bold mb-4 text-center">Upload New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                />


                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded h-24"
                    required
                />


                <input
                    type="text"
                    name="certification"
                    placeholder="Certification"
                    value={formData.certification}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                />


                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border px-4 py-2 rounded"
                />
                {preview && (
                    <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
                )}

                <button
                    type="submit"
                    className="bg-blue-600 text-white hover:text-white px-6 py-2 rounded hover:bg-green-700 w-full"
                >
                    Submit Product
                </button>

                {successMsg && (
                    <p className="text-green-600 text-center mt-2 font-medium">{successMsg}</p>
                )}
            </form>
        </div>
    );
};

export default ProductUpload;
