<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="name" label="姓名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="number" label="学号">
                <el-input v-model="form.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="classId" label="所属班级">
                <el-select v-model="form.classId" placeholder="请选择班级">
                    <el-option v-for="item in departments" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="birthday" label="生日">
                <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="form.sex" label="0">女</el-radio>
                <el-radio v-model="form.sex" label="1">男</el-radio>
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
import { className } from '@/api/classadmin';
import { studentAdd, studentEdit } from '@/api/student';
export default {
    props: ["form1"],
    data() {
        return {
            form: {
                id: this.form1.id,
                name: this.form1.name,
                number: this.form1.number,
                classId: this.form1.classId,
                email: this.form1.email,
                password: this.form1.password,
                birthday: this.form1.birthday,
                sex: "0"
            },
            departments: [],
            rules: {
                name: [
                    { required: true, message: '请输入学生姓名', trigger: 'blur' },
                ],
                number: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                ],
                classId: [
                    { required: true, message: '请选择班级', trigger: 'change' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                birthday: [
                    { required: true, message: '请选择生日', trigger: 'change' },
                ]
            }
        }
    },
    methods: {
        getcalssName() {
            className().then((result) => {
                this.form.sex = this.form1.sex + ""
                this.departments = result.data
            }).catch((err) => {

            });
        },
        submit() {
            this.$refs["form"].validate(f => {
                console.log(f);
                if (f) {
                    if (this.form.id == -1) {
                        studentAdd(this.form).then(res => {
                            console.log(res);
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
                        studentEdit(this.form1).then((result) => {
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
        }
    },
    mounted() {
        this.getcalssName()
    }
}
</script>