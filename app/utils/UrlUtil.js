export const getUrl = (url) => {
  if (url.indexOf('?') === -1) {
    return `${url}?showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f`;
  }
  return `${url}&showapi_appid=29400&showapi_sign=e7977541307547beab3e4aa033adb78f`;
};


export const getPostBody = (obj) => {

  let formData = new FormData();

  for (let i in obj) {
    formData.append(i, obj.i + '');
  }

  console.log('formData:' + formData);

  return { body: formData };
}

export const getPostBodyString = (obj) => {
  let result = '&';
  for (let i in obj) {
    result += '&' + i + '=' + obj[i];
  }
  return result.substring(2, result.length);
}


