import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function TripDetails(){
  const { id } = useParams();
  const [selectedTrip, setSelectedTrip] = useState();


 useEffect(() => {
    fetch(`https://tripapi.cphbusinessapps.dk/api/trips/${id}`)
      .then(res => res.json())
      .then(data => setSelectedTrip(data));
  }, [id]);


   if (!selectedTrip) {
    return <p>Loading trip details...</p>;
  }

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