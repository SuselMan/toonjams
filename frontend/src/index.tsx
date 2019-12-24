import React from 'react';
import { render } from 'react-dom';
import { Page } from 'ui/components/page';

//TODO: remove, i've added this just for testing and as an example
// const login = `test${Math.round(Math.random()*1000)}`
// const password = login
//
// fetch('/api/user/createUser', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         login,
//         password
//     })
// }).then(() => fetch('/api/user/authorizeUser', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         login,
//         password
//     })
// })).then(() => fetch('/api/user/getAuthorizedUser'))
//     .then(response => response.json())
//     .then((user) => {
//         console.log('were here', user)
//     })
//     .catch((e) => {
//         console.log('Nope', e)
//     })
render(<Page />, document.getElementById('app'));
