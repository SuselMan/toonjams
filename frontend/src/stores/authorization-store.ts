/**
 * This store just only for test now to try Mobx
 */

import { observable, action, computed } from 'mobx';
import AuthorizationAPI, { IAuthorization } from 'core/authorization-api';

export interface IAuthorizationStore {
  authorizationStatus: boolean;
  authorizeUser: (login: string, password: string) => Promise<any>;
  createUser: (login: string, password: string) => Promise<any>;
  logoutUser: () => Promise<any>;
}

class AuthorizationStore implements IAuthorizationStore {
  @observable private _isAuthorized: boolean = false;
  private _authorizationApi: IAuthorization;

  constructor(authorizationApi: IAuthorization) {
    this._authorizationApi = authorizationApi;
    this._authorizationApi.getAuthorizationStatus().then((authorizationStatus: boolean) => this._setAuthorizationStatus(authorizationStatus))
  }

  @action.bound
  authorizeUser(login: string, password: string) {
    return this._authorizationApi.authorizeUser(login, password).then(() => this._isAuthorized = true);
  }

  @action.bound
  createUser(login: string, password: string) {
    return this._authorizationApi.createUser(login, password);
  }

  @action.bound
  logoutUser() {
    return this._authorizationApi.logoutUser().then(() => this._setAuthorizationStatus(false));
  }

  @computed
  get authorizationStatus() {
    return this._isAuthorized;
  }

  private _setAuthorizationStatus(authorizationStatus: boolean) {
    this._isAuthorized = authorizationStatus;
  }

}

const _authorizationStore = new AuthorizationStore(AuthorizationAPI);
export default _authorizationStore;