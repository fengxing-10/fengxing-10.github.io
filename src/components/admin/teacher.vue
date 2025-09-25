<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="number" label="教师工号">
                <el-input v-model="form.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="教师姓名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="departmentId" label="所属系">
                <el-select v-model="form.departmentId" placeholder="请选择系">
                    <el-option v-for="item in departments" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="password" label="登录密码">
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
import { departmentNames } from '@/api/department';
import { teacherAdd, teacherXq, teacherEdit } from '@/api/teacher';
export default {
    props: ["form1"],
    data() {
        return {
            form: {
                id: this.form1.id,
                name: this.form1.name,
                number: this.form1.number,
                password: this.form1.password,
                departmentId: this.form1.departmentId
            },
            departments: [],
            rules: {
                name: [
                    { required: true, message: '请输入班级名', trigger: 'blur' },
                ],
                number: [
                    { required: true, message: '请选择年级', trigger: 'blur' },
                ],
                departmentId: [
                    { required: true, message: '请选择专业', trigger: 'change' },
                ],
                password: [
                    { required: true, message: '请选择年级', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        getcalssName() {
            departmentNames().then((result) => {
                // console.log(result);
                this.departments = result.data
            }).catch((err) => {

            });
        },
        getTeacher() {
            teacherXq(1).then((result) => {
                // console.log(result);

            }).catch((err) => {

            });
        },
        submit() {
            this.$refs["form"].validate(f => {
                // console.log(f);
                if (f) {
                    if (this.form.id == -1) {
                        teacherAdd(this.form).then(res => {
                            // console.log(res);
                            if (res.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "添加成功"
                                })
                                // 通知父级关闭对话（子传父）
                                this.$emit("close")
                            }
                        })
                    } else {
                        teacherEdit(this.form).then((result) => {
                            // console.log(result);
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
        }
    },
    mounted() {
        this.getcalssName()
        this.getTeacher()
    }
}
</script>