// @flow
import { observable, action, runInAction, computed, autorun } from 'mobx';
import { NavigationActions } from 'react-navigation'

import { Toast } from 'antd-mobile-rn'
import { create, persist } from 'mobx-persist'

class User {
  root: RootStore;
  constructor(rootStore: RootStore) {
    this.root = rootStore;
  }

  @observable personalInfo = {}; // 保存用户名字， 头像， 职位

  @action
  // 获取用户个人信息
  fetchPersonalInfo = async () => {

    // const data = await personalInfoApi({
    //   user_id: staff_no,
    //   session_id,
    //   company_code,
    //   empn_no,
    //   enable_ta,
    //   staff_no
    // });

    // runInAction(() => {
    //   this.personalInfo = data.resultdata;
    // })
  }
}

export default User;