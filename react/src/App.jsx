import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Search from "./pages/Search";
import RandomGenerator from "./pages/RandomGenerator";
import Favorites from "./pages/Favorites";
import Auth from "./pages/Auth";

import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) setUser({ uid: u.uid, email: u.email });
      else setUser(null);
    });
    return () => unsub();
  }, []);

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <Router>
      <Nav user={user} onSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/search" element={<Search user={user} />} />
        <Route path="/random" element={<RandomGenerator user={user} />} />
        <Route path="/favorites" element={<Favorites user={user} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
