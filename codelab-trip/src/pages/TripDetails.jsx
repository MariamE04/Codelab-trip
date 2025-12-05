import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facade from "../apiFacade";

function TripDetails() {
  const { id } = useParams();
  const [selectedTrip, setSelectedTrip] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    facade.fetchData(`trips/${id}`)
      .then(data => {
        setSelectedTrip(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch trip details. You might need to log in.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading trip details...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedTrip) return <p>No trip found</p>;

  const start = new Date(selectedTrip.starttime);
  const end = new Date(selectedTrip.endtime);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  return (
    <div className="trip-details">
      <h2>{selectedTrip.name}</h2>
      <p>Category: {selectedTrip.category}</p>
      <p>Start: {selectedTrip.starttime}</p>
      <p>End: {selectedTrip.endtime}</p>
      <p>Price: {selectedTrip.price}</p>
      <p>Duration: {duration} days</p>

      <h3>Guide</h3>
      <p>Name: {selectedTrip.guide.firstname} {selectedTrip.guide.lastname}</p>
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
