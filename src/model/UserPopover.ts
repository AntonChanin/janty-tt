import { toStringHDMS } from 'ol/coordinate';
import Overlay from 'ol/Overlay';
import { toLonLat } from 'ol/proj';
import { default as OpenLayerMap } from  'ol/Map';

import { OpenLayerPopoverOptions } from '../types/userPopover';

class UserPopover {
  self: Overlay = new Overlay({});

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
    if (this.root && !this.self.getElement()) {  
      this.self.setElement(this.root);
      userMap.addOverlay(this.self);
    }
    this.addPopoverListener(userMap, this.self);
    return this;
  } 
};

export default UserPopover;
