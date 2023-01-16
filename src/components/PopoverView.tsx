import { FC, useRef } from 'react';

import useOpenLayerPopover from '../hooks/useOpenLayerPopover';
import { observer } from 'mobx-react-lite';

const PopoverView: FC = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  useOpenLayerPopover({ parent });

  return <div id="popover" ref={parent}></div>;
};

export default observer(PopoverView);
