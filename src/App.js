
import './App.css';
import AirportsList from './componets/Airports/AirportList';
import FlightsList from './componets/Flights/FlightList';
import { useState,useEffect } from 'react';
import FlightTable from './componets/FlightTable/FlightTable';
// const App = () => {
//   const [activeTab, setActiveTab] = useState("flights");

//   return (
//     <div className="app-container">
//       <div className="tabs">
//         <button 
//           className={activeTab === "flights" ? "active" : ""}
//           onClick={() => setActiveTab("flights")}
//         >
//           Flights
//         </button>
//         <button 
//           className={activeTab === "airports" ? "active" : ""}
//           onClick={() => setActiveTab("airports")}
//         >
//           Airports
//         </button>
//       </div>

//       <div className="content">
//         {activeTab === "flights" ? <FlightsList /> : <AirportsList />}
//       </div>
//     </div>
//   );
// };


const App = () => {
  return (
    <div className="p-5">
      <FlightTable />
    </div>
  );
};
export default App;
