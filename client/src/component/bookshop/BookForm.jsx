import React, { useState } from "react";

import toast from "react-hot-toast";
import api from "./api";

const BookForm = ({ refreshBooks }) => {
  const [form, setForm] = useState({ title: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/addBook", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Book added successfully!");
      setForm({ title: "", amount: "" }); 
      refreshBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter book title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter price"
            value={form.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full flex items-center justify-center px-4 py-2 font-medium text-white bg-green-600 rounded-md shadow-sm ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
              ></path>
            </svg>
          ) : (
            "Add Book"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
