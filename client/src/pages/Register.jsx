// client/src/pages/Register.jsx
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    voterId: "",
    aadhaarNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      login(data.user, data.token); // ✅ uses context
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Full name", name: "name", type: "text", placeholder: "Rahul Kumar" },
    { label: "Email address", name: "email", type: "email", placeholder: "you@example.com" },
    { label: "Password", name: "password", type: "password", placeholder: "Min. 6 characters" },
    { label: "Voter ID", name: "voterId", type: "text", placeholder: "e.g. UP/12/345/678901" },
    { label: "Aadhaar Number", name: "aadhaarNumber", type: "text", placeholder: "12-digit Aadhaar number" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">SecureVote</h1>
          <p className="text-sm text-gray-500 mt-1">Create your voter account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">

            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;