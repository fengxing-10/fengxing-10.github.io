import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import index from '@/views/index.vue'
import { loginStatus } from '@/api/user'
import store from '@/store'
import indexView from '@/views/admin/indexView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/index',
    component: index,
    redirect: "/admin/indexView",
    children: [
      {
        path: "/admin/indexView",
        component: indexView
      },
    ]
  }
]
const adminRoute = [
  {
    path: '/xiView',
    component: index,
    redirect: "/admin/xiView",
    children: [
      {
        path: "/admin/xiView",
        component: () => import("../views/admin/xiView.vue"),
        // 多余的数据
        meta: {
          title: "系管理"
        }
      }
    ]
  },
  {
    path: '/major',
    component: index,
    redirect: "/admin/major",
    children: [
      {
        path: "/admin/major",
        component: () => import("../views/admin/majorView.vue"),
        meta: {
          title: "专业管理"
        }
      }
    ]
  },
  {
    path: '/class',
    component: index,
    redirect: "/admin/class",
    children: [
      {
        path: "/admin/class",
        component: () => import("../views/admin/classView.vue"),
        meta: {
          title: "班级管理"
        }
      }
    ]
  },
  {
    path: '/student',
    component: index,
    redirect: "/admin/student",
    children: [
      {
        path: "/admin/student",
        component: () => import("../views/admin/studentView.vue"),
        meta: {
          title: "学生管理"
        }
      }
    ]
  },
  {
    path: '/teacher',
    component: index,
    redirect: "/admin/teacher",
    children: [
      {
        path: "/admin/teacher",
        component: () => import("../views/admin/teacherView.vue"),
        meta: {
          title: "教师管理"
        }
      }
    ]
  },
  {
    path: '/course',
    component: index,
    redirect: "/admin/course",
    children: [
      {
        path: "/admin/course",
        component: () => import("../views/admin/courseView.vue"),
        meta: {
          title: "课程管理"
        }
      }
    ]
  },
  {
    path: '/xuanke',
    component: index,
    redirect: "/admin/xuanke",
    children: [
      {
        path: "/admin/xuanke",
        component: () => import("../views/admin/xuanKeView.vue"),
        meta: {
          title: "选课管理"
        }
      }
    ]
  },
  {
    path: '/admin',
    component: index,
    redirect: "/admin/admin",
    children: [
      {
        path: "/admin/admin",
        component: () => import("../views/admin/adminView.vue"),
        meta: {
          title: "管理员管理"
        }
      }
    ]
  }
]
const teacherRoute = [
  // {
  //   path: '/teach',
  //   component: index,
  //   // 路由重定向
  //   redirect: "/teach/index",
  //   children: [
  //     {
  //       path: '/teach/index',
  //       component: () => import("../views/teacher/TeachView.vue"),
  //       meta: {
  //         title: "教师首页"
  //       }
  //     },
  //   ]
  // },
  {
    path: '/teacherSearch',
    component: index,
    // 路由重定向
    redirect: "/teacherSearch/index",
    children: [
      {
        path: '/teacherSearch/index',
        component: () => import("../views/teacher/teacherSearchView.vue"),
        meta: {
          title: "授课查询"
        }
      },
    ]
  },
  {
    path: '/tearcherKebiao',
    component: index,
    // 路由重定向
    redirect: "/tearcherKebiao/index",
    children: [
      {
        path: '/tearcherKebiao/index',
        component: () => import("../views/teacher/tearcherKebiaoView.vue"),
        meta: {
          title: "教师课表"
        }
      },
    ]
  },
  {
    path: '/teacherLuru',
    component: index,
    // 路由重定向
    redirect: "/teacherLuru/index",
    children: [
      {
        path: '/teacherLuru/index',
        component: () => import("../views/teacher/teacherLuruView.vue"),
        meta: {
          title: "成绩录入"
        }
      },
    ]
  }
]

const studentRoute = [
  {
    path: '/selectCourse',
    component: index,
    // 路由重定向
    redirect: "/selectCourse/index",
    children: [
      {
        path: '/selectCourse/index',
        component: () => import("../views/student/SelectCourse.vue"),
        meta: {
          title: "选修课程"
        }
      },
    ]
  },
  {
    path: '/Course',
    component: index,
    // 路由重定向
    redirect: "/Course/index",
    children: [
      {
        path: '/Course/index',
        component: () => import("../views/student/stuCourseView.vue"),
        meta: {
          title: "学生课程"
        }
      },
    ]
  },
  {
    path: '/stuKebiao',
    component: index,
    // 路由重定向
    redirect: "/stuKebiao/index",
    children: [
      {
        path: '/stuKebiao/index',
        component: () => import("../views/student/stuKebiaoView.vue"),
        meta: {
          title: "课表查询"
        }
      },
    ]
  },
  {
    path: '/stuScorseView',
    component: index,
    // 路由重定向
    redirect: "/stuScorseView/index",
    children: [
      {
        path: '/stuScorseView/index',
        component: () => import("../views/student/stuScorseView.vue"),
        meta: {
          title: "成绩查询"
        }
      },
    ]
  },
  {
    path: '/stuXinxiView',
    component: index,
    // 路由重定向
    redirect: "/stuXinxiView/index",
    children: [
      {
        path: '/stuXinxiView/index',
        component: () => import("../views/student/stuXinxiView.vue"),
        meta: {
          title: "信息维护"
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.state.user.loggedIn) {
    if (to.path == "/login") {
      next("/index")
    } else {
      // next()
      if (store.state.user.roles.length > 0) {  //已经添加过路由了
        console.log("已经添加过路由了");
        console.log(store.state.user.roles);

        next()
      } else {
        // 动态添加路由
        // 修改vuex的权限
        console.log("还没添加路由");
        console.log(store.state.user.permission);

        if (store.state.user.userType == 3) {
          const arr = adminRoute.filter((item, index) => {
            return store.state.user.permission[(7-index)] == "1"
          })
          store.commit("user/updateRoles", arr)
          console.log(arr);
          router.addRoutes(arr)
        } else if (store.state.user.userType == 2) {
          store.commit("user/updateRoles", teacherRoute)
          router.addRoutes(teacherRoute)
        } else if (store.state.user.userType == 1) {
          store.commit("user/updateRoles", studentRoute)
          router.addRoutes(studentRoute)
        }
        next({ ...to, replace: true })
      }
    }
  } else {  //没有登录
    let ret = await loginStatus()
    // console.log(ret.data.loggedIn);
    let loggedIn = ret.data.loggedIn

    if (loggedIn) {
      store.commit("user/updateLoggedIn", ret.data.userType)
      store.commit("user/updatepermission", ret.data.permission)
      next({ ...to, replace: true })
    } else {
      if (to.path == "/login") {
        next()
      } else {
        next("/login")
      }
    }
  }
})

export default router
