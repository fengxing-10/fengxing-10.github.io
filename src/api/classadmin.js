import service from "@/utils/request";

export function classAdd(data) {
    return service({
        url: "/admin/class",
        method: "post",
        data
    })
}
export function className() {
    return service({
        url: "/admin/class/names",
        method: "get"
    })
}

export function classSearch(params, page = 1) {
    return service({
        url: "/admin/class/page/" + page,
        method: "get",
        params
    })
}

export function classFenye(params) {
    return service({
        url: "/admin/class/page/count",
        method: "get",
        params
    })
}

export function classDel(id) {
    return service({
        url: "/admin/class/" + id,
        method: "delete"
    })
}

export function classEdit(data) {
    return service({
        url: "/admin/class",
        method: "put",
        data
    })
}