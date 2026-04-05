import { useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";

function BuildSpacecraftPage() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name || !capacity || !description) {
      setError("Name, capacity, and description are required.");
      setSuccess("");
      return;
    }

    const response = await SpaceTravelApi.buildSpacecraft({
      name,
      capacity: Number(capacity),
      description
    });

    if (!response.isError) {
      setSuccess("Spacecraft built successfully.");
      setError("");
      setName("");
      setCapacity("");
      setDescription("");
    }
  }

  return (
    <div>
      <h2>Build Spacecraft</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button type="submit">Build</button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
}

export default BuildSpacecraftPage;