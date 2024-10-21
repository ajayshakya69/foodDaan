import { Link } from "react-router-dom";


export default function NavItem({ icon, to, label, active }) {
  return (
    (<Link
      className={`flex items-center rounded-lg px-4 py-2 text-white transition-colors ${active ? "bg-white bg-opacity-20" : "hover:bg-white hover:bg-opacity-10"
        }`}

      to={to}
    >
      {icon}
      <span className="ml-2 text-lg font-medium">{label}</span>
    </Link>)
  );
}