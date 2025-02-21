import React, { useState, useEffect } from "react";
import "./AirportList.css";

const API_URL = `${process.env.FLIGHTS_URL}?access_key=${process.env.ACCESS_KEY}`;

const AirportsList = () => {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAirports = async () => {
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setAirports(data.data || []);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching airport data:", error);
          setLoading(false);
        }
      };
  
      fetchAirports();
    }, []);
  
    if (loading) return <p>Loading airports...</p>;
  
    return (
      <div className="airports-container">
        {airports.map((airport, index) => (
          <div key={index} className="airport-card">
            <h3>{airport.airport_name}</h3>
            <p><strong>IATA Code:</strong> {airport.iata_code}</p>
            <p><strong>ICAO Code:</strong> {airport.icao_code}</p>
            <p><strong>Timezone:</strong> {airport.timezone}</p>
            <p><strong>GMT Offset:</strong> {airport.gmt || "N/A"}</p>
            <p><strong>Country:</strong> {airport.country_name}</p>
            <p><strong>City Code:</strong> {airport.city_iata_code}</p>
          </div>
        ))}
      </div>
    );
  };
export default AirportsList;
