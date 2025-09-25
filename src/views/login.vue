<template>
    <div class="login">
        <div class="log">
            <div slot="header" class="clearfix da">
                <span>选课管理系统</span>
            </div>
            <el-form :label-position="labelPosition" :rules="rules"
                style="display: flex; flex-direction: column;align-items: center;" :model="formLabelAlign"
                ref="loginform">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" placeholder="账号"
                        v-model="formLabelAlign.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-lock" placeholder="密码" v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-button type="primary" style="width: 100%;" @click="fn">登录</el-button>
            </el-form>

            <el-radio-group v-model="formLabelAlign.userType" style="margin-top: 20px;">
                <el-radio :label="1" style="color: white;">学生</el-radio>
                <el-radio :label="2" style="color: white;">教师</el-radio>
                <el-radio :label="3" style="color: white;">管理员</el-radio>
            </el-radio-group>

        </div>
    </div>
</template>
<script>
import { login } from '@/api/user';
export default {
    name: "login",
    data() {
        return {
            labelPosition: 'left',
            formLabelAlign: {
                username: '',
                password: '',
                userType: 3
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        fn() {
            console.log(this.$refs["loginform"]);
            this.$refs["loginform"].validate(flag => {
                console.log(flag);
                if (flag) {
                    login(this.formLabelAlign).then((result) => {
                        console.log(result);
                        if (result.data.loggedIn) {
                            this.$message({
                                type: "success",
                                message: "登录成功"
                            })
                            this.$store.commit("user/updateLoggedIn", result.data.userType)
                            this.$store.commit("user/updatepermission", result.data.permission)
                            this.$router.push("/index",()=>{})
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/background.png');
    background-repeat: no-repeat;
    background-size: cover;

    color: white;

    .log {
        width: 400px;
        background-color: rgb(79, 81, 81, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;

        .da {
            display: flex;
            justify-content: center;
            font-size: 20px;
            height: 40px;
        }

    }
}
</style>