import service from "@/utils/request";

export function admintable(params,page=1) {
    return service({
        url: "/admin/department/page/" + page,
        method: "get",
        params
    })
}

export function fenyeZongshu(names) {
    return service({
        url: "/admin/department/page/count",
        method: "get",
        params:names
    })
}

export function addtable(data){
    return service({
        url:"/admin/department",
        method:"post",
        data
    })
}

export function chaxunid(id){
    return service({
        url:"/admin/department/"+id,
        method:"get",
    })
}

export function shanchu(id){
    return service({
        url:"/admin/department/"+id,
        method:"delete",
    })
}

export function departmentNames() {
    return service({
        url: "/admin/department/names",
        method: "get",
    })
}

export function departmentChange(data) {
    return service({
        url: "/admin/department",
        method: "put",
        data: data
    })
}