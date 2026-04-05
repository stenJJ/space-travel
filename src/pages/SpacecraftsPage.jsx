import { useEffect, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

function SpacecraftsPage() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [selectedSpacecraft, setSelectedSpacecraft] = useState(null);
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

  async function showDetails(id) {
    const response = await SpaceTravelApi.getSpacecraftById({ id });

    if (!response.isError) {
      setSelectedSpacecraft(response.data);
    }
  }

  async function destroySpacecraft(id) {
    const response = await SpaceTravelApi.destroySpacecraftById({ id });

    if (!response.isError) {
      setSpacecrafts((prevSpacecrafts) =>
        prevSpacecrafts.filter((spacecraft) => spacecraft.id !== id)
      );

      if (selectedSpacecraft && selectedSpacecraft.id === id) {
        setSelectedSpacecraft(null);
      }
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Spacecrafts</h2>

      <ul>
        {spacecrafts.map((spacecraft) => (
          <li key={spacecraft.id}>
            <button onClick={() => showDetails(spacecraft.id)}>
              {spacecraft.name} - capacity: {spacecraft.capacity}
            </button>

            <button onClick={() => destroySpacecraft(spacecraft.id)}>
              Destroy
            </button>
          </li>
        ))}
      </ul>

      {selectedSpacecraft && (
        <div>
          <h3>{selectedSpacecraft.name}</h3>
          <p>Capacity: {selectedSpacecraft.capacity}</p>
          <p>{selectedSpacecraft.description}</p>
        </div>
      )}
    </div>
  );
}

export default SpacecraftsPage;