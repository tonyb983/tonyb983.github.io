import React from 'react';
import Switchboard from './Components/Routes/Switchboard';
import { defaultRoutes } from './Components/Routes/defaultRoutes';
import GlobalProviders from './Components/Providers/GlobalProviders';
import PatchListener from './Utils/PatchListener';

function App() {
  return (
    <div className="App">
      <GlobalProviders>
        <PatchListener />
        <Switchboard routes={defaultRoutes} />
      </GlobalProviders>
    </div>
  );
}

export default App;
