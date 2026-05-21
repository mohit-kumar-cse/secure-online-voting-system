// client/src/pages/Candidates.jsx
import { useEffect, useState } from "react";
import CandidateCard from "../components/candidate/CandidateCard";
import { getCandidates } from "../services/candidateService";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="text-center py-20 text-sm text-gray-400">
      Loading candidates...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
          India General Election 2026
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">
          Election candidates
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {candidates.length} candidates registered
        </p>
      </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {candidates.map((candidate, index) => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Candidates;