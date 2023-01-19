import { FC, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import MapStoreInstance from '../store';
import useOpenLayerPopover from '../hooks/useOpenLayerPopover';

const PopoverView: FC = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  const [ visibility, setVisibility] = useState<'flex' | 'hidden'>('flex') 
  const { setPopover, getPopover, mapRef } = MapStoreInstance;

  const hdms = useOpenLayerPopover({
    parent,
    callback: (popover) => {
      setPopover(popover);
      mapRef?.__proto__ &&
        getPopover()
          ?.createPopover(mapRef?.__proto__);
      setVisibility('flex');
    },
    dependency: [mapRef?.__proto__, getPopover()?.hdms]
  });

  const handleClose: React.MouseEventHandler<HTMLButtonElement>  = (event) => {
    event.preventDefault();
    setVisibility('hidden');
  };

  return (
    <div id="popover" className={`${visibility} flex-col-reverse items-end bg-zinc-50 w-max p-2 shadow-md `}ref={parent}>
      <div>
        <p>The location you clicked was: </p>
        {hdms && <p>{hdms}</p>}
      </div>
      <button
        type="button"
        className="text-white bg-red-900 w-8 h-8"
        onClick={handleClose}
      >
        x
      </button>
    </div>
  );
};

export default observer(PopoverView);
