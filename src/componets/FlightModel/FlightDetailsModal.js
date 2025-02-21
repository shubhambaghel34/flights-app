
import React from "react";
import '../FlightTable/FlightTable.css';
const FlightDetailsModal = ({ flight, onClose }) => {
  return (
    <>
      <div className="flight-modal-overlay" onClick={onClose}></div>
      <div className="flight-modal">
        <div><span>Airline:</span> {flight.airline_name || "N/A"}</div>
        <div><span>Flight Date:</span> {flight.flight_date || "N/A"}</div>
        <div><span>Departure Airport:</span> {flight.departure.airport || "N/A"}</div>
        <div><span>Departure Timezone:</span> {flight.departure.timezone || "N/A"}</div>
        <div><span>Terminal:</span> {flight.departure.terminal || "N/A"}</div>
        <div><span>Gate:</span> {flight.departure.gate || "N/A"}</div>
        <div><span>Delay:</span> {flight.departure.delay || "0 min"}</div>
        <div><span>Scheduled:</span> {flight.departure.scheduled || "N/A"}</div>
        <div><span>Estimated:</span> {flight.departure.estimated || "N/A"}</div>
        <div><span>Arrival Airport:</span> {flight.arrival.airport || "N/A"}</div>
        <div><span>Arrival Timezone:</span> {flight.arrival.timezone || "N/A"}</div>
        <div><span>Arrival Gate:</span> {flight.arrival.gate || "N/A"}</div>
        <div><span>Arrival Scheduled:</span> {flight.arrival.scheduled || "N/A"}</div>
        <div><span>Arrival Estimated:</span> {flight.arrival.estimated || "N/A"}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </>



  );
};




export default FlightDetailsModal;
