import { useEffect, useState } from "react";
import facade from "../apiFacade";

function Guides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    facade.fetchData("guides")
      .then(data => {
        setGuides(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch guides. You need ADMIN access.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading guides...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Guides</h1>
      {guides.map(g => (
        <div key={g.id} className="guide-card">
          <p>Name: {g.firstname} {g.lastname}</p>
          <p>Email: {g.email}</p>
          <p>Phone: {g.phone}</p>
          <p>Experience: {g.yearsOfExperience} years</p>
        </div>
      ))}
    </div>
  );
}

export default Guides;
