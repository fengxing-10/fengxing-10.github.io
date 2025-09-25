<template>
    <div>
        <el-form :model="form" label-width="80px" :rules="rules" ref="form">
            <el-form-item prop="name" label="专业名称">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="departmentId" label="所属系">
                <el-select v-model="form.departmentId" placeholder="请选择系">
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
import { departmentNames } from '@/api/department';
import { majorAdd, majorChange } from '@/api/major';
export default {
    props: ["form1"],
    data() {
        return {
            form: {
                id: this.form1.id,
                name: this.form1.name,
                departmentId: ""
            },
            departments: [],
            rules: {
                name: [
                    { required: true, message: '请输入系名', trigger: 'blur' },
                ],
                departmentId: [
                    { required: true, message: '请选择系', trigger: 'change' },
                ]
            }
        }
    },
    methods: {
        // 系的数据
        getDepartment() {
            departmentNames().then(res => {
                // console.log(res);
                if (res.code === 0) {
                    this.departments = res.data
                    if (this.form1.departmentName) {
                        res.data.filter(item => {
                            if (item.name == this.form1.departmentName) {
                                this.form.departmentId = item.id
                            }
                        })
                    }
                }
            })
        },
        // 添加
        submit() {
            this.$refs["form"].validate(f => {
                // console.log(f);
                if (f) {
                    if (this.form.id == -1) {
                        majorAdd(this.form).then(res => {
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
                    } else {
                        majorChange(this.form).then((result) => {
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
        bianji(id) {

        }
    },
    mounted() {
        this.getDepartment()
    }
}
</script>