// client/src/components/admin/AdminHeader.jsx
const AdminHeader = ({ user }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
          Election Commission
        </p>
        <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
      </div>
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
        <div className="w-7 h-7 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs font-bold">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-900">{user?.name}</p>
          <p className="text-xs text-blue-500">Election Commissioner</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;