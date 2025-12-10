import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleAuth(e) {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, pass);
      } else {
        await createUserWithEmailAndPassword(auth, email, pass);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }
  async function handleGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={container}>
      <h2>{mode === "login" ? "Sign In" : "Register"}</h2>
      <form
        onSubmit={handleAuth}
        style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">
          {mode === "login" ? "Sign In" : "Register"}
        </button>
      </form>
      <div style={{ marginTop: 8 }}>
        <button onClick={handleGoogle}>Sign in with Google</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Create account" : "Have an account? Sign in"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}