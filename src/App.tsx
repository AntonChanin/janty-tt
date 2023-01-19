import { useEffect } from 'react';

import MapView from './components/MapView';
import PopoverView from './components/PopoverView';
import MapRouteView from './components/MapRouteView';
import './App.css';

function App() {

  return (
    <div className="App font-sans w-full h-full flex">
      <MapView />
      <PopoverView />
      <MapRouteView />
    </div>
  )
};

export default App;
