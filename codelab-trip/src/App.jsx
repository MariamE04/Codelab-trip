import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [trips, setTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTrip, setSelectedTrip] = useState();

  // HENT TRIPS + UDLÆS KATEGORIER
  useEffect(() => {
    fetch("https://tripapi.cphbusinessapps.dk/api/trips")
      .then((response) => response.json())
      .then((data) => {
        setTrips(data);

        // Udtræk unikke kategorier fra trips
        const uniqueCategories = [...new Set(data.map((trip) => trip.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching trip info:", error));
  }, []);

  // FILTER TRIPS
  let filteredTrips = trips;

  if (selectedCategory !== "") {
    filteredTrips = trips.filter((trip) => {
      return trip.category === selectedCategory;
    });
  }

  // fetch trips detail
  function fetchTripDetails(id) {
  fetch(`https://tripapi.cphbusinessapps.dk/api/trips/${id}`)
    .then(res => res.json())
    .then(data => setSelectedTrip(data));
}

  return (
    <div className="app-container">
  {/* Venstre kolonne: Trip list */}
  <div className="trip-list">
    <h1>All Trips</h1>

    {/* Dropdown */}
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    {/* Trip list */}
    {filteredTrips.map((trip) => {
      const start = new Date(trip.starttime);
      const end = new Date(trip.endtime);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // dage

      return (
        <div key={trip.id} className="trip-card"onClick={() => fetchTripDetails(trip.id)}>
          <h3>{trip.name}</h3>
          <p>Category: {trip.category}</p>
          <p>Start: {trip.starttime}</p>
          <p>End: {trip.endtime}</p>
          <p>Price: {trip.price}</p>
          <p>Duration: {duration} days</p>
        </div>
      );
    })}
  </div>

  {/* Højre kolonne: Trip Details */}
  {selectedTrip && (
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
{selectedTrip.packingItems && selectedTrip.packingItems.length > 0 && (
  selectedTrip.packingItems.map((item, itemIdx) => (
    <div key={item.id || itemIdx} className="packing-item">
      <p>Name: {item.name}</p>
      <p>Weight: {item.weightInGrams}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Description: {item.description}</p>
      <p>Category: {item.category}</p>

      {item.buyingOptions && item.buyingOptions.length > 0 && (
        <>
          <h4>Buying Options:</h4>
          {item.buyingOptions.map((option, optionIdx) => (
            <div key={optionIdx} className="buying-option">
              <p>Shop: {option.shopName}</p>
              <p>Price: {option.price}</p>
            </div>
          ))}
        </>
      )}
    </div>
  ))
)}
    </div>
  )}
</div>
  );
}

export default App;
