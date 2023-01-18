import MapView from './components/MapView';
import PopoverView from './components/PopoverView';
import './App.css';
import MapRouteView from './components/MapRouteView';

function App() {

  return (
    <div className="App font-sans">
      <MapView />
      <PopoverView />
      <MapRouteView />
    </div>
  )
};

export default App;
