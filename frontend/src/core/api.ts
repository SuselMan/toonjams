
export interface IApi {
  call<T>(method: string, requestType: string, params?: object): Promise<ApiResponse<T>>
}

export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET'
}

export type ApiResponse<T> = {
  code: number;
  response: T;
}

class Api implements IApi {

  call<T>(method: string, requestType: string = REQUEST_TYPE.GET, params?: object): Promise<ApiResponse<T>> {
    const xhr = this._createApiXhr(method, requestType);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(params) || '');

    return this._createPromiseFromXhr<T>(xhr);
  }

  private _createApiXhr(method: string, requestType: string) {
    const xhr = new XMLHttpRequest();
    xhr.open(requestType, method);
    xhr.withCredentials = true;
    return xhr;
  }

  private _createPromiseFromXhr<T>(xhr: XMLHttpRequest): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          console.log('xhr promise ready', xhr);
          if (xhr.status === 200) {
            resolve({
              code: xhr.status,
              response: xhr.response
            });
          } else {
            reject({ status: xhr.statusText, response: xhr.responseText });
          }
        }
      }
    })
  }
}

const _api = new Api();
export default _api;