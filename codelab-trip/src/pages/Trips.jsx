import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

function Trips(){
const [trips, setTrips] = useState([]);
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");


useEffect(() => {
  fetch("https://tripapi.cphbusinessapps.dk/api/trips")
    .then(res => res.json())
    .then(data => {
      setTrips(data);
      const uniqueCategories = [...new Set(data.map(t => t.category))];
      setCategories(uniqueCategories);
    });
}, []);

let filteredTrips = trips;
  if (selectedCategory !== "") {
    filteredTrips = trips.filter(t => t.category === selectedCategory);
  }

  return(
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


       {filteredTrips.map(trip => {
        const start = new Date(trip.starttime);
        const end = new Date(trip.endtime);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    return (
          <Link key={trip.id} to={`/trip/${trip.id}`}>
            <div className="trip-card">
              <h3>{trip.name}</h3>
              <p>Category: {trip.category}</p>
              <p>Start: {trip.starttime}</p>
              <p>End: {trip.endtime}</p>
              <p>Price: {trip.price}</p>
              <p>Duration: {duration} days</p>
            </div>
          </Link>
        );
      })}

    </div>

  );

}

export default Trips;