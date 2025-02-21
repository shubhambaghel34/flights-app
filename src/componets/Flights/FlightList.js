import React, { useState, useEffect } from "react";
import "./FlightList.css"; 
const API_URL = `${process.env.REACT_APP_FLIGHT_API_URL}?access_key=${process.env.ACCESS_KEY}`;

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setFlights(data.data || []);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlights();
  }, []);

  const formatData = (value) => (value ? value : "N/A");

  const openModal = (flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFlight(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flights-container">
      {flights.map((flight, index) => (
        <div key={index} className="flight-card">
          <h3>
            Flight {formatData(flight.flight?.number)} ({formatData(flight.airline?.name)})
          </h3>
          <p>
            <strong>Date:</strong> {formatData(flight.flight_date)}
          </p>
          <p>
            <strong>Departure:</strong> {formatData(flight.departure?.airport)} ({formatData(flight.departure?.iata)}/
            {formatData(flight.departure?.icao)})
          </p>
          <p>
            <strong>Arrival:</strong> {formatData(flight.arrival?.airport)} ({formatData(flight.arrival?.iata)}/
            {formatData(flight.arrival?.icao)})
          </p>

          <button className="details-btn" onClick={() => openModal(flight)}>View Details</button>
        </div>
      ))}

      {isModalOpen && selectedFlight && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h3>
              Flight {formatData(selectedFlight.flight?.number)} ({formatData(selectedFlight.airline?.name)})
            </h3>
            <p><strong>Date:</strong> {formatData(selectedFlight.flight_date)}</p>

            <h4>Departure</h4>
            <p><strong>Airport:</strong> {formatData(selectedFlight.departure?.airport)} ({formatData(selectedFlight.departure?.iata)}/{formatData(selectedFlight.departure?.icao)})</p>
            <p><strong>Timezone:</strong> {formatData(selectedFlight.departure?.timezone)}</p>
            <p><strong>Terminal:</strong> {formatData(selectedFlight.departure?.terminal)}</p>
            <p><strong>Gate:</strong> {formatData(selectedFlight.departure?.gate)}</p>
            <p><strong>Scheduled:</strong> {formatData(selectedFlight.departure?.scheduled)}</p>
            <p><strong>Estimated:</strong> {formatData(selectedFlight.departure?.estimated)}</p>
            <p><strong>Actual:</strong> {formatData(selectedFlight.departure?.actual)}</p>

            <h4>Arrival</h4>
            <p><strong>Airport:</strong> {formatData(selectedFlight.arrival?.airport)} ({formatData(selectedFlight.arrival?.iata)}/{formatData(selectedFlight.arrival?.icao)})</p>
            <p><strong>Timezone:</strong> {formatData(selectedFlight.arrival?.timezone)}</p>
            <p><strong>Gate:</strong> {formatData(selectedFlight.arrival?.gate)}</p>
            <p><strong>Scheduled:</strong> {formatData(selectedFlight.arrival?.scheduled)}</p>
            <p><strong>Estimated:</strong> {formatData(selectedFlight.arrival?.estimated)}</p>
            <p><strong>Actual:</strong> {formatData(selectedFlight.arrival?.actual)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsList;
