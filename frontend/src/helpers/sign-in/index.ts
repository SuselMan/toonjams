import { debounced } from 'utils/debounce';

const fakeLoginCheck = (login: string) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  })
}

const _checkLoginAvailable = (login: string) => {
  console.log("check login avalilable")
  fakeLoginCheck(login).then(v => console.log('login available: ', v));
}

export const checkLoginAvailable = debounced(2000, _checkLoginAvailable)