import Overlay from 'ol/Overlay';
import { Popover } from 'bootstrap';
import { useEffect } from 'react';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';

import MapStoreInstance from '../store';

type Props = {
  parent: React.MutableRefObject<HTMLDivElement | null>;
}

const useOpenLayerPopover = (props: Props) => {
    const { parent } = props;
    const { self } = MapStoreInstance;
    
    useEffect(() => {
      const popupSocket = document.getElementById('popup') ?? parent.current;
      if (popupSocket && self) {  
        const popup = new Overlay({
          element: popupSocket,
        });
        
        self.__proto__?.addOverlay(popup);
        const element = popup.getElement();
        if (element) {
          self.__proto__?.on('click', (evt) => {
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
    }, [self?.__proto__]);

    return;
};

export default useOpenLayerPopover;
