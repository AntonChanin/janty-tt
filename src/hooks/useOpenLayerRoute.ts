import { useEffect } from 'react';

type Props = {
  parent: React.MutableRefObject<HTMLDivElement | null>;
  callback?(): void;
  dependency?: any[];
};

const useOpenLayerRoute = (props: Props) => {
  const { parent, callback, dependency = [] } = props;
 
  useEffect(() => {
    if (parent) {
      callback?.();
    };
  }, [...dependency]);
}

export default useOpenLayerRoute;
