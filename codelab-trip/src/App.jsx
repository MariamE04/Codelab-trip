import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [trips, setTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  return (
    <div>
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
        // Beregner duration i dage
        const start = new Date(trip.starttime);
        const end = new Date(trip.endtime);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // dage

        return (
          <div key={trip.id} className="trip-card">
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
  );
}

export default App;
