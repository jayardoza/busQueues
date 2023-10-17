import { useState, useEffect } from 'react';
import axios from 'axios';

function BusQueue() {
  const [passengers, setPassengers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const [bus1Queue, setBus1Queue] = useState([]);
  const [bus2Queue, setBus2Queue] = useState([]);
  const [bus3Queue, setBus3Queue] = useState([]);

  const [newPassengerName, setNewPassengerName] = useState('');
  const [newPassengerTicketId, setNewPassengerTicketId] = useState('');

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/troy1129/jsonplaceholder/passengers')
      .then((response) => {
        setPassengers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching passengers:', error);
      });

    axios.get('https://my-json-server.typicode.com/troy1129/jsonplaceholder/destinations')
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
      });
  }, []);

  const handleAddPassenger = (e) => {
    e.preventDefault();
  
    if (passengers.some((passenger) => passenger.id === newPassengerTicketId)) {
      alert('Ticket ID must be unique.');
      return;
    }
  
    const newPassenger = {
      name: newPassengerName,
      id: newPassengerTicketId,
      destination: '', 
    };
  
    setPassengers([...passengers, newPassenger]);
  
    setNewPassengerName('');
    setNewPassengerTicketId('');
  };

  const moveToBus = (passenger, destinationName) => {
    const destination = destinations.find((dest) => dest.destination === destinationName);

    if (destination) {
      setTotalSales(totalSales + destination.price);

      if (destinationName === 'Cebu' || destinationName === 'Mandaue') {
        setBus1Queue([...bus1Queue, passenger]);
      } else if (destinationName === 'Lilo-an' || destinationName === 'Lapu-Lapu') {
        setBus2Queue([...bus2Queue, passenger]);
      } else if (destinationName === 'Consolacion' || destinationName === 'Talisay') {
        setBus3Queue([...bus3Queue, passenger]);
      }

      setPassengers(passengers.filter((p) => p.id !== passenger.id));
    }
  };

  return (
    <div>
      <div className="sales-title">Sales</div>
      <div className="sales-container">
        <h2>Total Sales: {totalSales}</h2>
      </div>

      <div className="form-title">Add Passenger</div>
      <div className="form-container">
        <form onSubmit={handleAddPassenger}>
          <div>
            <label htmlFor="newPassengerName">Name:</label>
            <input
              type="text"
              id="newPassengerName"
              value={newPassengerName}
              onChange={(e) => setNewPassengerName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="newPassengerTicketId">Ticket ID:</label>
            <input
              type="text"
              id="newPassengerTicketId"
              value={newPassengerTicketId}
              onChange={(e) => setNewPassengerTicketId(e.target.value)}
            />
          </div>
          <button type="submit">Add Passenger</button>
        </form>
      </div>

      <div className="passengers-title">Passenger</div>
      <div className="passengers-container">
        <ul>
          {passengers.map((passenger) => (
            <li key={passenger.id}>
              {passenger.name} - Ticket ID: {passenger.id}
              <div>
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => moveToBus(passenger, destination.destination)}
                  >
                    {destination.destination} - Price: {destination.price}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bus-queue-title">Bus Queues</div>
      <div className="bus-queue-container">
        <div className="bus-queue">
          <div className="queue">
            <h3>Bus 1</h3>
            <ul className="passenger-list">
              {bus1Queue.map((passenger) => (
                <li key={passenger.id}>
                  Name: {passenger.name}
                  <br />
                  Ticket ID: {passenger.id}
                  <br />
                  Destination: Cebu
                </li>
              ))}
            </ul>
          </div>
          <div className="queue">
            <h3>Bus 2</h3>
            <ul className="passenger-list">
              {bus2Queue.map((passenger) => (
                <li key={passenger.id}>
                  Name: {passenger.name}
                  <br />
                  Ticket ID: {passenger.id}
                  <br />
                  Destination: Lilo-an
                </li>
              ))}
            </ul>
          </div>
          <div className="queue">
            <h3>Bus 3</h3>
            <ul className="passenger-list">
              {bus3Queue.map((passenger) => (
                <li key={passenger.id}>
                  Name: {passenger.name}
                  <br />
                  Ticket ID: {passenger.id}
                  <br />
                  Destination: Consolacion
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );     
}

export default BusQueue;
