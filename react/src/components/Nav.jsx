import { Link } from "react-router-dom";

export default function Nav({ user, onSignOut }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <Link to="/random">Random</Link>
      <Link to="/favorites">Favorites</Link>
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>Hi, {user.email}</span>
            <button onClick={onSignOut}>Sign Out</button>
          </>
        ) : (
          <Link to="/auth">Sign In</Link>
        )}
      </div>
    </div>
  );
}
