import { useState, useEffect } from 'react';

// useFetch('/api/user/createUser', JSON.stringify({
//   login: `test${Math.round(Math.random()*10)}`,
//   password: `test${Math.round(Math.random()*10)}`
// }), 'GET');

// function useFetch<T>(url: string, body: any = null, method: string = 'GET'): [Boolean, T?, Error?] {
//   const [response, setResponse] = useState<T>();
//   const [error, setError] = useState<Error>();
//   const [isLoading, setIsLoading] = useState<Boolean>(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(url, {
//           method,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body
//         });
//         const json = await response.json();
//         setResponse(json);
//         setIsLoading(false)
//       } catch (error) {
//         setError(error);
//       }
//     };
//     fetchData();
//   }, []);
//   return [isLoading, response, error];
// };

// TODO: make hooks for fetching and sending data ( which also should catching interner error )