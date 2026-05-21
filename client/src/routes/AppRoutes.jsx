// C:\secure-online-voting-system\client\src\routes\AppRoutes.jsx

import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Candidates from "../pages/Candidates";
import CandidateProfile from "../pages/CandidateProfile";
import CastVote from "../pages/CastVote";
import MyVote from "../pages/MyVote";
import ElectionStatus from "../pages/ElectionStatus";
import Results from "../pages/Results";
import AdminDashboard from "../pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [

      // Default Route
      {
        index: true,
        element: <Login />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },


      // Login
      {
        path: "login",
        element: <Login />,
      },

      // Register
      {
        path: "register",
        element: <Register />,
      },

      // Home
      {
        path: "home",
        element: <Home />,
      },

      // Candidates
      {
        path: "candidates",
        element: <Candidates />,
      },

      // Candidate Profile
      {
        path: "candidate/:id",
        element: <CandidateProfile />,
      },

      // Cast Vote
      {
        path: "cast-vote",
        element: <CastVote />,
      },

      // My Vote
      {
        path: "my-vote",
        element: <MyVote />,
      },

      // Election Status
      {
        path: "election-status",
        element: <ElectionStatus />,
      },

      // Results
      {
        path: "results",
        element: <Results />,
      },

    ],
  },
]);

export default router;