import Api, { REQUEST_TYPE, IApi } from './api';

enum AuthorizationAPIMethods {
  logout = "/api/user/logoutUser",
  createUser = "/api/user/createUser",
  authorizeUser = "/api/user/authorizeUser",
  authorizationStatus = "/api/user/getAuthorizedUser"
}

export interface IAuthorization {
  createUser(login: string, password: string): Promise<any>;
  authorizeUser(login: string, password: string): Promise<any>;
  logoutUser(): Promise<any>;
  getAuthorizationStatus(): Promise<boolean>
}

class AuthorizationAPI implements IAuthorization {
  private _api: IApi;

  constructor(api: IApi) {
    this._api = api;
  }

  createUser(login: string, password: string): Promise<any> {
    return this._api.call(AuthorizationAPIMethods.createUser, REQUEST_TYPE.POST, { login, password })
  }

  authorizeUser(login: string, password: string): Promise<any> {
    return this._api.call(AuthorizationAPIMethods.authorizeUser, REQUEST_TYPE.POST, { login, password })
  }


  logoutUser(): Promise<any> {
    return this._api.call(AuthorizationAPIMethods.logout, REQUEST_TYPE.POST)
  }

  getAuthorizationStatus(): Promise<boolean> {
    return this._api.call<boolean>(AuthorizationAPIMethods.authorizationStatus, REQUEST_TYPE.GET)
      .then((userData) => {
        console.log('authorizedUserData: ', userData);
        return true;
      })
      .catch(() => false)
  }
}

const _authApi = new AuthorizationAPI(Api);
export default _authApi;