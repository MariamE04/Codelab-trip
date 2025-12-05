import { useEffect, useState } from "react";

function Guides(){
  const [guides, setGuides] = useState([]);

   useEffect(() => {
    fetch("https://tripapi.cphbusinessapps.dk/api/guides")
      .then(res => res.json())
      .then(data => setGuides(data));
  }, []);

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