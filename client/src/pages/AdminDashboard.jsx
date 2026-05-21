// client/src/pages/AdminDashboard.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import AdminHeader from "../components/admin/AdminHeader";
import AdminTabs from "../components/admin/AdminTabs";
import OverviewTab from "../components/admin/OverviewTab";
import CandidatesTab from "../components/admin/CandidatesTab";
import AddCandidateTab from "../components/admin/AddCandidateTab";
import VotersTab from "../components/admin/VotersTab";
import ElectionTab from "../components/admin/ElectionTab";

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/home");
      return;
    }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsRes, candidatesRes, votersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/stats", { headers }),
        axios.get("http://localhost:5000/api/candidates"),
        axios.get("http://localhost:5000/api/admin/voters", { headers }),
      ]);
      setStats(statsRes.data);
      setCandidates(candidatesRes.data);
      setVoters(votersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="text-center py-20 text-sm text-gray-400">
      Loading dashboard...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <AdminHeader user={user} />
      <AdminTabs active={tab} onChange={setTab} />

      {tab === "overview" && (
        <OverviewTab stats={stats} token={token} onRefresh={fetchAll} />
      )}
      {tab === "election" && (
        <ElectionTab />
      )}
      {tab === "candidates" && (
        <CandidatesTab
          candidates={candidates}
          token={token}
          onAddNew={() => setTab("add")}
          onRefresh={fetchAll}
        />
      )}
      {tab === "add" && (
        <AddCandidateTab
          token={token}
          onSuccess={() => { fetchAll(); setTab("candidates"); }}
        />
      )}
      {tab === "voters" && (
        <VotersTab voters={voters} />
      )}
    </div>
  );
};

export default AdminDashboard;