import { useEffect, useState } from "react";
import { getAllGenres } from "./services/gameServices.js";
import { Link } from "react-router-dom";
import { Login } from "./Pages/LoginPage.js";
import { LandingPage } from "./Pages/LandingPage.js";
import { Routes, Route } from "react-router-dom";
import { UserGames } from "./Pages/UserGames.js";
import { GameSearch } from "./Pages/GameSearch.js";

export const App = () => {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userGamesList/:userId" element={<UserGames />} />
      <Route path="/search" element={<GameSearch />} />
    </Routes>
  );
};
