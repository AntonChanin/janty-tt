import { useEffect, useState } from 'react';

type Props = {
  parent: React.MutableRefObject<HTMLDivElement | null>;
  callback?(props: Record<string, string | number>): void;
  dependency?: any[];
};

const useOpenLayerRoute = (props: Props) => {
  const { parent, callback, dependency = [] } = props;

  const [currentId, setCurrentId] = useState(1)
 
  useEffect(() => {
    if (parent) {
      const activeRoute = dependency[dependency.length - 1];
      setCurrentId(activeRoute ?  +activeRoute : 1);
      callback?.({ currentId });
    };
  }, [...dependency, currentId]);
}

export default useOpenLayerRoute;