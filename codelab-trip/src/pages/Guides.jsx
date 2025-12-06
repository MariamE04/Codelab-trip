import facade from "../apiFacade";
import { useEffect, useState } from "react";

function Guides() {
  const [guides, setGuides] = useState([]);                               // guides starter som en tom array

  useEffect(() => {
    facade.fetchData("guides")                                           // henter guidenes data
      .then(data => {
        console.log("Guides data:", data);
        setGuides(data);                                                 // Når API’et svarer, lægger vi data ind i guides ved at kalde setGuides(data)
      })
      .catch(err => console.error("Error fetching guides:", err));
  }, []);                                                                // kør kun én gang, når komponenten loades

  return (
    <div>
      <h1>Guides</h1>

         {/*ternary expression (kort if/else). - Hvis guides = array:. vis listen af guides -Hvis guides != array vis: Loading or unauthorized.*/}
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



// useState → laver en variabel, der kan ændre sig over tid
// useEffect → kører kode, når komponenten loader



// Hvorfor tjekke Array.isArray(guides)?
// Fordi:
// Når komponenten loades første gang, kan guides være tom eller undefined
// Hvis fetch fejler (fx ikke logget ind), kan backend returnere en fejl-JSON, og så er guides ikke en array længere
// Hvis det ikke er en array, så kan vi ikke lave .map(), og så ville appen crashe