import { Popover } from 'bootstrap';
import { toStringHDMS } from 'ol/coordinate';
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj';
import { default as OpenLayerMap } from  'ol/Map';

import { OpenLayerPopoverOptions } from '../types/userPopover';

class UserPopover {
  hdms = '';

  root: HTMLElement | null = document.getElementById('popup');

  callback: Record<string, (props: any) => void> = {};

  constructor(options: Partial<OpenLayerPopoverOptions>) {
    const { root } = options;
    if (root) {
      this.root = root;
    };
  }

  
  addPopoverListener(userMap: OpenLayerMap, popup: Overlay) {
    userMap.on('click', (evt) => {
      const coordinate = evt.coordinate;
      this.hdms = toStringHDMS(toLonLat(coordinate));
      popup.setPosition(coordinate);
      this.callback['click']({ coordinate, hdms: this.hdms })
    });
  }

  createPopover(userMap: OpenLayerMap) {
    if (this.root) {  
      const popup = new Overlay({
        element: this.root,
      });
      userMap.addOverlay(popup);
      this.addPopoverListener(userMap, popup);
    }
    return this;
  } 
};

export default UserPopover;
