import axios from 'axios';

// 超时时间是5秒
axios.defaults.timeout = 5000;
// 允许跨域
axios.defaults.withCredentials = true;
// Content-Type 响应头
axios.defaults.headers.post["Content-Type"] ="application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] ="*";

// 基础url
// axios.defaults.baseURL = 后台接口地址;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

export default axios