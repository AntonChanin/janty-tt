import { useEffect } from 'react';
import { Popover } from 'bootstrap';
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj';
import UserMap from '../model/UserMap';
import { toStringHDMS } from 'ol/coordinate';

type Props = {
  socket: React.MutableRefObject<HTMLDivElement | null>;
};
const useOpenLayerMap = (props: Props) => {
  const { socket } = props;

  useEffect(() => {
    if (socket && !socket?.current?.childElementCount) {
      const map = new UserMap({}).createMap().createZoomSlider();
      const popupSocket = document.getElementById('popup');
      if (popupSocket) {
        // Popup showing the position the user clicked
        const popup = new Overlay({
          element: popupSocket,
        });
        map.self?.addOverlay(popup);

        const element = popup.getElement();
        if (element) {
          map.self?.on('click', function (evt) {
            const coordinate = evt.coordinate;
            const hdms = toStringHDMS(toLonLat(coordinate));
            popup.setPosition(coordinate);
            let popover = Popover.getInstance(element);
            if (popover) {
              popover.dispose();
            }
            popover = new Popover(element, {
              animation: false,
              container: element,
              content: '<p>The location you clicked was:</p><code>' + hdms + '</code>',
              html: true,
              placement: 'top',
              title: 'Welcome to OpenLayers',
              customClass: 'bg-zinc-50 w-max p-2 shadow-md',
            });
            popover.show();
          });
        }
      }
    };
  }, [])
}

export default useOpenLayerMap;