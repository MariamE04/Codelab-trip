import facade from "../apiFacade";
import { useEffect, useState } from "react";

function Guides() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    facade.fetchData("guides")
      .then(data => {
        console.log("Guides data:", data);
        setGuides(data);
      })
      .catch(err => console.error("Error fetching guides:", err));
  }, []);

  return (
    <div>
      <h1>Guides</h1>
      {Array.isArray(guides) ? (
        guides.map(g => (
          <div key={g.id} className="guide-card">
            <p>Name: {g.firstname} {g.lastname}</p>
            <p>Email: {g.email}</p>
            <p>Phone: {g.phone}</p>
            <p>Experience: {g.yearsOfExperience} years</p>
          </div>
        ))
      ) : (
        <p>Loading or unauthorized...</p>
      )}
    </div>
  );
}

export default Guides;
