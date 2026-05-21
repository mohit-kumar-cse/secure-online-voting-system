// client/src/components/admin/AddCandidateTab.jsx
import { useState } from "react";
import axios from "axios";

const fields = [
  { label: "Full name", name: "name", placeholder: "Rahul Sharma" },
  { label: "Party name", name: "party", placeholder: "Development Party" },
  { label: "Age", name: "age", placeholder: "45", type: "number" },
  { label: "Constituency", name: "constituency", placeholder: "Prayagraj" },
  { label: "Education", name: "education", placeholder: "MBA" },
  { label: "Experience", name: "experience", placeholder: "10 years in public service" },
];

const initialForm = {
  name: "", party: "", age: "", constituency: "",
  manifesto: "", education: "", experience: "",
};

const AddCandidateTab = ({ token, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/candidates", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Candidate added successfully!");
      setForm(initialForm);
      setImage(null);
      setImagePreview(null);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add candidate.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 max-w-2xl">
      <p className="text-sm font-semibold text-gray-900 mb-5">Register new candidate</p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Image upload */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Candidate photo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
              {imagePreview ? (
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            <label className="cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg transition">
              Choose photo
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <p className="text-xs text-gray-400">JPG, PNG or WEBP · Max 2MB</p>
          </div>
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Manifesto */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Manifesto / Key promises (comma separated)
          </label>
          <textarea
            placeholder="Smart roads, jobs, hospitals and digital education"
            value={form.manifesto}
            onChange={(e) => setForm({ ...form, manifesto: e.target.value })}
            required
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl text-sm font-semibold transition disabled:opacity-60"
        >
          {submitting ? "Adding candidate..." : "Add candidate"}
        </button>
      </form>
    </div>
  );
};

export default AddCandidateTab;