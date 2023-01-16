import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ZoomSlider from 'ol/control/ZoomSlider';
import { default as OpenLayerMap } from  'ol/Map';

import { OpenLayerMapLayers, OpenLayerMapOptions, OpenLayerMapViewOptions } from '../types/userMap';

class UserMap {
  readonly presset: OpenLayerMapOptions = {
    viewOptions: {
      center: [0, 0],
      zoom: 2
    },
    layers: [{
      source: new OSM()
    }],
  }

  viewOptions: OpenLayerMapViewOptions;

  layers: OpenLayerMapLayers;

  private self?: OpenLayerMap;

  constructor(options: Partial<OpenLayerMapOptions>) {
    const { viewOptions, layers } = options;
    const { viewOptions: viewOptionsDefault, layers: layersDefault } = this.presset;

    this.viewOptions = viewOptions ?? viewOptionsDefault;
    this.layers = layers ?? layersDefault;
  }

  private createLayers() {
    return  this.layers.map((layer) => new TileLayer(layer));
  };

  private createView() {
    return new View(this.viewOptions);
  };

  get __proto__() {
    return this.self;
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
