// 
// client/src/pages/Results.jsx
import { useEffect, useState, useContext } from "react";
import api from "../utils/api"; 
import { IoMdTrophy } from "react-icons/io";
import ResultChart from "../components/results/ResultChart";
import { ElectionContext } from "../context/ElectionContext"; 

const BASE_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000";

const Results = () => {
  // Pull election data from context
  const { election, loading: electionLoading, error: electionError } = useContext(ElectionContext);

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  
  const [totalVotes, setTotalVotes] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const [candidatesRes, statsRes] = await Promise.all([
          api.get("/candidates"),
          api.get("/votes/stats"),
        ]);
        const sorted = [...candidatesRes.data].sort((a, b) => b.totalVotes - a.totalVotes);
        setCandidates(sorted);
        setTotalVotes(statsRes.data.totalVotes);
      } catch (err) {
        console.error("Failed to fetch results", err);
        setError(true); 
      } finally {
        setLoading(false);
      }
    };
    
    
    if (election) {
      fetchResults();
    } else if (!electionLoading) {
      setLoading(false);
    }
  }, [election, electionLoading]);

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "?";

  const constituencies = [...new Set(candidates.map((c) => c.constituency))].sort();
  const filteredCandidates = activeTab === "all"
    ? candidates
    : candidates.filter((c) => c.constituency === activeTab);

  const winner = candidates[0];
  const tabWinner = filteredCandidates[0];
  const maxVotes = filteredCandidates[0]?.totalVotes || 1;

  const avatarColors = [
    { bg: "bg-blue-100",   text: "text-blue-800",   bar: "bg-blue-500",   border: "border-blue-300" },
    { bg: "bg-orange-100", text: "text-orange-800", bar: "bg-orange-500", border: "border-orange-300" },
    { bg: "bg-green-100",  text: "text-green-800",  bar: "bg-green-500",  border: "border-green-300" },
    { bg: "bg-purple-100", text: "text-purple-800", bar: "bg-purple-500", border: "border-purple-300" },
    { bg: "bg-red-100",    text: "text-red-800",    bar: "bg-red-500",    border: "border-red-300" },
    { bg: "bg-teal-100",   text: "text-teal-800",   bar: "bg-teal-500",   border: "border-teal-300" },
  ];

  const partyWinners = Object.values(
    candidates.reduce((acc, c) => {
      if (!acc[c.party] || c.totalVotes > acc[c.party].totalVotes) acc[c.party] = c;
      return acc;
    }, {})
  ).sort((a, b) => b.totalVotes - a.totalVotes);

  // Combined loading state
  if (loading || electionLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // Combined error state
  if (error || electionError) return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H2.645c-1.73 0-2.813-1.874-1.948-3.374L10.051 3.378c.866-1.5 3.032-1.5 3.898 0l7.354 12.748zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">Failed to load results</p>
      <p className="text-xs text-gray-400 mb-4">Check your connection and try again.</p>
      <button
        onClick={() => window.location.reload()}
        className="text-sm bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl transition"
      >
        Retry
      </button>
    </div>
  );

  // No active election state
  if (!election) return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">No Active Election</p>
      <p className="text-xs text-gray-400">There is currently no active election running to display results for.</p>
    </div>
  );

  // No candidates state
  if (candidates.length === 0) return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zm9.75-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V9.75zm-9.75 3.375" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">No results yet</p>
      <p className="text-xs text-gray-400">Results will appear here once candidates are registered and votes are cast.</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-6 px-3 sm:py-10 sm:px-4">

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live count updating
        </div>
        
        {/* Replaced hardcoded text with dynamic Context data */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {election.title || "Election Results"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {election.description && `${election.description} · `}
          {election.state && `${election.state} · `}
          <span className="font-medium text-gray-700">{totalVotes.toLocaleString()}</span> total votes
        </p>
      </div>

      {/* Stats bar */}
      <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-400">Total constituencies</p>
            <p className="text-sm font-semibold text-gray-900">{constituencies.length} seats</p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {[
            { label: "Candidates", value: candidates.length },
            { label: "Votes", value: totalVotes.toLocaleString() },
            { label: "Status", value: election.status || "Live", green: true },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className={`text-base sm:text-lg font-semibold ${s.green ? "text-green-600" : "text-gray-900"}`}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overall winner banner */}
      {winner && activeTab === "all" && (
        <div className="bg-blue-700 rounded-2xl p-4 sm:p-5 mb-6 flex items-center gap-3">
          
          <div className="hidden sm:flex w-10 h-10 bg-white/10 rounded-xl items-center justify-center flex-shrink-0">
            <IoMdTrophy size={24} className="text-yellow-300" />
          </div>

          {winner.image ? (
            <img 
            src={winner.image}
            alt={winner.name}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/30 flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
              {getInitials(winner.name)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium text-yellow-200 uppercase tracking-wider">Overall leading</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-white truncate">{winner.name}</p>
            <p className="text-xs sm:text-sm text-blue-200">{winner.party} · {winner.constituency}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl sm:text-2xl font-bold text-white">{winner.totalVotes.toLocaleString()}</p>
            <p className="text-xs text-blue-200">{totalVotes > 0 ? Math.round((winner.totalVotes / totalVotes) * 100) : 0}% votes</p>
            {candidates[1] && (
              <p className="text-xs text-yellow-200 mt-1">+{(winner.totalVotes - candidates[1].totalVotes).toLocaleString()} margin</p>
            )}
          </div>
        </div>
      )}

      {/* Constituency winner banner */}
      {activeTab !== "all" && tabWinner && (
        <div className="bg-gradient-to-r from-indigo-700 to-blue-600 rounded-2xl p-4 mb-5 flex items-center gap-3">
          {tabWinner.image ? (
            <img 
            src={tabWinner.image} 
            alt={tabWinner.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/30 flex-shrink-0" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
              {getInitials(tabWinner.name)}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-indigo-200 font-medium mb-0.5">{activeTab} constituency leader</p>
            <p className="text-base font-bold text-white truncate">{tabWinner.name}</p>
            <p className="text-xs text-indigo-200">{tabWinner.party}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xl font-bold text-white">{tabWinner.totalVotes.toLocaleString()}</p>
            <p className="text-xs text-indigo-200">votes</p>
          </div>
        </div>
      )}

      {/* Party-wise leaders */}
      {activeTab === "all" && partyWinners.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Party-wise leaders</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partyWinners.map((candidate, i) => {
              const color = avatarColors[i % avatarColors.length];
              const pct = totalVotes > 0 ? Math.round((candidate.totalVotes / totalVotes) * 100) : 0;
              const isOverall = candidate._id === winner?._id;
              return (
                <div key={candidate._id} className={`bg-white border-2 rounded-2xl px-4 py-3 flex items-center gap-3 ${isOverall ? "border-blue-300 shadow-md" : "border-gray-100"}`}>
                  {candidate.image ? (
                    <img 
                    src={candidate.image} 
                    alt={candidate.name}
                      onError={(e) => { e.target.style.display = "none"; }}
                      className={`w-10 h-10 rounded-full object-cover border-2 flex-shrink-0 ${color.border}`} />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border-2 ${color.bg} ${color.text} ${color.border}`}>
                      {getInitials(candidate.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-900 truncate">{candidate.name}</p>
                      {isOverall && <span className="text-xs bg-blue-50 text-blue-700 font-medium px-1.5 py-0.5 rounded-full flex-shrink-0">Lead</span>}
                    </div>
                    <p className={`text-xs font-medium ${color.text}`}>{candidate.party}</p>
                    <p className="text-xs text-gray-400 truncate">{candidate.constituency}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">{candidate.totalVotes.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{pct}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Constituency tabs */}
      <div className="mb-5">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["all", ...constituencies].map((c) => (
            <button key={c} onClick={() => setActiveTab(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition
                ${activeTab === c ? "bg-blue-700 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-700"}`}>
              {c === "all" ? "All constituencies" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {filteredCandidates.map((candidate, i) => {
          const color = avatarColors[i % avatarColors.length];
          const pct = totalVotes > 0 ? Math.round((candidate.totalVotes / totalVotes) * 100) : 0;
          const barWidth = maxVotes > 0 ? Math.round((candidate.totalVotes / maxVotes) * 100) : 0;
          const isWinner = i === 0;
          return (
            <div key={candidate._id} className={`relative bg-white rounded-2xl border-2 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
              ${isWinner ? "border-blue-400 shadow-md shadow-blue-100" : "border-gray-100 hover:border-gray-300"}`}>
              <div className={`absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold z-10 ${isWinner ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-500"}`}>{i + 1}</div>
              {isWinner && <div className="absolute top-2 right-2 z-10"><div className="bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">Lead</div></div>}
              <div className={`${color.bg} pt-9 pb-3 flex items-center justify-center`}>
                {candidate.image ? (
                  <img 
                   
                  src={candidate.image}
                  alt={candidate.name}
                    onError={(e) => { e.target.style.display = "none"; }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 ${color.border}`} />
                ) : (
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 ${color.border} flex items-center justify-center text-xl font-bold ${color.text} bg-white`}>
                    {getInitials(candidate.name)}
                  </div>
                )}
              </div>
              <div className="px-2.5 pt-2.5 pb-3 flex flex-col flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 text-center leading-tight mb-1 truncate">{candidate.name}</p>
                <p className={`text-xs font-medium text-center mb-1 ${color.text}`}>{candidate.party}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-xs text-gray-400 truncate">{candidate.constituency}</p>
                </div>
                <div className="border-t border-gray-100 mb-2" />
                <div className="text-center mb-2">
                  <p className={`text-lg sm:text-xl font-bold ${isWinner ? "text-blue-700" : "text-gray-800"}`}>{candidate.totalVotes.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">votes · {pct}%</p>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
                  <div className={`h-full rounded-full transition-all duration-700 ${color.bar}`} style={{ width: `${barWidth}%` }} />
                </div>
                {isWinner && filteredCandidates[1] && (
                  <p className="text-xs text-center text-blue-600 font-medium mt-1">+{(filteredCandidates[0].totalVotes - filteredCandidates[1].totalVotes).toLocaleString()} ahead</p>
                )}
                {!isWinner && filteredCandidates[0] && (
                  <p className="text-xs text-center text-gray-400 mt-1">-{(filteredCandidates[0].totalVotes - candidate.totalVotes).toLocaleString()} behind</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-5">
        <ResultChart candidates={filteredCandidates} totalVotes={totalVotes} />
      </div>

      {/* Summary table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">Vote count summary</p>
          <p className="text-xs text-gray-400">{filteredCandidates.length} candidates{activeTab !== "all" && ` · ${activeTab}`}</p>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredCandidates.map((candidate, i) => {
            const color = avatarColors[i % avatarColors.length];
            const pct = totalVotes > 0 ? Math.round((candidate.totalVotes / totalVotes) * 100) : 0;
            return (
              <div key={candidate._id} className="px-3 sm:px-5 py-2.5 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition">
                <span className="text-xs font-bold text-gray-400 w-4 text-center flex-shrink-0">{i + 1}</span>
                {candidate.image ? (
                  <img 
                  src={candidate.image} 
                  alt={candidate.name}
                    onError={(e) => { e.target.style.display = "none"; }}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${color.bg} ${color.text}`}>
                    {getInitials(candidate.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{candidate.name}</p>
                    {i === 0 && <span className="text-xs bg-blue-50 text-blue-700 font-medium px-1.5 py-0.5 rounded-full flex-shrink-0">Leading</span>}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{candidate.party} · {candidate.constituency}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-14 sm:w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                    <div className={`h-full rounded-full ${color.bar}`} style={{ width: `${Math.round((candidate.totalVotes / maxVotes) * 100)}%` }} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">{candidate.totalVotes.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{pct}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
          <p className="text-xs text-gray-500 font-medium">Total votes counted</p>
          <p className="text-xs font-bold text-gray-900">{totalVotes.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1.5">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        Results are verified and tamper-proof
      </p>
    </div>
  );
};

export default Results;