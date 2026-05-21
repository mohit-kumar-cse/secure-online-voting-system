const VotingInstructions = () => {
  return (
    <section className="bg-white rounded-2xl shadow-lg p-10">

      <h2 className="text-4xl font-bold text-blue-700 mb-8">
        Voting Instructions
      </h2>

      <div className="space-y-5 text-gray-700 leading-8">

        <p>
          ✔ Verify candidate details carefully before voting.
        </p>

        <p>
          ✔ Each voter can cast only one vote.
        </p>

        <p>
          ✔ Once submitted, the vote cannot be changed.
        </p>

        <p>
          ✔ Your vote remains private and secure.
        </p>

        <p>
          ✔ Results will be announced after election ends.
        </p>

      </div>

    </section>
  );
};

export default VotingInstructions;