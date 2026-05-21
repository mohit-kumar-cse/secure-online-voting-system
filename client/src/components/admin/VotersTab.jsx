// client/src/components/admin/VotersTab.jsx
const getInitials = (name) =>
  name?.split(" ").map((n) => n[0]).join("").toUpperCase();

const VotersTab = ({ voters }) => {
  const voted = voters.filter((v) => v.hasVoted).length;
  const notVoted = voters.length - voted;

  return (
    <div className="space-y-4">

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total registered", value: voters.length, color: "text-gray-900" },
          { label: "Voted", value: voted, color: "text-green-700" },
          { label: "Not voted", value: notVoted, color: "text-gray-400" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Voter list */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-900">
            Registered voters ({voters.length})
          </p>
        </div>
        <div className="divide-y divide-gray-50">
          {voters.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-10">
              No voters registered yet.
            </p>
          )}
          {voters.map((v) => (
            <div key={v._id} className="px-5 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                {getInitials(v.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{v.name}</p>
                <p className="text-xs text-gray-400 truncate">
                  {v.email} · Voter ID: {v.voterId}
                </p>
              </div>
              <div className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0
                ${v.hasVoted ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"}`}>
                {v.hasVoted ? "✓ Voted" : "Not voted"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotersTab;