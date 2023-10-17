import { useState } from 'react';
import BusQueue from './components/BusQueue';
import './App.css';
function App() {
  const [queue, setQueue] = useState([]);

  const addPassengerToQueue = (passenger) => {
    setQueue([...queue, passenger]);
  };

  return (
    <div>
      <h1>Bus Queue and Loading System</h1>
      <BusQueue passengers={queue} addPassengerToQueue={addPassengerToQueue} />
    </div>
  );
}

export default App;
