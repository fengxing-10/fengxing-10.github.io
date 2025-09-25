
export default {
    namespaced: true,
    state: {
        loggedIn: false,
        userType: 0,
        roles:[],
        permission:[]
    },
    mutations: {
        updateLoggedIn(state, num) {
            state.loggedIn = true
            state.userType = num
        },
        updatelogout(state) {
            state.userType = 0
            state.loggedIn = false
        },
        updateRoles(state, val) {
            state.roles = val
        },
        updatepermission(state,val){
            state.permission = val.toString(2).padStart(8, '0').split('')
        }
    }
}