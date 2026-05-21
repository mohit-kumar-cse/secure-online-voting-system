// client/src/components/admin/AdminTabs.jsx
const tabs = [
  { id: "overview", label: "Overview" },
  { id: "election", label: "Election" },
  { id: "candidates", label: "Candidates" },
  { id: "add", label: "Add Candidate" },
  { id: "voters", label: "Voters" },
];

const AdminTabs = ({ active, onChange }) => {
  return (
    <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`text-sm px-4 py-2 rounded-lg font-medium transition
            ${active === t.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;