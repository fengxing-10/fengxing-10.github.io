import service from "@/utils/request";

export function teaCourseSearch(){
    return service({
        url:"/teacher/course/list",
        method:"get"
    })
}

export function teaKebiaoSearch(){
    return service({
        url:"/teacher/timetable",
        method:"get"
    })
}

export function teaScoreLuru(params,page){
    return service({
        url:"/teacher/grade/page/" + page,
        method:"get",
        params
    })
}

export function teaScoreLuruTotal(params){
    return service({
        url:"/teacher/grade/page/count",
        method:"get",
        params
    })
}

export function teaScoreLuruXq(id){
    return service({
        url:"/teacher/grade/" + id,
        method:"get"
    })
}

export function teaScore(data){
    return service({
        url:"/teacher/grade",
        method:"put",
        data
    })
}