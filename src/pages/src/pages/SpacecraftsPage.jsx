import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState([]);

  useEffect(() => {
    async function getSpacecrafts() {
      const response = await SpaceTravelApi.getSpacecrafts();
      if (!response.isError) {
        setSpacecrafts(response.data);
      }
    }
    getSpacecrafts();
  }, []);

  return (
    <div>
      <h2>Spacecrafts</h2>
      <ul>
        {spacecrafts.map(sc => (
          <li key={sc.id}>
            {sc.name} — capacity: {sc.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpacecraftsPage;