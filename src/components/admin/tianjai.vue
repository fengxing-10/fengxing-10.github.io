<template>
    <div>
        <el-form label-width="80px" :model="form" :rules="rules" ref="form">
            <el-form-item label="系名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

        </el-form>
        <div style="display: flex;justify-content: end;">
            <div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submit">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </span>
            </div>
        </div>


    </div>
</template>
<script>
import { addtable, departmentChange } from '@/api/department';
export default {
    props: ["dialogVisible", "form1"],
    data() {
        return {
            form: {
                id: this.form1.id,
                name: this.form1.name
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        cancel() {
            this.$emit("close")
        },
        submit() {
            this.$refs["form"].validate(f => {
                if (f) {
                    if (this.form1.id == -1) {
                        addtable(this.form).then((result) => {
                            // console.log(result);
                            if (result.code === 0) {
                                // 提示
                                this.$message({
                                    type: "success",
                                    message: "添加成功"
                                })
                                // 通知父级关闭对话（子传父）
                                this.$emit("close")
                            }
                        }).catch((err) => {

                        });
                    } else {
                        departmentChange(this.form1).then((result) => {
                            // console.log(result);
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

        }
    }
}
</script>