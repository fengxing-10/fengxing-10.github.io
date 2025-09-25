<template>
    <div class="page-container"> <!-- 新增容器 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="width: 100px;"><el-button @click="showAdd">
                        <li class="el-icon-plus">创建</li>
                    </el-button></div>
            </div>
            <div class="table-wrapper"> <!-- 新增表格包裹层 -->
                <div class="text item">
                    <el-table :data="tableData">
                        <el-table-column label="管理员账号">
                            <template slot-scope="scope">
                                <span>{{ scope.row.username }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="权限">
                            <template slot-scope="scope">
                                <span>{{ scope.row.privilege }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="密码">
                            <template slot-scope="scope">
                                <span>{{ scope.row.password }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="bianji(scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="30%">
            <admin @close="handleClose" :key="dialogFormVisible" :form1="form" />
        </el-dialog>
    </div>
</template>

<script>
import admin from '@/components/admin/admin.vue'
import { admineSearch, adminId, adminDel } from '@/api/admin'
export default {
    components: {
        admin
    },
    data() {
        return {
            dialogFormVisible: false,
            page: 1,
            totalpage: 1,
            password: '',
            privilege: '',
            username: '',
            tableData: [],
            form: {
                id: -1,
                password: '',
                privilege: '',
                username: '',
            }
        }
    },
    methods: {
        showAdd() {
            this.form.id = -1
            this.form.password = ''
            this.form.privilege = ''
            this.form.username = ''
            this.dialogFormVisible = true
        },
        handleClose() {
            this.gettable()
            this.dialogFormVisible = false
        },
        gettable() {
            admineSearch().then((result) => {
                // console.log(result);
                this.tableData = result.data
            }).catch((err) => {

            });
        },
        bianji(row) {
            this.form.id = row.id
            adminId(this.form.id).then((result) => {
                // console.log(result);
                this.form.password = result.data.password
                this.form.privilege = result.data.privilege
                this.form.username = result.data.username
                this.dialogFormVisible = true
            }).catch((err) => {

            });
        },
        handleDelete(id) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                adminDel(id).then((result) => {
                    // console.log(result);
                    if (result.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.gettable()
                    }
                }).catch((err) => {

                });


            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

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

// 表格包裹层 - 关键修复
.table-wrapper {
    width: 100%;
    height: 100%;
    overflow-x: auto; // 超出宽度时显示水平滚动条

    box-sizing: border-box;
}

.el-table {
    width: 100%;
    min-width: 600px; // 设置最小宽度，避免过窄
    height: 100%;
    max-height: 680px;
    overflow-y: auto;
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