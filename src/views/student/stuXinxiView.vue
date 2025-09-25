<template>
    <div class="page-container"> <!-- 新增容器 -->
        <el-card class="box-card">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学号">
                    <el-input v-model="ruleForm.number" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="ruleForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="教学系">
                    <el-input v-model="ruleForm.departmentName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="ruleForm.majorName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="ruleForm.className" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱"
                    :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.birthday"
                        style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio v-model="ruleForm.sex" :label="0">女</el-radio>
                    <el-radio v-model="ruleForm.sex" :label="1">男</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { stuInfo, stuUpdateInfo } from '@/api/student/stu';
export default {
    data() {
        return {
            ruleForm: {
                birthday: '',
                className: '',
                departmentName: '',
                email: '',
                majorName: '',
                name: '',
                number: '',
                sex: 0
            }
        }
    },
    methods: {
        gettable() {
            stuInfo().then((result) => {
                console.log(result);
                this.ruleForm = { ...result.data }
                console.log(this.ruleForm);
            })
        },
        submitForm() {
            this.$refs["ruleForm"].validate(f => {
                console.log(f);
                if (f) {
                    stuUpdateInfo(this.ruleForm).then((result) => {
                        console.log(result);
                        if (result.code === 0) {
                            this.$message({
                                type: "success",
                                message: "更新成功"
                            })
                            this.gettable()
                        }
                    }).catch((err) => {
                        console.log(err

                        );
                        
                    });
                }
            })

        }
    },
    mounted() {
        this.gettable()
    }
}
</script>

<style lang="scss" scoped>
// 页面容器限制宽度并自动适应
.page-container {
    width: 100%;
    box-sizing: border-box;
    padding: 20px; // 增加页面内边距
}

.text {
    font-size: 14px;
}

.box-card {
    width: 100%;
    box-sizing: border-box; // 确保卡片宽度计算包含内边距
}

// 分页容器样式优化
.pagination-container {
    margin-top: 16px;
    text-align: center; // 分页居中显示
}

.clearfix {
    display: flex;
    justify-content: space-between;
}
</style>