/// <reference path="./index.d.ts" />
import { action, observable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import request from '../utils/request';

//页面跳转
class Base {
  root: RootStore;
  constructor(rootStore: RootStore) {
    this.root = rootStore;
  }

  // 持久化登录用户名
  @persist('object') @observable username = '';
  @persist('object') @observable sessionid = '666';
  @observable statusBarStyle = 'light-content';

  @action
  changeStatusBarStyle = (style: string) => {
    this.statusBarStyle = style;
  }

  @action
  login = async (username: string, password: string) => {
    // const respData = await request('/api', {
    //   method: 'POST',
    //   body: {
    //     username,
    //     password,
    //   },
    // })
    // const data = await loginApi(username, password, 'CN', registrationId);
    runInAction(() => {
      //数据请求完成进行页面跳
      // if (respData.result == "ok") {
        this.username = 'Xiang.T';
      // }
    })
    return true;
  }

  @action
  logout = async () => {
    runInAction(() => {
      this.username = '';
    });
  }

}

export default Base;
