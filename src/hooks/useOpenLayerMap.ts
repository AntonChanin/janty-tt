import { useEffect } from 'react';
import UserMap from '../model/UserMap';

type Props = {
  socket: HTMLDivElement | null;
};
const useOpenLayerMap = (props: Props) => {
  const { socket } = props;

  useEffect(() => {
    if (!socket?.childElementCount) {
     new UserMap({}).createMap().createZoomSlider();
    }
  }, [])
}

export default useOpenLayerMap;