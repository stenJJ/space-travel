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

  if (loading) {
    return <p>Loading...</p>;
  }

 return (
  <div>
    <h1>Spacecrafts</h1>

    <ul>
      {spacecrafts.map((spacecraft) => (
        <li key={spacecraft.id}>
          {spacecraft.name} - capacity: {spacecraft.capacity}

          <button
            onClick={async () => {
              const response = await SpaceTravelApi.destroySpacecraft({
                id: spacecraft.id
              });

              if (!response.isError) {
                setSpacecrafts((prev) =>
                  prev.filter((s) => s.id !== spacecraft.id)
                );
              }
            }}
          >
            Destroy
          </button>
        </li>
      ))}
    </ul>
  </div>
 );
}

export default SpacecraftsPage;