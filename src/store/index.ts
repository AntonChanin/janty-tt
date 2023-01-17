import { action, makeObservable, observable } from 'mobx';

import UserMap from '../model/UserMap';
import UserPopover from '../model/UserPopover';

class UserMapStore {
  mapRef?: UserMap;

  private popoverRef?: UserPopover;

  constructor() {
    makeObservable(this, {
      mapRef: observable,
      getPopover: action.bound,
      setPopover: action.bound,
    });
  };

  getPopover() {
    return this.popoverRef;
  }

  setPopover(popover: UserPopover) {
    this.popoverRef = popover;
  }

}

const UserMapStoreInstance = new UserMapStore();

export default UserMapStoreInstance;
