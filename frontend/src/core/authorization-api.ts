import Api, { REQUEST_TYPE } from './api';

enum AuthorizationAPIMethods {
  logout = "/api/user/logoutUser",
  createUser = "/api/user/createUser",
  authorizeUser = "/api/user/authorizeUser"
}

export interface IAuthorization {
  createUser(login: string, password: string): Promise<any>;
  authorizeUser(login: string, password: string): Promise<any>;
  logoutUser(): Promise<any>;
  getAuthorizationStatus(): Promise<boolean>;
}

class AuthorizationAPI implements IAuthorization {

  createUser(login: string, password: string): Promise<any> {
    return Api.call(AuthorizationAPIMethods.createUser, REQUEST_TYPE.POST, { login, password })
  }

  authorizeUser(login: string, password: string): Promise<any> {
    return Api.call(AuthorizationAPIMethods.authorizeUser, REQUEST_TYPE.POST, { login, password })
  }


  logoutUser(): Promise<any> {
    return Api.call(AuthorizationAPIMethods.logout, REQUEST_TYPE.POST)
  }

  getAuthorizationStatus(): Promise<boolean> {
    return new Promise((resolve) => resolve(false))
  }
}

const _authApi = new AuthorizationAPI();
export default _authApi;