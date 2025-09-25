import axios from "axios";
import { Message } from "element-ui";
const service = axios.create({
    baseURL: "/api",
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use(conf => {
    // conf.headers["Content-Type"] = "application/x-www-form-urlencoded"
    return conf
})

//响应拦截器
service.interceptors.response.use(conf => {
    return conf.data
}, err => {
    console.log(err);
    Message({
        type:"error",
        message:err.response?err.response.data.message:"网络错误"
    })
    return {}
})

export default service