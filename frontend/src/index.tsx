import React from 'react';
import { render } from 'react-dom';
import { Page } from 'ui/components/page';

//TODO: remove, i've added this just for testing and as an example
// fetch('/api/user/createUser', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         login: `test${Math.round(Math.random()*10)}`,
//         password: `test${Math.round(Math.random()*10)}`
//     }), // тип данных в body должен соответвовать значению заголовка "Content-Type"
// });

render(<Page />, document.getElementById('app'));
