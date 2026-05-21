import api from "./api";

export const castVote = async (voteData) => {

  const response = await api.post(
    "/votes/cast",
    voteData
  );

  return response.data;
};

export const getMyVote = async () => {

  const response = await api.get("/votes/my-vote");

  return response.data;
};