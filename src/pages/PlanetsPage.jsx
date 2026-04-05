import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

function PlanetsPage() {
  const [planets, setPlanets] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const planetsResponse = await SpaceTravelApi.getPlanets();
      const spacecraftsResponse = await SpaceTravelApi.getSpacecrafts();

      if (!planetsResponse.isError) {
        setPlanets(planetsResponse.data);
      }

      if (!spacecraftsResponse.isError) {
        setSpacecrafts(spacecraftsResponse.data);
      }

      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Planets</h2>

      {planets.map((planet) => (
        <div key={planet.id}>
          <h3>{planet.name}</h3>
          <p>Population: {planet.currentPopulation}</p>

          <p>Spacecraft on planet:</p>
          <ul>
            {spacecrafts
              .filter((spacecraft) => spacecraft.currentLocation === planet.id)
              .map((spacecraft) => (
                <li key={spacecraft.id}>
  {spacecraft.name}

  <select
    onChange={async (e) => {
      const response = await SpaceTravelApi.sendSpacecraft({
        spacecraftId: spacecraft.id,
        planetId: Number(e.target.value)
      });

      if (!response.isError) {
        const updatedSpacecrafts = await SpaceTravelApi.getSpacecrafts();
        setSpacecrafts(updatedSpacecrafts.data);
      }
    }}
  >
    <option value="">Move to...</option>

    {planets.map((p) => (
      <option key={p.id} value={p.id}>
        {p.name}
      </option>
    ))}
  </select>
              </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PlanetsPage;