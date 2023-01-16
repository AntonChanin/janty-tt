import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import ZoomSlider from 'ol/control/ZoomSlider';
import { default as OpenLayerMap } from  'ol/Map';

import { OpenLayerMapLayers, OpenLayerMapOptions, OpenLayerMapViewOptions } from '../types/userMap';

class UserMap {
    viewOptions: OpenLayerMapViewOptions;

    layers: OpenLayerMapLayers;

    self?: OpenLayerMap;

    readonly presset: OpenLayerMapOptions = {
      viewOptions: {
        center: [0, 0],
        zoom: 2
      },
      layers: [{
        source: new OSM()
      }]
    }

    constructor(options: Partial<OpenLayerMapOptions>) {
      const { viewOptions, layers } = options;
      const { viewOptions: viewOptionsDefault, layers: layersDefault } = this.presset;

      this.viewOptions = viewOptions ?? viewOptionsDefault;
      this.layers = layers ?? layersDefault;
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
