import { Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SpacecraftsPage from "./pages/SpacecraftsPage";
import BuildSpacecraftPage from "./pages/BuildSpacecraftPage";
import PlanetsPage from "./pages/PlanetsPage";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>{" "}
        <Link to="/spacecrafts">Spacecrafts</Link>{" "}
        <Link to="/build">Build Spacecraft</Link>{" "}
        <Link to="/planets">Planets</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spacecrafts" element={<SpacecraftsPage />} />
        <Route path="/build" element={<BuildSpacecraftPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;