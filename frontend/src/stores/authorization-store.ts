/**
 * This store just only for test now to try Mobx
 */

import { observable, action, computed } from 'mobx';

export interface IAuthStore {
  authorizationStatus: boolean;
  authorizeUser: () => void;
  logoutUser: () => void;
}

export class AuthorizationStore implements IAuthStore {
  @observable private _isAuthorized: boolean = false;

  @action
  authorizeUser = () => {
    this._isAuthorized = true;
  }

  @action
  logoutUser = () => {
    this._isAuthorized = false;
  }

  @computed
  get authorizationStatus() {
    return this._isAuthorized;
  }

}