import axios from "axios";

const API =
  "http://localhost:5000/api/candidates";


// Get All Candidates
export const getCandidates = async () => {

  const response = await axios.get(API);

  return response.data;
};