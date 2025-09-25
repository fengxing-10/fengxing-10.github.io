<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="studentId" label="学生">
                <el-select v-model="form.studentId" placeholder="请选择学生">
                    <el-option v-for="item in departments1" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="courseId" label="课程">
                <el-select v-model="form.courseId" placeholder="请选择课程">
                    <el-option v-for="item in departments" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="dailyScore" label="日常得分">
                <el-input v-model="form.dailyScore" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="examScore" label="考试得分">
                <el-input v-model="form.examScore" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="score" label="总得分">
                <el-input v-model="form.score" autocomplete="off"></el-input>
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
import { courseName } from '@/api/course';
import { studentNames } from '@/api/student';
import { xuankeAdd,xuankeEdit } from '@/api/xuanke';
export default {
    props: ["form1"],
    data() {
        return {
            form: {
                id: this.form1.id,
                courseId:this.form1.courseId,
                studentId:this.form1.studentId,
                dailyScore:this.form1.dailyScore,
                examScore:this.form1.examScore,
                score:this.form1.score
            },
            departments: [],
            departments1: [],
            rules: {
                name: [
                    { required: true, message: '请输入课程名', trigger: 'blur' },
                ],
                credit: [
                    { required: true, message: '请输入学分', trigger: 'blur' },
                ],
                teacherId: [
                    { required: true, message: '请选择教师', trigger: 'change' },
                ],
                examDate: [
                    { required: true, message: '请选择考试日期', trigger: 'blur' },
                ],
                examLocation: [
                    { required: true, message: '请输入考试地址', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        getcourseName() {
            courseName().then((result) => {
                // console.log(result);
                this.departments = result.data
            }).catch((err) => {

            });
        },
        getstudentNames() {
            studentNames().then((result) => {
                // console.log(result);
                this.departments1 = result.data
            }).catch((err) => {

            });
        },
        submit() {
            this.$refs["form"].validate(f => {
                // console.log(f);
                // console.log(this.form);
                if (f) {
                    if (this.form.id == -1) {
                        xuankeAdd(this.form).then(result => {
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
                        xuankeEdit(this.form).then((result) => {
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
        this.getcourseName()
        this.getstudentNames()
    }
}
</script>