import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Space Travel</h1>
      <p>Welcome commander.</p>

      <p><Link to="/spacecrafts">View spacecrafts</Link></p>
      <p><Link to="/build">Build a spacecraft</Link></p>
      <p><Link to="/planets">View planets</Link></p>
    </div>
  );
}

export default HomePage;