import { action, makeObservable, observable } from 'mobx';

import UserMap from '../model/UserMap';

class UserMapStore {
  self?: UserMap;

  constructor() {
    makeObservable(this, {
      self: observable,
    });
  };

}

const UserMapStoreInstance = new UserMapStore();

export default UserMapStoreInstance;
