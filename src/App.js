import React from 'react';
import Switchboard from './Components/Routes/Switchboard';
import { defaultRoutes } from './Components/Routes/Switchboard';
import { StoreProvider } from './Components/Providers/StoreProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Switchboard routes={defaultRoutes} />
      </StoreProvider>
    </div>
  );
}

export default App;
