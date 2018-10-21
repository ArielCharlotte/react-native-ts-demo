/// <reference path="../index.d.ts" />
// @flow
import { action, observable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';
import request from '../../utils/request'

//页面跳转
class Share {
  root: RootStore;
  constructor(rootStore: RootStore) {
    this.root = rootStore;
  }

  // 分享列表
  @persist('list') @observable shareList = [];
  @observable refreshingList = false;

  @action
  refreshList = async () => {
    console.log(this.root.base);
    this.refreshingList = true;
    const respData = await request('/api', {
      method: 'GET',
    })
    runInAction(() => {
      console.log(respData);
      this.refreshingList = false;
    })
  }

  @action
  loadMore = async (username: string, password: string) => {
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
    })
  }

  @action
  logout = async () => {
    runInAction(() => {
    });
  }

}

export default Share;