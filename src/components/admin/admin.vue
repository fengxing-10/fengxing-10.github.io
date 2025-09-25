<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="username" label="管理员账号">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="privilege" label="权限">
                <el-checkbox v-model="value1">系管理</el-checkbox>
                <el-checkbox v-model="value2">专业管理</el-checkbox>
                <el-checkbox v-model="value3">班级管理</el-checkbox>
                <el-checkbox v-model="value4">学生管理</el-checkbox>
                <el-checkbox v-model="value5">教师管理</el-checkbox>
                <el-checkbox v-model="value6">课程管理</el-checkbox>
                <el-checkbox v-model="value7">选课修改</el-checkbox>
                <el-checkbox v-model="value8">管理员管理</el-checkbox>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <div style="display: flex; justify-content: flex-end;">
                    <el-button type="primary" @click="submit">确定</el-button>
                    <el-button @click="canel">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { adminAdd,adminEdit } from '@/api/admin';

export default {
    props: ["form1"],
    data() {
        return {
            form: {
                id: this.form1.id,
                username: this.form1.username,
                privilege: this.form1.privilege,
                password: this.form1.password
            },
            departments: [],
            departments1: [],
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ]
            },
            value1: false,
            value2: false,
            value3: false,
            value4: false,
            value5: false,
            value6: false,
            value7: false,
            value8: false,
        }
    },
    methods: {
        submit() {
            this.$refs["form"].validate(f => {
                // console.log(f);
                this.value1 = this.value1 == true ? "1" : "0"
                this.value2 = this.value2 == true ? "1" : "0"
                this.value3 = this.value3 == true ? "1" : "0"
                this.value4 = this.value4 == true ? "1" : "0"
                this.value5 = this.value5 == true ? "1" : "0"
                this.value6 = this.value6 == true ? "1" : "0"
                this.value7 = this.value7 == true ? "1" : "0"
                this.value8 = this.value8 == true ? "1" : "0"
                let a = this.value8 + this.value7 + this.value6 + this.value5 + this.value4 + this.value3 + this.value2 + this.value1
                // console.log(a);
                this.form.privilege = parseInt(a, 2)
                if (f) {
                    if (this.form.id == -1) {
                        adminAdd(this.form).then(result => {
                            // console.log(result);
                            if (result.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "添加成功"
                                })
                                // 通知父级关闭对话（子传父）
                                this.$emit("close")
                            }
                        })
                    } else {
                        adminEdit(this.form).then((result) => {
                            console.log(result);
                            if (result.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "更新成功"
                                })
                                // 通知父级关闭对话（子传父）
                                this.$emit("close")
                            }
                        }).catch((err) => {

                        });
                    }
                }
            })
        },
        canel() {
            this.$emit("close")
        },
        getPri() {
            this.form.privilege = this.form.privilege.toString(2)
            this.value8 = Math.floor(this.form.privilege / 10000000) == 1 ? true : false
            this.value7 = Math.floor(this.form.privilege % 10000000 / 1000000) == 1 ? true : false
            this.value6 = Math.floor(this.form.privilege % 1000000 / 100000) == 1 ? true : false
            this.value5 = Math.floor(this.form.privilege % 100000 / 10000) == 1 ? true : false
            this.value4 = Math.floor(this.form.privilege % 10000 / 1000) == 1 ? true : false
            this.value3 = Math.floor(this.form.privilege % 1000 / 100) == 1 ? true : false
            this.value2 = Math.floor(this.form.privilege % 100 / 10) == 1 ? true : false
            this.value1 = Math.floor(this.form.privilege % 10) == 1 ? true : false

        }
    },
    mounted() {
        this.getPri()
    }
}
</script>