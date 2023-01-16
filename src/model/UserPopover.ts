import { Popover } from 'bootstrap';
import { toStringHDMS } from 'ol/coordinate';
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj';
import { default as OpenLayerMap } from  'ol/Map';

import { OpenLayerPopoverOptions } from '../types/userPopover';

class UserPopover {
  popover:  Popover | null = null;

  popupSocket: HTMLElement | null = document.getElementById('popup');

  constructor(options: OpenLayerPopoverOptions) {
      const { popupSocket } = options;
      this.popupSocket = popupSocket;
  }

  makePopover(element: HTMLElement, hdms: string) {
    this.popover = Popover.getInstance(element);
    if (this.popover) {
      this.popover.dispose();
    }
    this.popover = new Popover(element, {
      animation: false,
      container: element,
      content: '<p>The location you clicked was:</p><code>' + hdms + '</code>',
      html: true,
      placement: 'top',
      title: 'Welcome to OpenLayers',
      customClass: 'bg-zinc-50 w-max p-2 shadow-md',
    });
    this.popover.show();
  }
  
  addPopoverListener(userMap: OpenLayerMap, popup: Overlay, element: HTMLElement) {
    userMap.on('click', (evt) => {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      popup.setPosition(coordinate);
      this.makePopover(element, hdms)
    });
  }

  createPopover(userMap: OpenLayerMap) {
    if (this.popupSocket && self) {  
      const popup = new Overlay({
        element: this.popupSocket,
      });
        
      userMap.addOverlay(popup);
      const element = popup.getElement();
      if (element) {
        this.addPopoverListener(userMap, popup, element);
      }
    }
  } 
};

export default UserPopover;
