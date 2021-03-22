import Vue from "vue";
import axios from "axios";
import QS from "qs";
import store from "../store/store";

import { Toast } from "vant";
Vue.use(Toast);

// let pending = []
// let CancelToken = axios.CancelToken

// let cancelPending = config => {
//   pending.forEach((item, index) => {
//     if (config) {
//       if (item.UrlPath === config.url) {
//         item.Cancel() // 取消请求
//         pending.splice(index, 1) // 移除当前请求记录
//       }
//     } else {
//       item.Cancel() // 取消请求
//       pending.splice(index, 1) // 移除当前请求记录
//     }
//   })
// }

const baseUrl = process.env.VUE_APP_BASE_URL;
// if (process.env.NODE_ENV === "development") {
// } else {
// }
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = false;
axios.defaults.timeout = 6000;

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    // console.log( "configconfigconfigconfigconfigconfig",config)

    // cancelPending(config)
    // config.cancelToken = new CancelToken(res => {
    //   pending.push({ UrlPath: config.url, Cancel: res })
    // })

    // console.log(config,'config');
    if (config.url.indexOf("?") < 0) {
      config.url = config.url + "?t=" + new Date().getTime().toString();
    } else {
      config.url = config.url + "&t=" + new Date().getTime().toString();
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // cancelPending(response.config)

    return response.data;
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误(400)";
          break;
        case 401:
          return history.push("/login");
          break;
        case 403:
          error.message = "拒绝访问(403)";
          break;
        case 404:
          error.message = "请求出错(404)";
          break;
        case 408:
          error.message = "请求超时(408)";
          break;
        case 500:
          error.message = "服务器错误(500)";
          break;
        case 501:
          error.message = "服务未实现(501)";
          break;
        case 502:
          error.message = "网络错误(502)";
          break;
        case 503:
          error.message = "服务不可用(503)";
          break;
        case 504:
          error.message = "网络超时(504)";
          break;
        case 505:
          error.message = "HTTP版本不受支持(505)";
          break;
        // case "ECONNABORTED":
        //   if (error.message.indexOf("timeout") != -1) {
        //     error.message = "请求超时"
        //   }
        //   break
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
      Toast(error.message);
    }
    // else{
    //   console.log(error,"阻止的请求");
    //   if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 ) {
    //     Toast('网络错误,请求超时')
    //   }
    // }
    else {
      error.message = "网络异常，请稍后重试";
    }

    Toast(error.message);
    // store.commit("setVanLoading", false)
    return Promise.reject(error);
  }
);

// axios.interceptors.request.use(
//     config => {
//       // console.log(config);
//       // const xToken = getXToken()
//       // if (xToken !== null) {
//       //   config.headers['X-Token'] = xToken
//       // }
//       if (config.method === 'post') {
//         let data = QS.parse(config.data);
//         data['_t'] = new Date().getTime()
//         config.data = QS.stringify(data)
//       } else if (config.method === 'get') {
//         config.params = {
//           _t: new Date().getTime(),
//           ...config.params
//         }
//       }
//       return config
//     }, function (error) {
//       return Promise.reject(error)
//     }
// )

export default axios;
