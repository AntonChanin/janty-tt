import { FC, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import MapStoreInstance from '../store';
import useOpenLayerPopover from '../hooks/useOpenLayerPopover';

const PopoverView: FC = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  const { setPopover, getPopover, mapRef } = MapStoreInstance;

  const hdms = useOpenLayerPopover({
    parent,
    callback: (popover) => {
      setPopover(popover);
      mapRef?.__proto__ &&
        getPopover()
          ?.createPopover(mapRef?.__proto__);
    },
    dependency: [mapRef?.__proto__, getPopover()?.hdms]
  });

  return (
    <div id="popover" className="flex bg-zinc-50 w-max p-2 shadow-md" ref={parent}>
      {hdms && <p>The location you clicked was: {hdms}</p>}
      <button
        type="button"
        className="text-white bg-red-900 w-8 h-8"
        aria-label="Close"
      >
        x
      </button>
    </div>
  );
};

export default observer(PopoverView);
