import { useEffect } from 'react';

import UserMap from '../model/UserMap';

type Props = {
  parent: React.MutableRefObject<HTMLDivElement | null>;
  callback?: (value: UserMap) => void;
};

const useOpenLayerMap = (props: Props) => {
  const { parent, callback } = props;

  useEffect(() => {
    if (parent && !parent?.current?.childElementCount) {
      const map = new UserMap({}).createMap().createZoomSlider();
      callback?.(map);
    };
  }, [])
}

export default useOpenLayerMap;