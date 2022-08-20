
import { getPostBody, getPostBodyString } from './UrlUtil';
import { printObj } from './ItemsUtil';


// const request = (url, method, body) => {
//   return request2(url, method, JSON.stringify((body));
// };

const request = (url, method, body) => {
  let isOk;
  // let bodyString = JSON.stringify((body);

  // printObj(body);
  // printObj(bodyString); 

  console.log('ernest body', body);
  console.log('ernest url', url);
  console.log('ernest method', method);

  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body
    })
      .then((response) => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then((responseData) => {
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  request
};
