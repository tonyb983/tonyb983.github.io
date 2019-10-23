import React from 'react';
import Switchboard from './Components/Routes/Switchboard';
import { defaultRoutes } from './Components/Routes/Switchboard';
import GlobalProviders from './Components/Providers/GlobalProviders';

function App() {
  return (
    <div className="App">
      <GlobalProviders>
        <Switchboard routes={defaultRoutes} />
      </GlobalProviders>
    </div>
  );
}

export default App;
