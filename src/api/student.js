import service from "@/utils/request";

export function studentAdd(data){
    return service({
        url:"/admin/student",
        method:"post",
        data
    })
}

export function studentSearch(params,page=1){
    return service({
        url:"/admin/student/page/" + page,
        method:"post",
        params
    })
}

export function studentFenye(params){
    return service({
        url:"/admin/student/page/count",
        method:"post",
        params
    })
}

export function getStudentXinxi(id){
    return service({
        url:"/admin/student/" + id,
        method:"get",
    })
}

export function studentDel(id){
    return service({
        url:"/admin/student/" + id,
        method:"delete"
    })
}

export function studentEdit(data){
    return service({
        url:"/admin/student",
        method:"put",
        data
    })
}

export function studentNames(){
    return service({
        url:"/admin/student/names",
        method:"get",
    })
}