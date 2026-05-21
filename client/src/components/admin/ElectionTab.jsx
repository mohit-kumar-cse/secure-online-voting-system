// client/src/components/admin/ElectionTab.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ElectionContext } from "../../context/ElectionContext";

const ElectionTab = () => {
  const { token } = useContext(AuthContext);
  const { election, refetch } = useContext(ElectionContext);
  const [form, setForm] = useState({
    title: "",
    type: "Lok Sabha",
    state: "",
    constituency: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (election) {
      setForm({
        title: election.title || "",
        type: election.type || "Lok Sabha",
        state: election.state || "",
        constituency: election.constituency || "",
        startDate: election.startDate?.split("T")[0] || "",
        endDate: election.endDate?.split("T")[0] || "",
        status: election.status || "upcoming",
      });
    }
  }, [election]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      if (election?._id) {
        await axios.put(
          `http://localhost:5000/api/election/${election._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Election updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/election",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Election created successfully!");
      }
      refetch();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save election.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Active election info */}
      {election && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-sm font-semibold text-blue-900">Active Election</p>
          </div>
          <p className="text-sm text-blue-700 font-medium">{election.title}</p>
          <p className="text-xs text-blue-500 mt-1">
            {election.type} · {election.state} · {election.constituency}
          </p>
          <p className="text-xs text-blue-500">
            {new Date(election.startDate).toLocaleDateString("en-IN")} →{" "}
            {new Date(election.endDate).toLocaleDateString("en-IN")}
          </p>
          <span className={`inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full
            ${election.status === "live" ? "bg-green-100 text-green-700"
            : election.status === "ended" ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"}`}>
            {election.status.toUpperCase()}
          </span>
        </div>
      )}

      {/* Form */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6">
        <p className="text-sm font-semibold text-gray-900 mb-5">
          {election ? "Update election details" : "Create new election"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Election title
            </label>
            <input
              type="text"
              placeholder="India General Election 2026"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            {/* Type */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Election type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Lok Sabha</option>
                <option>Assembly</option>
                <option>Municipal</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="live">Live</option>
                <option value="ended">Ended</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                State
              </label>
              <input
                type="text"
                placeholder="Uttar Pradesh"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Constituency */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Constituency
              </label>
              <input
                type="text"
                placeholder="Prayagraj"
                value={form.constituency}
                onChange={(e) => setForm({ ...form, constituency: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Start date */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Start date
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End date */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                End date
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
            {submitting ? "Saving..." : election ? "Update election" : "Create election"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ElectionTab;