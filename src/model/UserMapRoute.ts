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


import { UserMapRouteProps } from '../types/userMapRoute';
import UserMap from './UserMap';


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

  styles = {
    'route': this.routeStyleDefault,
    'icon': this.iconStyleDefault,
    'geoMarker': this.geoMarkerStyleDefault,
  };
  source = new Vector({
    format: new Polyline(),
    url: '',
  });
  vectorLayer = new VectorLayer({ source: this.sourceDefault })
  coord: number[][] = [];
  polyline = new Polyline({ factor: 1e6 });
  route = new Geometry();

  private __routeFeature = new Feature({ type: 'route' });
  private __startMarker = new Feature({ type: 'icon' });
  private __endMarker = new Feature({ type: 'icon' });

  constructor(options: Partial<UserMapRouteProps>) {
    const { url = '', color = '#000', width = 2 } = options;
    this.source.setUrl(url);
    this.styles.route.getStroke().setColor(color);
    this.styles.route.getStroke().setWidth(width);
  }

  removeLayer(userMap: OpenLayerMap) {
    userMap.removeLayer(this.vectorLayer);
  }

  getLineStringFromCoord(coord: number[][]): string {
    return this.polyline.writeGeometry(new LineString(coord))
  }

  getCoordFromData(data: any[]) {
    this.coord = data.map((point: any) => ([point.lon, point.lat]));
  }

  makeRoute() {
    this.route = new Polyline({
      factor: 1e6,
    })
      .readGeometry(
        this.getLineStringFromCoord(this.coord),
        {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        }
      );
  }

  makeGeometry() {
    this.__routeFeature.setGeometry(this.route);
    this.__startMarker.setGeometry(new Point((this.route as any).getFirstCoordinate()));
    this.__endMarker.setGeometry(new Point((this.route as any).getLastCoordinate()));
  }

  initVectorLayer() {
    this.vectorLayer
      .getSource()
      ?.addFeatures([this.__routeFeature, this.__startMarker, this.__endMarker]);
    this.vectorLayer
      .setStyle((feature) => (
        this.styles[feature.get('type') as 'route' | 'icon' | 'geoMarker']
      ));
    this.vectorLayer
      .getSource()
      ?.getFeatures()
      .forEach((feature, index) => (
        feature.setStyle((this.vectorLayer.getStyle() as StyleFunction)(feature, index) ?? undefined))
      );
  }

  featchMapRoute(userMap: UserMap) {
    fetch(this.source.getUrl() as string).then((response) => {
      response.json().then((data) => {
        this.createMapRoute(userMap, data)
      })
    });
    return this;
  }

  createMapRoute(userMap: UserMap, data: any) {
    this.getCoordFromData(data);
    this.makeRoute();
    this.makeGeometry();
    this.initVectorLayer();
    userMap.clear();
    userMap.__proto__?.addLayer(this.vectorLayer);
    
    return this;
  }

}

export default UserMapRoute;
