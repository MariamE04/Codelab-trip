import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facade from "../apiFacade";

function TripDetails() {
  const { id } = useParams();                                     // Hvis URL’en er f.eks. /trips/5, så bliver id = 5 -Det bruges til at hente den rigtige tur fra backend.
  const [selectedTrip, setSelectedTrip] = useState(null);         // her gemmes turens detaljer
  const [error, setError] = useState(null);                       // gemmer fejl (fx hvis brugeren ikke har adgang)

  useEffect(() => {
    facade.fetchData("trips/" + id)                               // Der hentes kun én tur, baseret på id
      .then(data => {
        console.log("Trip data:", data);
        setSelectedTrip(data);                                    // gemmer den hentede trip i selectedTrip
      })
      .catch(err => {
        console.error("Error fetching trip:", err);
        setError("Access denied or error loading trip");          // Der bruges error state til at vise fejlbeskeder
      });
  }, [id]);                                                       // “hvis id ændrer sig, hent den nye tur”.

  if (error) return <p>{error}</p>;                               // Hvis der er fejl: vis fejl
  if (!selectedTrip) return <p>Loading trip details...</p>;       // vis data ikke er klar: vis “Loading…”

  return (
    <div className="trip-details">
      <h2>{selectedTrip.name}</h2>
      <p>Category: {selectedTrip.category}</p>
      <p>Start: {selectedTrip.starttime}</p>
      <p>End: {selectedTrip.endtime}</p>
      <p>Price: {selectedTrip.price}</p>
      <p>Duration: {selectedTrip.duration} days</p>

      <h3>Guide</h3>
      <p>
        Name: {selectedTrip.guide.firstname} {selectedTrip.guide.lastname}
      </p>
      <p>Email: {selectedTrip.guide.email}</p>
      <p>Phone: {selectedTrip.guide.phone}</p>
      <p>Experience: {selectedTrip.guide.yearsOfExperience} years</p>

      <h3>Items</h3>
      
          {/* ?. sikre at koden ikke crasher hvis packingItems er null eller undefined. */}
      {selectedTrip.packingItems?.map((item, idx) => (
        <div key={idx} className="packing-item">
          <p>Name: {item.name}</p>
          <p>Weight: {item.weightInGrams}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Description: {item.description}</p>
          <p>Category: {item.category}</p>

          {item.buyingOptions?.length > 0 && (
            <>
              <h4>Buying Options</h4>
              {item.buyingOptions.map((opt, i) => (
                <div key={i} className="buying-option">
                  <p>Shop: {opt.shopName}</p>
                  <p>Price: {opt.price}</p>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TripDetails;
