const generateVoteHash = (voteData) => {

  return btoa(
    JSON.stringify(voteData) + Date.now()
  );
};

export default generateVoteHash;