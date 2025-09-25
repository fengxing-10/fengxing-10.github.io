import service from "@/utils/request";

export function courseName(){
    return service({
        url:"/admin/course/names",
        method:"get"
    })
}

export function courseAdd(data){
    return service({
        url:"/admin/course",
        method:"post",
        data
    })
}

export function courseSearch(params,page=1){
    return service({
        url:"/admin/course/page/" + page,
        method:"get",
        params
    })
}

export function courseXq(id){
    return service({
        url:"/admin/course/" + id,
        method:"get",
    })
}

export function courseDel(id){
    return service({
        url:"/admin/course/" + id,
        method:"delete",
    })
}

export function courseEdit(data){
    return service({
        url:"/admin/course",
        method:"put",
        data
    })
}

export function courseFenye(params){
    return service({
        url:"/admin/course/page/count",
        method:"get",
        params
    })
}