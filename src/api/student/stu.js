import service from "@/utils/request";

export function stuSelectCourse(params){
    return service({
        url:"student/course/select/page/1",
        method:"get",
        params
    })
}

export function stuUpdateCourse(id){
    return service({
        url:"/student/course/select/"+id,
        method:"post"
    })
}

export function stuCourse(){
    return service({
        url:"/student/course/list",
        method:"get"
    })
}

export function stuCourseDel(id){
    return service({
        url:"/student/course/"+id,
        method:"delete"
    })
}

export function stuSearch(){
    return service({
        url:"/student/course/list",
        method:"get"
    })
}

export function stuTableSearch(){
    return service({
        url:"/student/timetable",
        method:"get"
    })
}

export function stuInfo(){
    return service({
        url:"/student/info",
        method:"get"
    })
}

export function stuUpdateInfo(data){
    return service({
        url:"/student/info",
        method:"put",
        data
    })
}
