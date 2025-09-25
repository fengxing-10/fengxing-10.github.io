import service from "@/utils/request";

export function teacherAdd(data){
    return service({
        url:"/admin/teacher",
        method:"post",
        data
    })
}
export function teacherNames(){
    return service({
        url:"/admin/teacher/names",
        method:"get",
        
    })
}
export function teacherXq(id){
    return service({
        url:"/admin/teacher/"+id,
        method:"get",
    })
}

export function teacherSearch(params,page=1){
    return service({
        url:"/admin/teacher/page/"+page,
        method:"get",
        params
    })
}

export function teacherFenye(params){
    return service({
        url:"/admin/teacher/page/count",
        method:"get",
        params
    })
}

export function teacherDel(id){
    return service({
        url:"/admin/teacher/"+id,
        method:"delete"
    })
}

export function teacherEdit(data){
    return service({
        url:"/admin/teacher",
        method:"put",
        data
    })
}

export function teacherXinxi(id){
    return service({
        url:"/admin/teacher/"+id,
        method:"get"
    })
}
