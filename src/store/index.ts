import { action, makeObservable, observable } from 'mobx';

import UserMap from '../model/UserMap';
import UserMapRoute from '../model/UserMapRoute';
import UserPopover from '../model/UserPopover';

class UserMapStore {
  mapRef?: UserMap;

  private popoverRef?: UserPopover;

  private routeRef?: UserMapRoute;

  constructor() {
    makeObservable(this, {
      mapRef: observable,
      getPopover: action.bound,
      setPopover: action.bound,
      getRoute: action.bound,
      setRoute: action.bound,
    });
  };

  getPopover() {
    return this.popoverRef;
  }

  setPopover(popover: UserPopover) {
    this.popoverRef = popover;
  }
  
  setRoute(route: UserMapRoute) {
    this.routeRef = route;
  }

  getRoute() {
    return this.routeRef;
  }

}

const UserMapStoreInstance = new UserMapStore();

export default UserMapStoreInstance;
