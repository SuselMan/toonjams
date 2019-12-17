
interface IApi {
  call<T>(method: string, params?: object): Promise<T>;
}

export enum REQUEST_TYPE {
  POST = 'POST',
  GET = 'GET'
}

class Api {

  call<T>(method: string, requestType: string = REQUEST_TYPE.GET, params?: object): Promise<T> {
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

  private _createPromiseFromXhr<T>(xhr: XMLHttpRequest): Promise<T> {
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          console.log('xhr ready: ', xhr);
          if (xhr.status === 200) {
            console.log('xhr completed: ', xhr);
            // parse json request here
            resolve();
          } else {
            reject(new Error(xhr.statusText + xhr.responseText));
          }
        }
      }
    })
  }
}

const _api = new Api();
export default _api;