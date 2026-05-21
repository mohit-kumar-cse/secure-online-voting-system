import api from "./api";


// Get Election Details
export const getElectionDetails = async () => {

  const response = await api.get(
    "/election/details"
  );

  return response.data;
};


// Get Election Status
export const getElectionStatus = async () => {

  const response = await api.get(
    "/election/status"
  );

  return response.data;
};


// Get Election Results
export const getElectionResults = async () => {

  const response = await api.get(
    "/election/results"
  );

  return response.data;
};