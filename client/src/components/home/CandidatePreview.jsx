// client/src/components/home/CandidatePreview.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CandidatePreview = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/candidates");
        setCandidates(data.slice(0, 3)); // show top 3
      } catch (err) {
        console.error("Failed to fetch candidates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase();

  const avatarColors = [
    { bg: "bg-blue-50", text: "text-blue-800" },
    { bg: "bg-amber-50", text: "text-amber-800" },
    { bg: "bg-purple-50", text: "text-purple-800" },
  ];

  if (loading) {
    return (
      <section>
        <div className="text-center py-10 text-sm text-gray-400">
          Loading candidates...
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="text-center mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
          Meet the candidates
        </p>
        <h2 className="text-xl font-semibold text-gray-900">Top candidates</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map((candidate, i) => {
          const color = avatarColors[i % avatarColors.length];
          return (
            <div
              key={candidate._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 text-center"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4 ${color.bg} ${color.text}`}
              >
                {getInitials(candidate.name)}
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {candidate.name}
              </h3>

              <p className="text-xs text-gray-500 mb-1">{candidate.party}</p>
              <p className="text-xs text-gray-400 mb-4">{candidate.constituency}</p>

              <p className="text-xs text-gray-500 mb-5 leading-relaxed line-clamp-2">
                {candidate.manifesto}
              </p>

              <button
                onClick={() => navigate(`/candidate/${candidate._id}`)}
                className="w-full bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-blue-700 text-sm font-medium py-2 rounded-xl transition"
              >
                View profile
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/candidates")}
          className="text-sm text-blue-700 hover:underline font-medium"
        >
          View all candidates →
        </button>
      </div>
    </section>
  );
};

export default CandidatePreview;