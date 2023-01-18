import { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import MapStoreInstance from '../store';
import UserMapRoute from '../model/UserMapRoute';



const MapRouteView: FC = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  MapStoreInstance.mapRef?.__proto__ && new UserMapRoute({ url: 'https://janti.ru:5381/Main/GetRouteData?id=3', color: '#CD5C5C' }).createMapRoute(MapStoreInstance.mapRef.__proto__);
  
  return <div id="mapRoute" ref={parent}></div>;
};

export default observer(MapRouteView);
