import Vue from "vue";
import axios from "axios";
import { Toast } from "vant";
Vue.use(Toast);
const baseUrl = process.env.VUE_APP_BASE_URL;
// axios.defaults.baseURL = baseUrl;
// axios.defaults.withCredentials = false;
// axios.defaults.timeout = 6000;
const service = axios.create({
    baseURL: baseUrl, // url = base api url + request url
    withCredentials: false, // send cookies when cross-domain requests
    timeout: 6000 // request timeout
})
// Add a request interceptor
service.interceptors.request.use(
    (config) => {
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
service.interceptors.response.use(
    (response) => {
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

                default:
                    error.message = `连接出错(${error.response.status})!`;
            }
            Toast(error.message);
        }

        else {
            error.message = "网络异常，请稍后重试";
        }

        Toast(error.message);
        // store.commit("setVanLoading", false)
        return Promise.reject(error);
    }
);


export default service;
