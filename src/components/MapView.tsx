import { FC, useRef } from 'react';

import useOpenLayerMap from '../hooks/useOpenLayerMap';

const MapView: FC = () => {
  const socket =  useRef<HTMLDivElement | null>(null)
  useOpenLayerMap({ socket: socket?.current });

  return <div id="map" ref={socket}></div>
};

export default MapView;
