import { NavLink } from "react-router-dom";

export default function NavBar() {
  const navClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <nav className="navbar">

      <NavLink to="/" className="nav-brand">
        Welcome!!!
      </NavLink>

      <div className="nav-links-right">
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
        <NavLink to="/search" className={navClass}>
          Search
        </NavLink>
        <NavLink to="/random" className={navClass}>
          Random
        </NavLink>
        <NavLink to="/favourites" className={navClass}>
          Favourites
        </NavLink>
      </div>
    </nav>
  );
}
