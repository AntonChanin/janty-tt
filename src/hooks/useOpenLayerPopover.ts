import Overlay from 'ol/Overlay';
import { Popover } from 'bootstrap';
import { useEffect } from 'react';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';

import MapStoreInstance from '../store';
import UserPopover from '../model/UserPopover';

type Props = {
  parent: React.MutableRefObject<HTMLDivElement | null>;
}

const useOpenLayerPopover = (props: Props) => {
    const { parent } = props;
    const { self } = MapStoreInstance;
    
    useEffect(() => {
      self?.__proto__ &&
        new UserPopover({ popupSocket: parent.current })
          .createPopover(self.__proto__);
    }, [self?.__proto__]);

    return;
};

export default useOpenLayerPopover;
