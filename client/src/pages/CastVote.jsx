// C:\secure-online-voting-system\client\src\pages\CastVote.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CastVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/candidates");
        setCandidates(data);
      } catch (err) {
        setError("Failed to load candidates.");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!selected) {
      setError("Please select a candidate before submitting.");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/votes/cast",
        { candidateId: selected },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/my-vote");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cast vote. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase();

  const avatarColors = [
    { bg: "bg-blue-50", text: "text-blue-800" },
    { bg: "bg-amber-50", text: "text-amber-800" },
    { bg: "bg-purple-50", text: "text-purple-800" },
    { bg: "bg-green-50", text: "text-green-800" },
  ];

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center text-gray-400 text-sm">
        Loading candidates...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Election 2026 — Voting is open
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Cast your vote</h1>
        <p className="text-sm text-gray-500">Select one candidate. Your vote is final and cannot be changed.</p>
      </div>

      {/* Candidate list */}
      <div className="space-y-3 mb-5">
        {candidates.map((candidate, i) => {
          const color = avatarColors[i % avatarColors.length];
          const isSelected = selected === candidate._id;
          return (
            <div
              key={candidate._id}
              onClick={() => setSelected(candidate._id)}
              className={`bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition
                ${isSelected
                  ? "border-2 border-blue-600"
                  : "border border-gray-100 hover:border-gray-300"
                }`}
            >
              <div className="flex-shrink-0">

                <img
                  src={`http://localhost:5000/uploads/candidates/${candidate.image}`}
                  alt={candidate.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  onError={(e) => {

                    e.target.style.display = "none";

                    e.target.nextSibling.style.display = "flex";
                  }}
                />

                <div
                  style={{ display: "none" }}
                  className={`w-11 h-11 rounded-full items-center justify-center text-sm font-semibold ${color.bg} ${color.text}`}
                >

                  {getInitials(candidate.name)}

                </div>

              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{candidate.name}</p>
                <p className="text-xs text-gray-500">{candidate.party} · {candidate.constituency}</p>
                <p className="text-xs text-gray-400 mt-1 truncate">{candidate.manifesto}</p>
              </div>
              <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition
                ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
        <svg className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <p className="text-xs text-amber-800">
          Once submitted, your vote <strong>cannot be changed</strong>. Please confirm your selection carefully.
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-600 text-center mb-4">{error}</p>
      )}

      {/* Submit */}
      <button
        onClick={handleVote}
        disabled={!selected || submitting}
        className={`w-full py-3 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-2
          ${selected && !submitting
            ? "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
      >
        {submitting ? "Submitting..." : selected
          ? `Confirm vote for ${candidates.find(c => c._id === selected)?.name}`
          : "Select a candidate to continue"
        }
      </button>

      <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        End-to-end encrypted · One vote per citizen
      </p>

    </div>
  );
};

export default CastVote;