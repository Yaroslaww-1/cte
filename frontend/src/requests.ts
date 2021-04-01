import axios from 'axios';

axios.create({
  baseURL: 'http://localhost:8080/auth',
})

// const instance = axios.create({
//   baseURL: 'http://localhost:8080/auth',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

const registerUser = async (data: {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
  }): Promise<any> => {
  console.log( data)
  return await axios.post('https://my-json-server.typicode.com/tyomakarimov/Database/users', data, {headers:{"Content-Type" : "application/json"}}).then(res => console.log('res', res)).catch(err => console.log('err', err));
  // await fetch(`https://my-json-server.typicode.com/tyomakarimov/Database/users`, { method: "POST", body: JSON.stringify(data) });
};

// const logInUser = async (data: { email: string, password: string }): Promise<any> => {
//   await axios.get('https://my-json-server.typicode.com/tyomakarimov/Database/users').then(res => console.log(res));
// }


export { registerUser };