import service from "@/utils/request";

//登录接口
export function login(data) {
    return service({
        url: "user/login",
        method: "post",
        data
    })
}
export function loginStatus(){
    return service({
        url:"user/login/status",
        method:"get"
    })
}
export function logout(){
    return service({
        url:"user/logout",
        method:'get'
    })
}