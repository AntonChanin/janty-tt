import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import MapCheckbox from '../model/UserCheckbox';

type Props = {
  active: number;
  model: MapCheckbox;
}

const MapRouteCheckbox: FC<PropsWithChildren<Props>> = ({ model, active, children }) => {
  const { activity, id, updateActivity, onClick } = model;
  updateActivity(active);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClick();
  }

  return (
    <div>
      <button
        className={`h-4 w-4 ${activity ? 'bg-green-400' : 'bg-red-400'} mr-2`}
        type="button"
        name={activity}
        value={id}
        onClick={handleClick}
      />
      {children}
    </div>
  );
};

export default observer(MapRouteCheckbox);
