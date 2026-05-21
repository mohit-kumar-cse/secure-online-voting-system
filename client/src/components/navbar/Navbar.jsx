// client/src/components/navbar/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import CountdownTimer from "./CountdownTimer";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const voterLinks = [
    { to: "/home", label: "Home" },
    { to: "/candidates", label: "Candidates" },
    { to: "/cast-vote", label: "Cast Vote" },
    { to: "/my-vote", label: "My Vote" },
    { to: "/election-status", label: "Election Status" },
    { to: "/results", label: "Results" },
  ];

  const adminLinks = [
    { to: "/home", label: "Home" },
    { to: "/candidates", label: "Candidates" },
    { to: "/results", label: "Results" },
    { to: "/admin", label: "Admin Panel" },
  ];

  // ✅ Show different links based on role
  const links = user?.role === "ADMIN" ? adminLinks : voterLinks;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-none">SecureVote</p>
            <p className="text-xs text-gray-400 leading-none mt-0.5">
              {user?.role === "ADMIN" ? "Election Commission" : "Digital Elections"}
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive =
              pathname === link.to ||
              (link.to === "/candidates" && pathname.startsWith("/candidate")) ||
              (link.to === "/admin" && pathname.startsWith("/admin"));

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm px-3 py-2 rounded-lg transition font-medium
                  ${link.to === "/admin"
                    ? isActive
                      ? "bg-orange-50 text-orange-700"
                      : "text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                    : isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:text-blue-700 hover:bg-blue-50"
                  }`}
              >
                {/* ✅ Shield icon for admin link */}
                {link.to === "/admin" ? (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <CountdownTimer />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfile((p) => !p)}
                className={`w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center transition
                  ${user.role === "ADMIN"
                    ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </button>
              {showProfile && (
                <ProfileMenu
                  user={user}
                  onLogout={handleLogout}
                  onClose={() => setShowProfile(false)}
                />
              )}
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;