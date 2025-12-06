import { Link } from "react-router-dom";    // bruges til navigation til en trips “detalje-side”.
import { useState, useEffect } from "react"; // bruges til state og datahentning.
import "../App.css";

function Trips(){
const [trips, setTrips] = useState([]);                                     // holder alle trips hentet fra API’et (starter tomt)
const [categories, setCategories] = useState([]);                           // holder kun unikke kategorier til dropdown-menuen.
const [selectedCategory, setSelectedCategory] = useState("");               // holder den kategori brugeren vælger (default = "" betyder alle).


useEffect(() => {                                                           // Henter trips fra API’et én gang, fordi dependency-arrayet er tomt []
  fetch("https://tripapi.cphbusinessapps.dk/api/trips")                     
    .then(res => res.json())
    .then(data => {                                                         // Når data kommer: Gemmes trips i setTrips
      setTrips(data);
      const uniqueCategories = [...new Set(data.map(t => t.category))];     // Kategorier udtrækkes: ved at lave en liste af unikke værdier
      setCategories(uniqueCategories);                                      // Og gemmes i setCategories
    });   
}, []);

let filteredTrips = trips;
  if (selectedCategory !== "") {                                            // Hvis ingen kategori er valgt: vis alle trips.
    filteredTrips = trips.filter(t => t.category === selectedCategory);     // Hvis en kategori vælges → filter efter den kategori.
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
          <Link key={trip.id} to={`/trip/${trip.id}`}>     {/*Når man klikker, sendes man til en detaljeret side for den trip. */}
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