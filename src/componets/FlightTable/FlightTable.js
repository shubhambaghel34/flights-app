import FlightDetailsModal from "../FlightModel/FlightDetailsModal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './FlightTable.css';
import { RotateCcw } from "lucide-react"; 
const CACHE_KEY = "flightsData";
const CACHE_EXPIRY_KEY = "flightsDataExpiry";
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const FlightTable = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchFlights = async (forceRefresh = false) => {
        try {
            const cachedData = localStorage.getItem(CACHE_KEY);
            const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

            if (!forceRefresh && cachedData && cacheExpiry && Date.now() < parseInt(cacheExpiry)) {
                setFlights(JSON.parse(cachedData)); 
                setLoading(false);
                return;
            }

            const response = await axios.get(
                `${process.env.REACT_APP_FLIGHT_API_URL}?access_key=${process.env.REACT_APP_ACCESS_KEY}`
            );
            const flightData = response.data.data || [];

            setFlights(flightData);
            setLoading(false);

            localStorage.setItem(CACHE_KEY, JSON.stringify(flightData));
            localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
        } catch (error) {
            console.error("Error fetching flight data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        fetchFlights(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFlights = flights.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="flight-container">
            <h2 className="flight-heading">AeroVista</h2>
            
            <button className="refresh-btn" onClick={handleRefresh} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh Flights"}
            </button>
            {loading ? (
                <p className="loading-text">Loading flights...</p>
            ) : (
                <>
                    <table className="flight-table">
                        <thead>
                            <tr>
                                <th>Flight</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFlights.map((flight, index) => (
                                <tr key={index}>
                                    <td>{flight.flight?.iata || "NA"}</td>
                                    <td>{flight.departure?.airport || "NA"}</td>
                                    <td>{flight.arrival?.airport || "NA"}</td>
                                    <td>
                                        <span className={`flight-status ${flight.flight_status}`}>
                                            {flight.flight_status || "N/A"}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="view-details-btn" onClick={() => setSelectedFlight(flight)}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flight-pagination">
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            ⬅ Prev
                        </button>
                        <span className="pagination-text">Page {currentPage} of {Math.ceil(flights.length / itemsPerPage)}</span>
                        <RotateCcw className="refresh-icon" onClick={() => fetchFlights(true)} />
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={indexOfLastItem >= flights.length}
                        >
                            Next ➡
                        </button>
                    </div>
                </>
            )}

            {/* Flight Modal */}
            {selectedFlight && <FlightDetailsModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />}
        </div>
    );
};

export default FlightTable;
