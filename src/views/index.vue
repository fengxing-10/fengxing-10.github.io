<template>
    <div>
        <el-container>
            <el-header>
                <div><i class="el-icon-s-home">选课管理系统</i></div>
                <div class="weibu"><el-avatar :size="36"
                        src="https://ts1.tc.mm.bing.net/th/id/OIP-C.XS6EtBzAmWWa31cfFvcx6QHaHa?w=195&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"></el-avatar>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            小王<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><span @click="dengluout">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main style="padding: 0;margin: 0;">
                <el-container style="border: 1px solid #eee;">
                    <el-aside width="200px" style="background-color: #324157;">
                        <el-menu :default-active="$route.path" background-color="#324157" text-color="#fff" router>
                            <el-menu-item index="/admin/indexView">
                                <i class="el-icon-menu"></i>
                                <span slot="title">首页</span>
                            </el-menu-item>
                            <template v-for="(role, roleIndex) in $store.state.user.roles">
                                <el-menu-item v-for="(child, childIndex) in role.children" :key="`${roleIndex}-${childIndex}`" :index="child.path">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">{{ child.meta.title }}</span>
                                </el-menu-item>
                            </template>
                        </el-menu>
                    </el-aside>

                    <el-container style="height:93vh ;">
                        <router-view></router-view>
                    </el-container>
                </el-container>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { logout } from '@/api/user';
export default {
    methods: {
        dengluout() {
            console.log(1);
            logout().then((result) => {
                this.$store.commit("user/updatelogout")
                this.$store.commit("user/updateRoles", [])
                this.$router.push("/login")
            }).catch((err) => {
                console.log(err);
            });

        }
    }
};

</script>

<style lang="scss" scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    font-size: 26px;
    display: flex;
    justify-content: space-between;

    .weibu {
        width: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.el-aside {
    color: #333;
}
</style>