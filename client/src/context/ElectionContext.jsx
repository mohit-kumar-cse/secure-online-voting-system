// client/src/context/ElectionContext.jsx

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ElectionContext = createContext();

const ElectionProvider = ({ children }) => {

  const [election, setElection] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchElection = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:5000/api/election/active"
      );

      setElection(data);

    } catch (err) {

      // Ignore no active election error
      if (err.response?.status !== 404) {

        console.error(
          "Election fetch error:",
          err.response?.data || err.message
        );
      }

      setElection(null);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchElection();

  }, []);

  return (

    <ElectionContext.Provider
      value={{
        election,
        loading,
        refetch: fetchElection,
      }}
    >

      {children}

    </ElectionContext.Provider>
  );
};

export default ElectionProvider;