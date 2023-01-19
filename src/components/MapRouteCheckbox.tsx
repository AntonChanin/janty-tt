import { observer } from 'mobx-react-lite';
import { FC } from 'react';

type Props = {
  id: number;
  routeName: string;
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MapRouteCheckbox: FC<Props> = ({ id, name, routeName, onClick: handleClick }) => {
  
  return (
    <div>
      <button
        className={`h-4 w-4 ${name ? 'bg-green-400' : 'bg-red-400'} mr-2`}
        type="button"
        name={name}
        value={id}
        onClick={handleClick}
      />
      {routeName}
    </div>
  );
};

export default observer(MapRouteCheckbox);
