import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import {Fill, Style} from 'ol/style';
import { Vector as VectorLayer} from 'ol/layer';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import { fromLonLat } from 'ol/proj';
import { default as OpenLayerMap } from  'ol/Map';

import { UserMapPointProps } from '../types/userMapPoint';

class UserMapPoint {
  readonly __default: UserMapPointProps = {
    coord: [0, 0],
    color:  '#000000',
    radius: 3,
  }
  
  private __geometry?: Point;
  private __feature?: Feature;
  private __source?: VectorSource;
  private __layer?: VectorLayer<VectorSource>;
  private __style?: Style;

  coord = this.__default.coord;
  color: Color | ColorLike | string = this.__default.color;
  radius = this.__default.radius;

  constructor(options: Partial<UserMapPointProps>) {
    const {
      color: __color,
      coord: __coord,
      radius: __radius,
    } = this.__default;
    const {
      color,
      coord,
      radius,
    } = options;  
    this.coord = coord ?? __coord;
    this.color = color ?? __color;
    this.radius = radius ?? __radius;
  };

  private __makeStyle() {
    this.__style = new Style({
      image: new CircleStyle({
        radius: this.radius,
        fill: new Fill({ color: this.color }),
      }),
    });
  }

  private __mountStyle() {
    this.__layer?.setStyle(this.__style)
  }

  private __makeGeometry() {
    this.__geometry = new Point(fromLonLat(this.coord));
  };

  private __makeFeature() {
    this.__feature = new Feature({
      geometry: this.__geometry,
    });
  };

  private __makeSource() {
    if (this.__feature) {
      this.__source = new VectorSource({
        features: [this.__feature],
      });
    }
  }

  private __makeLayer() {
    if (this.__source) {
      this.__layer = new VectorLayer({
        source: this.__source,
      });
    }
  }

  private __mountLayer(userMap: OpenLayerMap) {
    if (this.__layer) {
      userMap.addLayer(this.__layer);
    }
  }

  createMapPoint(userMap: OpenLayerMap) {
    this.__makeStyle();
    this.__makeGeometry();
    this.__makeFeature();
    this.__makeSource();
    this.__makeLayer();
    this.__mountStyle();
    this.__mountLayer(userMap);
    this.bindMouseCursorOnMarker(userMap);
    return this;
  }

  bindMouseCursorOnMarker(userMap: OpenLayerMap) {
    // change mouse cursor when over marker
    userMap.on('pointermove', function (e) {
      const pixel = userMap.getEventPixel(e.originalEvent);
      const hit = userMap.hasFeatureAtPixel(pixel);
      const target =  userMap.getTarget();
      (target as HTMLElement).style.cursor = hit ? 'pointer' : '';
    });
    return this; 
  }
}

export default UserMapPoint;
