import Button from "../common/Button";

const VoteCard = ({
  candidateName,
  party,
  manifesto,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Image */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUylaeb_DfDQjlXZauMuQ_R_ZpWGrHOHuRuw&s"
        alt="candidate"
        className="w-full h-60 object-cover"
      />

      {/* Content */}
      <div className="p-6">

        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          {candidateName}
        </h2>

        <p className="text-gray-500 mb-4">
          {party}
        </p>

        <p className="text-gray-700 leading-7 mb-6">
          {manifesto}
        </p>

        <Button
          text="Cast Vote"
          bgColor="bg-green-600"
          hoverColor="hover:bg-green-700"
          width="w-full"
        />

      </div>
    </div>
  );
};

export default VoteCard;