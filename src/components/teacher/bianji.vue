<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="dailyScore" label="日常成绩">
                <el-input v-model="form.dailyScore" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="examScore" label="考试成绩">
                <el-input v-model="form.examScore" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="score" label="总成绩">
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
import { teaScore } from '@/api/tearcher/teach';
export default {
    props: ["form1"],
    data() {
        return {
            form: {
                studentCourseId: this.form1.id,
                dailyScore: this.form1.dailyScore,
                examScore: this.form1.examScore,
                score: this.form1.score
            },
            departments: [],
            rules: {
                dailyScore: [
                    { required: true, message: '请输入日常成绩', trigger: 'blur' },
                ],
                examScore: [
                    { required: true, message: '输入考试成绩', trigger: 'blur' },
                ],
                score: [
                    { required: true, message: '请输入总成绩', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {  
        submit() {
            this.$refs["form"].validate(f => {
                console.log(f);
                if (f) {
                    teaScore(this.form).then((result) => {
                        console.log(result);
                        if (result.code === 0) {
                            // 提示
                            this.$message({
                                type: "success",
                                message: "更新成功"
                            })
                            // 通知父级关闭对话（子传父）
                            this.$emit("close")
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                }
            })
        },
        canel() {
            this.$emit("close")
        }
    }
}
</script>