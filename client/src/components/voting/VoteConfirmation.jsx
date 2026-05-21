const VoteConfirmation = ({
  candidateName,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

      {/* Success Icon */}
      <div className="text-7xl mb-6">
        ✅
      </div>

      <h2 className="text-4xl font-bold text-green-600 mb-5">
        Vote Successfully Casted
      </h2>

      <p className="text-lg text-gray-700 mb-3">
        You voted for:
      </p>

      <h3 className="text-3xl font-bold text-blue-700 mb-6">
        {candidateName}
      </h3>

      <p className="text-gray-500">
        Your vote is securely stored using blockchain technology.
      </p>

    </div>
  );
};

export default VoteConfirmation;