// client/src/components/admin/OverviewTab.jsx
import { useState } from "react";
import axios from "axios";

const OverviewTab = ({ stats, token, onRefresh }) => {
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleResetVotes = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/admin/reset-votes",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResetConfirm(false);
      onRefresh();
    } catch (err) {
      alert("Failed to reset votes.");
    }
  };

  if (!stats) return null;

  const statCards = [
    { label: "Total Voters", value: stats.totalVoters, color: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500" },
    { label: "Votes Cast", value: stats.totalVotes, color: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" },
    { label: "Candidates", value: stats.totalCandidates, color: "text-purple-700", bg: "bg-purple-50", dot: "bg-purple-500" },
    { label: "Voter Turnout", value: `${stats.turnout}%`, color: "text-orange-700", bg: "bg-orange-50", dot: "bg-orange-500" },
  ];

  return (
    <div className="space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <div className={`w-3 h-3 rounded-full ${s.dot}`} />
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Turnout bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium text-gray-900">Voter turnout</p>
          <p className="text-sm font-bold text-blue-700">{stats.turnout}%</p>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-700"
            style={{ width: `${stats.turnout}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{stats.votedCount} voted</span>
          <span>{stats.totalVoters - stats.votedCount} not voted</span>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white border border-red-100 rounded-2xl p-5">
        <p className="text-sm font-semibold text-red-700 mb-1">Danger zone</p>
        <p className="text-xs text-gray-500 mb-4">
          Resetting votes will clear all cast votes and reset all candidate tallies. This cannot be undone.
        </p>
        {!resetConfirm ? (
          <button
            onClick={() => setResetConfirm(true)}
            className="text-sm bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          >
            Reset all votes
          </button>
        ) : (
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-xs text-red-600 font-medium">Are you sure? This is irreversible.</p>
            <button
              onClick={handleResetVotes}
              className="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Yes, reset
            </button>
            <button
              onClick={() => setResetConfirm(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default OverviewTab;