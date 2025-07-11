// src/pages/FeedbackForm.tsx
import React, { useState } from "react";
import axios from "axios";

const FeedbackForm: React.FC<{ productId: string }> = ({ productId }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return setStatus("Fill in all fields.");
    try {
      await axios.post("https://crrud-product.onrender.com/feedback", { productId, name, message });
      setStatus("Thank you!");
      setName(""); setMessage("");
    } catch {
      setStatus("Error submitting feedback.");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-lg font-semibold mb-2">Submit Feedback</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full mb-2 p-2 border rounded" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" className="w-full mb-2 p-2 border rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </form>
  );
};

export default FeedbackForm;
