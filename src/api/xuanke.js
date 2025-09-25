import service from "@/utils/request";

export function xuankeSearch(params,page){
    return service({
        url:"/admin/student/course/page/" + page,
        method:"get",
        params
    })
}

export function xuankeFenye(params){
    return service({
        url:"/admin/student/course/page/count",
        method:"get",
        params
    })
}

export function xuankeAdd(data){
    return service({
        url:"/admin/student/course",
        method:"post",
        data
    })
}

export function xuankeEdit(data){
    return service({
        url:"/admin/student/course",
        method:"put",
        data
    })
}

export function xuankeId(id){
    return service({
        url:"/admin/student/course/" + id,
        method:"get"
    })
}

export function xuankeDel(id){
    return service({
        url:"/admin/student/course/"+id,
        method:"delete"
    })
}