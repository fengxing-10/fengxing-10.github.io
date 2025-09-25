<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="name" label="课程名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="teacherId" label="授课教师">
                <el-select v-model="form.teacherId" placeholder="请选择教师">
                    <el-option v-for="item in departments" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="grade" label="年级">
                <el-input v-model="form.grade" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="value1" label="上课时间">
                <el-select v-model="form.value1" placeholder="请选择星期">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="form.value2" placeholder="请选择节次">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="value3" label="课时">
                <el-input v-model="form.value3" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="location" label="上课地点">
                <el-input v-model="form.location" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="credit" label="学分">
                <el-input v-model="form.credit" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="maxSize" label="最大人数">
                <el-input v-model="form.maxSize" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="examDate" label="考试时间">
                <el-date-picker v-model="form.examDate" type="datetime" value-format="yyyy-MM-dd HH:mm" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="examLocation" label="考试地点">
                <el-input v-model="form.examLocation" autocomplete="off"></el-input>
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
import { teacherNames } from '@/api/teacher';
import { courseAdd, courseEdit } from '@/api/course';
export default {
    props: ["form1"],
    data() {
        return {
            form: {
                id: this.form1.id,
                name: this.form1.name,
                credit: this.form1.credit,
                examDate: this.form1.examDate,
                examLocation: this.form1.examLocation,
                grade: this.form1.grade,
                location: this.form1.location,
                maxSize: this.form1.maxSize,
                teacherId: this.form1.teacherId,
                time: this.form1.time,
                value1: '',
                value2: '',
                value3: '',
            },
            departments: [],
            options1: [{
                value: '1',
                label: '星期一'
            }, {
                value: '2',
                label: '星期二'
            }, {
                value: '3',
                label: '星期三'
            }, {
                value: '4',
                label: '星期四'
            }, {
                value: '5',
                label: '星期五'
            }],
            options2: [{
                value: '1',
                label: '第一节'
            }, {
                value: '2',
                label: '第二节'
            }, {
                value: '3',
                label: '第三节'
            }, {
                value: '4',
                label: '第四节'
            }, {
                value: '5',
                label: '第五节'
            },
            {
                value: '6',
                label: '第六节'
            },
            {
                value: '7',
                label: '第七节'
            },
            {
                value: '8',
                label: '第八节'
            },
            {
                value: '9',
                label: '第九节'
            },
            {
                value: '10',
                label: '第十节'
            }],
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
                ],
                grade: [
                    { required: true, message: '请输入年级', trigger: 'blur' },
                ],
                location: [
                    { required: true, message: '请输入上课地址', trigger: 'blur' },
                ],
                maxSize: [
                    { required: true, message: '请输入最大人数', trigger: 'blur' },
                ],
                value1: [
                    { required: true, message: '请输入上课时间', trigger: 'blur' },
                ],
                value2: [
                    { required: true, message: '请输入上课时间', trigger: 'blur' },
                ],
                value3: [
                    { required: true, message: '请输入上课时间', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        getteacherNames() {
            let a = this.form.time.split('-', 3)
            console.log(a);
            this.form.value1 = a[0]
            this.form.value2 = a[1]
            this.form.value3 = a[2]
            teacherNames().then((result) => {
                console.log(result);
                this.departments = result.data
            }).catch((err) => {

            });
        },
        submit() {
            this.form.time = [this.form.value1, this.form.value2, this.form.value3].join('-')
            this.$refs["form"].validate(f => {
                console.log(f);
                console.log(this.form);
                if (f) {
                    if (this.form.id == -1) {
                        courseAdd(this.form).then(result => {
                            console.log(result);
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
                        courseEdit(this.form).then((result) => {
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
        this.getteacherNames()
    }
}
</script>