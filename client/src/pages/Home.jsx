// client/src/pages/Home.jsx

import { useEffect, useState } from "react";

import HeroSection from "../components/home/HeroSection";
import ElectionInfo from "../components/home/ElectionInfo";
import ElectionTypes from "../components/home/ElectionTypes";
import Statistics from "../components/home/Statistics";
import CandidatePreview from "../components/home/CandidatePreview";
import Guidelines from "../components/home/Guidelines";

const Home = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/candidates"
        );

        const data = await response.json();

        setCandidates(data);
      } catch (error) {
        console.log("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Prevent HeroSection flicker
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">
            Loading election data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Dynamic Hero Section */}
      <HeroSection candidates={candidates} />

      <ElectionInfo />

      <Statistics />

      <ElectionTypes />

      {/* Candidate Preview */}
      <CandidatePreview candidates={candidates} />

      <Guidelines />
    </div>
  );
};

export default Home;