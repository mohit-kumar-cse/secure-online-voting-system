// C:\secure-online-voting-system\client\src\components\home\HeroSection.jsx
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ElectionContext } from "../../context/ElectionContext";

const HeroSection = ({ candidates = [] }) => {
  const navigate = useNavigate();
  const { election } = useContext(ElectionContext);

  const totalCandidates = candidates.length;
  const totalConstituencies = new Set(candidates.map((c) => c.constituency)).size;
  const remainingDays = election?.endDate
    ? Math.max(0, Math.ceil((new Date(election.endDate) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <section className="bg-white border border-gray-100 rounded-2xl px-6 py-16 text-center max-w-4xl mx-auto mt-8">
      <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        {election?.title || "Election 2026"} — Voting is now open
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {election?.title || "India General Election 2026"}
      </h1>

      <p className="text-gray-500 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
        Cast your vote securely and transparently. View candidate manifestos,
        check your constituency, and track live results — all in one place.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button onClick={() => navigate("/cast-vote")} className="bg-blue-700 hover:bg-blue-800 text-white px-7 py-3 rounded-xl font-semibold transition">
          Cast your vote
        </button>
        <button onClick={() => navigate("/candidates")} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-7 py-3 rounded-xl font-semibold transition">
          View candidates
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        {[
          { value: totalCandidates, label: "Candidates" },
          { value: totalConstituencies || 1, label: "Constituencies" },
          { value: `${remainingDays} Days`, label: "Remaining" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 rounded-2xl py-5 px-4">
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400">
        End-to-end encrypted · One vote per citizen · Auditable results
      </p>
    </section>
  );
};

export default HeroSection;