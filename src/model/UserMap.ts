import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ZoomSlider from 'ol/control/ZoomSlider';
import { default as OpenLayerMap } from  'ol/Map';

class UserMap {
    viewOptions = {
      center: [0, 0],
      zoom: 2
    };

    layers = [{
      source: new OSM()
    }];

    self?: OpenLayerMap;

    constructor(options: {}) {
        
    }

  private createLayers() {
    return  this.layers.map((layer) => new TileLayer(layer));
  }

  private createView() {
    return new View(this.viewOptions);
  };

  createZoomSlider() {
    this.self?.addControl(new ZoomSlider());
    return this;
  };

  createMap() {
    this.self = new OpenLayerMap({
      target: 'map',
      layers: this.createLayers(),
      view: this.createView()
    }); 

    return this;
  };

};

export default UserMap;
