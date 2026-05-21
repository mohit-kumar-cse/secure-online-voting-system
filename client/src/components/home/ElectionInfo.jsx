// client/src/components/home/ElectionInfo.jsx
const ElectionInfo = () => {
  const info = [
    { label: "Election type", value: "Lok Sabha Election" },
    { label: "State", value: "Uttar Pradesh" },
    { label: "Constituency", value: "Prayagraj" },
    { label: "Voting start", value: "10 May 2026" },
    { label: "Voting end", value: "19 May 2026" },
    { label: "Status", value: "Live", live: true },
  ];

  return (
    <section>
      <div className="text-center mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">
          Official info
        </p>
        <h2 className="text-xl font-semibold text-gray-900">Election information</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {info.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-gray-100 rounded-2xl px-4 py-4"
          >
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              {item.label}
            </p>
            {item.live ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-sm font-semibold text-green-600">Live</p>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-900">{item.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ElectionInfo;