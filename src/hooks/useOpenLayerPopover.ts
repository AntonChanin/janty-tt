import { useEffect, useState } from 'react';
import UserPopover from '../model/UserPopover';


type Props = {
  parent: React.MutableRefObject<HTMLDivElement | null>;
  callback?(value: UserPopover): void;
  dependency?: any[];
}

const useOpenLayerPopover = (props: Props) => {
    const { parent, callback, dependency = [] } = props;
    const [HDMS, setHDMS] = useState('');
    const [popover, setPopover] = useState<UserPopover | null>(null);
 
    useEffect(() => {
      if (parent.current) {
        setPopover(new UserPopover({ root: parent.current }))
      }
    }, [])

    useEffect(() => {
      if (popover) {
        popover.callback = {
          ...popover.callback,
          'click': (props) => {
            const { hdms } = props;
            setHDMS(hdms);
          },
        }
        callback?.(popover);
      };
      
    }, [...dependency]);

    return HDMS;
};

export default useOpenLayerPopover;
