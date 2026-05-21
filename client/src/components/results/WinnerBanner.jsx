const WinnerBanner = ({
  winnerName,
  party,
  totalVotes,
}) => {
  return (
    <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-3xl shadow-2xl p-10 text-center">

      {/* Trophy */}
      <div className="text-7xl mb-6">
        🏆
      </div>

      <h2 className="text-5xl font-bold mb-4">
        Election Winner
      </h2>

      <h3 className="text-4xl font-semibold mb-3">
        {winnerName}
      </h3>

      <p className="text-xl mb-2">
        {party}
      </p>

      <p className="text-lg">
        Total Votes:{" "}
        <span className="font-bold">
          {totalVotes}
        </span>
      </p>

    </section>
  );
};

export default WinnerBanner;