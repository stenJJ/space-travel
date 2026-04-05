import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSpacecrafts() {
      const response = await SpaceTravelApi.getSpacecrafts();

      if (!response.isError) {
        setSpacecrafts(response.data);
      }

      setLoading(false);
    }

    getSpacecrafts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Spacecrafts</h2>

      <ul>
        {spacecrafts.map((spacecraft) => (
          <li key={spacecraft.id}>
            {spacecraft.name} - capacity: {spacecraft.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpacecraftsPage;