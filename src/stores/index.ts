import { create } from 'mobx-persist';
import { AsyncStorage } from 'react-native';

import Base from './base';
import Share from './Home/share'
import User from './Me/user';

class RootStore {
  base: Base;
  share: Share;
  user: User;
  constructor() {
    this.base = new Base(this);
    this.share = new Share(this);
    this.user = new User(this);
  }
}

const stores = new RootStore();

// you can hydrate stores here with mobx-persist
const hydrate = create({ storage: AsyncStorage });
hydrate('base', stores.base);

export default stores;
