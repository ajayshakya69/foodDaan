import { NavLink } from "react-router-dom";


export default function NavItem({ icon, to, label, active }) {
  return (
    (<NavLink
      className="flex items-center rounded-lg px-4 py-2 text-white transition-colors hover:font-bold hover:bg-[rgba(255,255,255,0.3)]"
      end
      to={to}
    >
      {icon}
      <span className="ml-2 text-lg font-medium">{label}</span>
    </NavLink>)
  );
}