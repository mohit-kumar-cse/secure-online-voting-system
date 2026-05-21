// client/src/components/navbar/NavLinks.jsx
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/home", label: "Home" },
  { to: "/candidates", label: "Candidates" },
  { to: "/cast-vote", label: "Cast Vote" },
  { to: "/my-vote", label: "My Vote" },
  { to: "/election-status", label: "Election Status" },
  { to: "/results", label: "Results" },
];

const NavLinks = ({ onClose }) => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col md:flex-row items-start md:items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={onClose}
          className={`text-sm px-3 py-2 rounded-lg transition w-full md:w-auto
            ${pathname === link.to
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
            }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;