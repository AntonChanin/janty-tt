import { FC, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import MapStoreInstance from '../store';
import UserMapRoute from '../model/UserMapRoute';
import UserCheckbox from '../model/UserCheckbox';
import UserCheckboxView from './UserCheckboxView';
import useAxios from '../hooks/useAxios';
import useOpenLayerRoute from '../hooks/useOpenLayerRoute';


const MapRouteView: FC = () => {
  const parent = useRef<HTMLDivElement | null>(null);
  const [activity, setActivity] = useState<number>(0);
  const { response, loading } = useAxios('GetRoutes');
  const { mapRef, getRoute, setRoute } = MapStoreInstance;

  useOpenLayerRoute({
    parent,
    callback: () => {
      if (getRoute() && mapRef?.__proto__) {
        getRoute()?.removeLayer(mapRef?.__proto__);
      }
      if (
        response.length &&
        response[activity] &&
        mapRef?.__proto__
      ) {
        setRoute(
          new UserMapRoute({
            url: `https://janti.ru:5381/Main/GetRouteData?id=${+response[activity].id}`,
            color: `${response[activity].color}` ?? '#000',
          })
        );
        getRoute()?.featchMapRoute(mapRef);
      }
        
    },
    dependency: [MapStoreInstance.mapRef?.__proto__, loading, activity]
  });

  return (
    <div
      id="mapRoute"
      className="flex flex-col w-1/4 max-w-[300px] items-start pl-2 pt-1"
      ref={parent}
    >
      {!loading && response.map(
        ({ id, name }) => {
          const model = new UserCheckbox({ key: `${id}`, id: +id - 1 }).addCallback({ 'onClick': ({ id }) => setActivity(id),  });
          return (
          <UserCheckboxView
            key={model.key}
            active={activity}
            model={model}
            children={`${name}`}
          />
        )
      }
      )}
    </div>
  );
};

export default observer(MapRouteView);
