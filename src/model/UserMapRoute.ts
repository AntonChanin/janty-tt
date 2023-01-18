import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Vector from 'ol/source/Vector';
import { Polyline } from 'ol/format';
import {Fill, Icon, Stroke, Style } from 'ol/style';
import { default as OpenLayerMap } from  'ol/Map';
import CircleStyle from 'ol/style/Circle';
import VectorSource from 'ol/source/Vector';
import { StyleFunction } from 'ol/style/Style';

import { UserMapRouteProps } from '../types/userMapRoute';
import LineString from 'ol/geom/LineString';
import Geometry from 'ol/geom/Geometry';

class UserMapRoute {

  styles = {
    'route': new Style({
      stroke: new Stroke({
        width: 2,
        color:  [237, 212, 0, 0.8],
      }),
    }),
    'icon': new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'data/icon.png',
      }),
    }),
    'geoMarker': new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({color: 'black'}),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
      }),
    }),
  };
  
  source = new Vector({
    format: new Polyline(),
    url: '',
  });

  vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [],
    }),
  })
  
  coord: number[][] = [];

  polyline = new Polyline({
    factor: 1e6
  });

  route = new Geometry();

  private __routeFeature = new Feature({
    type: 'route',
  });

  private __startMarker = new Feature({
    type: 'icon',
  });

  private __endMarker = new Feature({
    type: 'icon',
  });

  constructor(options: Partial<UserMapRouteProps>) {
    const { url = '', color = '#000', width = 2 } = options;
    this.source.setUrl(url);
    this.styles.route.getStroke().setColor(color);
    this.styles.route.getStroke().setWidth(width);
  }

  getLineStringFromCoord(coord: number[][]): string {
    return this.polyline.writeGeometry(new LineString(coord))
  }

  getCoordFromResult(result: any[]) {
    this.coord = result.map((point: any) => ([point.lon, point.lat]));
  }

  makeRoute() {
    this.route = new Polyline({
      factor: 1e6,
    }).readGeometry(this.getLineStringFromCoord(this.coord), {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
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

  createMapRoute(userMap: OpenLayerMap) {
    
    fetch(this.source.getUrl() as string).then((response) => {
      response.json().then((result) => {
        this.getCoordFromResult(result);
        this.makeRoute();
        this.makeGeometry();
        this.initVectorLayer();
        userMap.addLayer(this.vectorLayer);
        
        return this;
      })
    });
  }

}

export default UserMapRoute;
