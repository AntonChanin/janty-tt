import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { useEffect, useRef } from 'react';

import './App.css'
import './style.css';

function App() {
const socket =  useRef<HTMLDivElement | null>(null)

useEffect(() => {
  if (!socket.current?.childElementCount) {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });  
    map.render();
  }
}, [])



  return (
    <div className="App">
      <div id="map" ref={socket}></div>
    </div>
  )
};

export default App;
