import { useEffect } from 'react';

import UserMap from '../model/UserMap';

type Props = {
  parent: React.MutableRefObject<HTMLDivElement | null>;
  callback?(value: UserMap): void;
  dependency?: any[];
};

const useOpenLayerMap = (props: Props) => {
  const { parent, callback, dependency = [] } = props;

  useEffect(() => {
    console.log(dependency);
    if (parent && !parent?.current?.childElementCount) {
      const map = new UserMap({}).createMap().createZoomSlider();
      callback?.(map);
    };
  }, [...dependency]);
}

export default useOpenLayerMap;