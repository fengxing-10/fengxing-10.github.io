import service from "@/utils/request";

export function admineSearch(){
    return service({
        url:"/admin/admin",
        method:"get",
    })
}

export function adminAdd(data){
    return service({
        url:"/admin/admin",
        method:"post",
        data
    })
}

export function adminEdit(data){
    return service({
        url:"/admin/admin",
        method:"put",
        data
    })
}

export function adminId(id){
    return service({
        url:"/admin/admin/" + id,
        method:"get"
    })
}

export function adminDel(id){
    return service({
        url:"/admin/admin/" + id,
        method:"delete"
    })
}