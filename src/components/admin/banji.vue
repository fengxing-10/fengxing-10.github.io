<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="name" label="班级名">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="grade" label="年级">
                <el-input v-model="form.grade" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="majorId" label="所属专业">
                <el-select v-model="form.majorId" placeholder="请选择专业">
                    <el-option v-for="item in departments" :key="item.id" :label="item.name"
                        :value="item.id"></el-option>
                </el-select>
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
import { classAdd, classEdit } from '@/api/classadmin';
import { majorName } from '@/api/major';
export default {
    props: ["form1"],
    data() {
        return {    
            form: {
                id: this.form1.id,
                name: this.form1.name,
                grade: this.form1.grade,
                majorId: ''
            },
            departments: [],
            rules: {
                name: [
                    { required: true, message: '请输入班级名', trigger: 'blur' },
                ],
                grade: [
                    { required: true, message: '请选择年级', trigger: 'blur' },
                ],
                majorId: [
                    { required: true, message: '请选择专业', trigger: 'change' },
                ]
            }
        }
    },
    methods: {
        getcalssName() {
            majorName().then((result) => {
                console.log(result);
                console.log(this.form1);
                
                this.departments = result.data
                if (this.form1.majorName) {
                        result.data.filter(item => {
                            if (item.name == this.form1.majorName) {
                                this.form.majorId = item.id
                            }
                        })
                    }
            }).catch((err) => {

            });
        },
        submit() {
            this.$refs["form"].validate(f => {
                console.log(f);
                if (f) {
                    if (this.form1.id == -1) {
                        classAdd(this.form).then(res => {
                            console.log(res);

                            if (res.code === 0) {
                                // 提示
                                this.$message({
                                    type: "success",
                                    message: "添加成功"
                                })
                                // 通知父级关闭对话（子传父）
                                this.$emit("close")
                            }
                        })
                    }else{
                        classEdit(this.form).then((result) => {
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