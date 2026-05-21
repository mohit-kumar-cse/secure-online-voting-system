// client/src/pages/Results.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ResultCard from "../components/results/ResultCard";
import ResultChart from "../components/results/ResultChart";

const Results = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const [candidatesRes, statsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/candidates"),
          axios.get("http://localhost:5000/api/votes/stats"),
        ]);
        const sorted = [...candidatesRes.data].sort(
          (a, b) => b.totalVotes - a.totalVotes
        );
        setCandidates(sorted);
        setTotalVotes(statsRes.data.totalVotes);
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase();

  const winner = candidates[0];
  const maxVotes = winner?.totalVotes || 1;

  const avatarColors = [
    { bg: "bg-blue-100", text: "text-blue-800", bar: "bg-blue-500", border: "border-blue-300" },
    { bg: "bg-orange-100", text: "text-orange-800", bar: "bg-orange-500", border: "border-orange-300" },
    { bg: "bg-green-100", text: "text-green-800", bar: "bg-green-500", border: "border-green-300" },
    { bg: "bg-purple-100", text: "text-purple-800", bar: "bg-purple-500", border: "border-purple-300" },
    { bg: "bg-red-100", text: "text-red-800", bar: "bg-red-500", border: "border-red-300" },
    { bg: "bg-teal-100", text: "text-teal-800", bar: "bg-teal-500", border: "border-teal-300" },
  ];

  if (loading) return (
    <div className="text-center py-20 text-sm text-gray-400">Loading results...</div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Live count updating
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Election results</h1>
        <p className="text-sm text-gray-500 mt-1">
          Lok Sabha Election 2026 · Uttar Pradesh ·{" "}
          <span className="font-medium text-gray-700">{totalVotes.toLocaleString()}</span> total votes counted
        </p>
      </div>

      {/* Constituency info bar */}
      <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400">Constituency</p>
            <p className="text-sm font-semibold text-gray-900">
              {candidates[0]?.constituency || "Prayagraj"} Lok Sabha
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="text-lg font-semibold text-gray-900">{candidates.length}</p>
            <p className="text-xs text-gray-400">Candidates</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div>
            <p className="text-lg font-semibold text-gray-900">{totalVotes.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Votes counted</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div>
            <p className="text-lg font-semibold text-green-600">Live</p>
            <p className="text-xs text-gray-400">Status</p>
          </div>
        </div>
      </div>

      {/* Winner banner */}
      {winner && (
        <div className="bg-blue-700 rounded-2xl p-5 mb-8 flex items-center gap-4">
          {winner.image ? (
            <img
              src={`http://localhost:5000/uploads/candidates/${winner.image}`}
              alt={winner.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white/30 flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
              {getInitials(winner.name)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <svg className="w-4 h-4 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium text-yellow-200 uppercase tracking-wider">Leading</span>
            </div>
            <p className="text-lg font-bold text-white truncate">{winner.name}</p>
            <p className="text-sm text-blue-200">{winner.party} · {winner.constituency}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-2xl font-bold text-white">{winner.totalVotes.toLocaleString()}</p>
            <p className="text-xs text-blue-200">
              {totalVotes > 0 ? Math.round((winner.totalVotes / totalVotes) * 100) : 0}% votes
            </p>
            {candidates[1] && (
              <p className="text-xs text-yellow-200 mt-1">
                +{(winner.totalVotes - candidates[1].totalVotes).toLocaleString()} margin
              </p>
            )}
          </div>
        </div>
      )}

      {/* Vertical candidate cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {candidates.map((candidate, i) => {
          const color = avatarColors[i % avatarColors.length];
          const pct = totalVotes > 0
            ? Math.round((candidate.totalVotes / totalVotes) * 100)
            : 0;
          const barWidth = maxVotes > 0
            ? Math.round((candidate.totalVotes / maxVotes) * 100)
            : 0;
          const isWinner = i === 0;

          return (
            <div
              key={candidate._id}
              className={`relative bg-white rounded-2xl border-2 overflow-hidden flex flex-col
               cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                  ${isWinner
                  ? "border-blue-400 shadow-md shadow-blue-100 hover:shadow-blue-200"
                  : "border-gray-100 hover:border-gray-300"
                }`}
            >
              {/* Rank badge */}
              <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10
                ${isWinner ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-500"}`}>
                {i + 1}
              </div>

              {isWinner && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Lead
                  </div>
                </div>
              )}

              {/* ✅ Real image or initials avatar */}
              <div className={`${color.bg} pt-10 pb-4 flex items-center justify-center`}>
                {candidate.image ? (
                  <img
                    src={`http://localhost:5000/uploads/candidates/${candidate.image}`}
                    alt={candidate.name}
                    onError={(e) => { e.target.style.display = "none"; }}
                    className={`w-20 h-20 rounded-full object-cover border-4 ${color.border}`}
                  />
                ) : (
                  <div className={`w-20 h-20 rounded-full border-4 ${color.border} flex items-center justify-center text-2xl font-bold ${color.text} bg-white`}>
                    {getInitials(candidate.name)}
                  </div>
                )}
              </div>

              <div className="px-3 pt-3 pb-4 flex flex-col flex-1">
                <p className="text-sm font-semibold text-gray-900 text-center leading-tight mb-1">
                  {candidate.name}
                </p>
                <p className={`text-xs font-medium text-center mb-1 ${color.text}`}>
                  {candidate.party}
                </p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-xs text-gray-400 truncate">{candidate.constituency}</p>
                </div>
                <div className="border-t border-gray-100 mb-3" />
                <div className="text-center mb-3">
                  <p className={`text-xl font-bold ${isWinner ? "text-blue-700" : "text-gray-800"}`}>
                    {candidate.totalVotes.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">votes · {pct}%</p>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${color.bar}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                {isWinner && candidates[1] && (
                  <p className="text-xs text-center text-blue-600 font-medium mt-1">
                    +{(winner.totalVotes - candidates[1].totalVotes).toLocaleString()} ahead
                  </p>
                )}
                {!isWinner && winner && (
                  <p className="text-xs text-center text-gray-400 mt-1">
                    -{(winner.totalVotes - candidate.totalVotes).toLocaleString()} behind
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ResultChart candidates={candidates} totalVotes={totalVotes} />
      </div>

      {/* Summary table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">Vote count summary</p>
          <p className="text-xs text-gray-400">{candidates.length} candidates</p>
        </div>
        <div className="divide-y divide-gray-50">
          {candidates.map((candidate, i) => {
            const color = avatarColors[i % avatarColors.length];
            const pct = totalVotes > 0
              ? Math.round((candidate.totalVotes / totalVotes) * 100)
              : 0;
            return (
              <div key={candidate._id} className="px-5 py-3 flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 w-5 text-center">{i + 1}</span>

                {/* ✅ Real image in table too */}
                {candidate.image ? (
                  <img
                    src={`http://localhost:5000/uploads/candidates/${candidate.image}`}
                    alt={candidate.name}
                    onError={(e) => { e.target.style.display = "none"; }}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${color.bg} ${color.text}`}>
                    {getInitials(candidate.name)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{candidate.name}</p>
                    {i === 0 && (
                      <span className="text-xs bg-blue-50 text-blue-700 font-medium px-1.5 py-0.5 rounded-full flex-shrink-0">
                        Leading
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{candidate.party} · {candidate.constituency}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className={`h-full rounded-full ${color.bar}`}
                      style={{ width: `${Math.round((candidate.totalVotes / maxVotes) * 100)}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{candidate.totalVotes.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{pct}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
          <p className="text-xs text-gray-500 font-medium">Total votes counted</p>
          <p className="text-xs font-bold text-gray-900">{totalVotes.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-5 flex items-center justify-center gap-1.5">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        Results are verified and tamper-proof · Powered by SecureVote
      </p>

    </div>
  );
};

export default Results;