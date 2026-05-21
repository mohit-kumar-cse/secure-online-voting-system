const VotingStatus = ({
  totalVotes,
  votingPercentage,
  remainingTime,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Total Votes */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

        <h2 className="text-5xl font-bold text-blue-700 mb-4">
          {totalVotes}
        </h2>

        <p className="text-gray-600 text-lg">
          Total Votes Casted
        </p>

      </div>

      {/* Voting Percentage */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

        <h2 className="text-5xl font-bold text-green-600 mb-4">
          {votingPercentage}%
        </h2>

        <p className="text-gray-600 text-lg">
          Voting Percentage
        </p>

      </div>

      {/* Remaining Time */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

        <h2 className="text-4xl font-bold text-red-500 mb-4">
          {remainingTime}
        </h2>

        <p className="text-gray-600 text-lg">
          Remaining Time
        </p>

      </div>

    </section>
  );
};

export default VotingStatus;