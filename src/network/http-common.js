import axios from 'axios';
const API_URL = "http://localhost:8002/api/v1/";
const api = axios.create({
  baseURL: API_URL,
})

api.send = (path, method = 'GET', params = null, body = null) => new Promise((resolve, reject) => {
  if (params !== null) {
    const query = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&')
    path = `${path}?${query}`
  }


  api[method.toLowerCase()](path, body).then(response => {
    try {
      if (response === undefined || response.data === undefined) {
        reject({ success: false, message: response, data: response })
      }
      if (response.success) {
        resolve({
          success: true,
          data: response.data.data,
          message: response.data.message,
          extra: response.data,
        })
      } else {
        resolve({
          success: false,
          data: response !== undefined  && response.data !== undefined ? response.data : [],
          message: response !== undefined  && response.data !== undefined  ? response.data.message : [],
        })
      }
    } catch (e) {
      reject({ message: e, success: false, data: null })
    }
  })
});

api.interceptors.response.use(({ data, status, statusText }) => {
  /**
     * Todo  implementar los codigos de error como se requiera
     */
  if (status === 200) {
    return Promise.resolve({
      success: true,
      data,
      statusText,
    })
  }
  return Promise.resolve({
    success: true,
    data,
    statusText,
  })
}, error => {
  // if (error.response.data.message === 'Unauthenticated.' && router.history.current.name !== 'login') {
  //   router.push('logout')
  // }
  return Promise.resolve(
    {
      success: false,
      data: error !== undefined && error.response !== undefined  && error.response.data !== undefined ? error.response.data : error,
      statusText: error !== undefined && error.response !== undefined ? error.response.statusText : error,
    },
  )
})

api.interceptors.request.use(config => {
  // config.headers.Authorization = `Bearer ${ new OAuth().getAccessToken()}`
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['Access-Control-Allow-Origin'] = '*';
  return config
})

export default api