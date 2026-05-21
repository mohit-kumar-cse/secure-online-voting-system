// client/src/components/results/ResultCard.jsx
const ResultCard = ({ candidate, votes, percentage, isWinner, rank }) => {
  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className={`bg-white rounded-2xl border-2 p-5 hover:shadow-md transition
      ${isWinner ? "border-blue-400 shadow-lg" : "border-gray-100"}`}>

      <div className="flex items-center gap-4 mb-5">
        <div className="relative">
          {candidate.image ? (
            <img
              src={`http://localhost:5000/uploads/candidates/${candidate.image}`}
              alt={candidate.name}
              onError={(e) => { e.target.style.display = "none"; }}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-800 text-xl font-bold flex items-center justify-center">
              {getInitials(candidate.name)}
            </div>
          )}
          <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center
            ${isWinner ? "bg-yellow-400 text-yellow-900" : "bg-gray-100 text-gray-500"}`}>
            {rank}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-sm font-semibold text-gray-900">{candidate.name}</h2>
            {isWinner && (
              <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-full">
                Leading
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">{candidate.party}</p>
          <p className="text-xs text-gray-400">{candidate.constituency}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-gray-500">Votes</span>
          <span className="text-xs font-bold text-gray-800">{votes.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-1.5">
          <div
            className={`h-2 rounded-full transition-all duration-700 ${isWinner ? "bg-blue-600" : "bg-gray-400"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className={`text-right text-xs font-semibold ${isWinner ? "text-blue-600" : "text-gray-500"}`}>
          {percentage}%
        </p>
      </div>
    </div>
  );
};

export default ResultCard;