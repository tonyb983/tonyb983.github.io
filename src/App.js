import React from 'react';
import Switchboard from './Components/Routes/Switchboard';
import { defaultRoutes } from './Components/Routes/Switchboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switchboard routes={defaultRoutes} />
    </div>
  );
}

export default App;
