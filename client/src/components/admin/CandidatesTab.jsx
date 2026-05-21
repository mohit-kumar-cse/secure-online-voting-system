// client/src/components/admin/CandidatesTab.jsx
import axios from "axios";

const getInitials = (name) =>
  name?.split(" ").map((n) => n[0]).join("").toUpperCase();

const CandidatesTab = ({ candidates, token, onAddNew, onRefresh }) => {

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this candidate?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/candidates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onRefresh();
    } catch (err) {
      alert("Failed to delete candidate.");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-900">
          All candidates ({candidates.length})
        </p>
        <button
          onClick={onAddNew}
          className="text-sm bg-blue-700 text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 transition"
        >
          + Add new
        </button>
      </div>

      <div className="divide-y divide-gray-50">
        {candidates.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-10">
            No candidates added yet.
          </p>
        )}
        {candidates.map((c) => (
          <div key={c._id} className="px-5 py-4 flex items-center gap-4">
            {c.image ? (
              <img
                src={`http://localhost:5000/uploads/candidates/${c.image}`}
                alt={c.name}
                onError={(e) => { e.target.style.display = "none"; }}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-800 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                {getInitials(c.name)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-500">{c.party} · {c.constituency}</p>
            </div>
            <div className="text-right mr-4">
              <p className="text-sm font-semibold text-gray-900">{c.totalVotes}</p>
              <p className="text-xs text-gray-400">votes</p>
            </div>
            <button
              onClick={() => handleDelete(c._id)}
              className="text-xs text-red-500 hover:text-red-700 border border-red-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesTab;