import service from "@/utils/request";

// 添加
export function majorAdd(data) {
    return service({
        url: "/admin/major",
        method: "post",
        data: data
    })
}

export function majorSearch(params,page=1) {
    return service({
        url: "/admin/major/page/" +page,
        method: "get",
        params
    })
}

export function majorCount(params) {
    return service({
        url: "/admin/major/page/count",
        method: "get",
        params
    })
}

export function majorChange(data) {
    return service({
        url: "/admin/major",
        method: "put",
        data: data
    })
}

export function majorName() {
    return service({
        url: "/admin/major/names",
        method: "get"
    })
}

export function majorDel(id) {
    return service({
        url: "/admin/major/" + id,
        method: "delete"
    })
}