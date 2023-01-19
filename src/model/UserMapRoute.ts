import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import { Polyline } from 'ol/format';
import {Fill, Icon, Stroke, Style } from 'ol/style';
import { StyleFunction } from 'ol/style/Style';
import { default as OpenLayerMap } from  'ol/Map';

import UserMap from './UserMap';
import { UserMapRouteProps } from '../types/userMapRoute';
import UserMapPoint from './UserMapPoint';

class UserMapRoute {

  readonly routeStyleDefault = new Style({
    stroke: new Stroke({
      width: 2,
      color:  [237, 212, 0, 0.8],
    }),
  });
  readonly iconStyleDefault = new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'data/icon.png',
    }),
  });
  readonly geoMarkerStyleDefault = new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({color: 'black'}),
      stroke: new Stroke({
        color: 'white',
        width: 2,
      }),
    }),
  });
  readonly sourceDefault = new Vector({ features: [] });
  
  private __source = new Vector({
    format: new Polyline(),
    url: '',
  });
  private __layer = new VectorLayer({ source: this.sourceDefault })
  private __polyline = new Polyline({ factor: 1e6 });
  private __route = new Geometry();
  private __routeFeature = new Feature({ type: 'route' });
  private __startMarker = new Feature({ type: 'icon' });
  private __endMarker = new Feature({ type: 'icon' });

  styles = {
    'route': this.routeStyleDefault,
    'icon': this.iconStyleDefault,
    'geoMarker': this.geoMarkerStyleDefault,
  };
  coord: number[][] = [];
  
  constructor(options: Partial<UserMapRouteProps>) {
    const { url = '', color = '#000', width = 2 } = options;
    this.__source.setUrl(url);
    this.styles.route.getStroke().setColor(color);
    this.styles.route.getStroke().setWidth(width);
  }

  removeLayer(userMap: OpenLayerMap) {
    userMap.removeLayer(this.__layer);
  }

  getCoordFromData(data: any[]) {
    this.coord = data.map((point: any) => ([point.lon, point.lat]));
  }
  
  private __writeGeometryFromCoord(coord: number[][]): string {
    return this.__polyline.writeGeometry(new LineString(coord))
  }

  private __makePointsFromCoord(coord: number[][], userMap: OpenLayerMap) {
    coord.map((point) => {
      new UserMapPoint({ coord: point, color: this.styles.route.getStroke().getColor() ?? '#000000' }).createMapPoint(userMap);
      return point
    })
  }

  private __makeRoute() {
    this.__route = new Polyline({
      factor: 1e6,
    })
      .readGeometry(
        this.__writeGeometryFromCoord(this.coord),
        {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        }
      );
  }

  private __makeGeometry() {
    this.__routeFeature.setGeometry(this.__route);
    this.__startMarker.setGeometry(new Point((this.__route as any).getFirstCoordinate()));
    this.__endMarker.setGeometry(new Point((this.__route as any).getLastCoordinate()));
  }

  private __makeLayer() {
    this.__layer
      .getSource()
      ?.addFeatures([this.__routeFeature, this.__startMarker, this.__endMarker]);
    this.__layer
      .setStyle((feature) => (
        this.styles[feature.get('type') as 'route' | 'icon' | 'geoMarker']
      ));
    this.__layer
      .getSource()
      ?.getFeatures()
      .forEach((feature, index) => (
        feature.setStyle((this.__layer.getStyle() as StyleFunction)(feature, index) ?? undefined))
      );
  }

  featchMapRoute(userMap: UserMap) {
    fetch(this.__source.getUrl() as string).then((response) => {
      response.json().then((data) => {
        this.createMapRoute(userMap, data)
      })
    });
    return this;
  }

  createMapRoute(userMap: UserMap, data: any) {
    this.getCoordFromData(data);
    this.__makeRoute();
    this.__makeGeometry();
    this.__makeLayer();
    userMap.clear();
    userMap.__proto__?.addLayer(this.__layer);
    userMap.__proto__ && this.coord.length && this.__makePointsFromCoord(this.coord, userMap.__proto__)
    return this;
  }

}

export default UserMapRoute;
