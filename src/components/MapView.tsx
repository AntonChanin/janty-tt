import { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import MapStoreInstance from '../store';
import useOpenLayerMap from '../hooks/useOpenLayerMap';

const MapView: FC = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  useOpenLayerMap({ parent, callback: (map) => MapStoreInstance.self = map });

  return <div id="map" ref={parent}></div>
};

export default observer(MapView);
