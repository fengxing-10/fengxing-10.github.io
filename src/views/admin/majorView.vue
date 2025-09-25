<template>
    <div class="page-container"> <!-- 新增容器 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="width: 100px;"><el-button @click="showAdd">
                        <li class="el-icon-plus">创建</li>
                    </el-button></div>
                <div style="display: flex;width: 400px;"><el-input v-model="name" placeholder="系别"></el-input><el-button
                        type="primary" @click="gettable">
                        <li class="el-icon-search"></li>&nbsp;查询
                    </el-button></div>
            </div>
            <div class="table-wrapper"> <!-- 新增表格包裹层 -->
                <div class="text item">
                    <el-table :data="tableData">
                        <el-table-column label="专业名">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="系名">
                            <template slot-scope="scope">
                                <span>{{ scope.row.departmentName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="bianji(scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger"
                                    @click="handleDelete(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card>
        <div class="pagination-container">
            <!-- 修改分页组件，添加page绑定和事件监听 -->
            <el-pagination background layout="prev, pager, next" :current-page="page" :total="totalpage"
                @current-change="handlePageChange">
            </el-pagination>
        </div>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="30%">
            <major @close="handleClose" :key="dialogFormVisible" :form1="form" />
        </el-dialog>

    </div>
</template>

<script>
import major from '@/components/admin/major.vue'
import { majorSearch, majorCount,majorDel } from '@/api/major'
export default {
    components: {
        major
    },
    data() {
        return {
            departmentName: '',
            name: '',
            tableData: [],
            dialogFormVisible: false,
            page: 1,
            totalpage: 1,
            form:{
                id:-1,
                departmentName:'',
                name:''
            }
        }
    },
    methods: {
        showAdd() {
            this.form.id = -1
            this.form.departmentName = ''
            this.form.name = ''
            this.dialogFormVisible = true
        },
        handleClose() {
            this.fenyeZongshu()
            this.gettable()
            this.dialogFormVisible = false
        },
        gettable() {
            let params = {
                name: this.name,
                departmentName: this.departmentName
            }
            this.fenyeZongshu()
            majorSearch(params,this.page).then((result) => {
                // console.log(result);
                this.tableData = result.data
            }).catch((err) => {

            });
        },
        handlePageChange(newPage) {
            this.page = newPage;  // 更新当前页码
            this.gettable();     // 重新加载表格数据
        },
        fenyeZongshu() {
            let params = {
                name: this.name,
                departmentName: this.departmentName
            }
            majorCount(params).then((result) => {
                // console.log(result);
                this.totalpage = result.data * 10
            }).catch((err) => {

            });
        },
        bianji(row){
            // console.log(row);
            
            this.form.id = row.id
            this.form.name = row.name
            this.form.departmentName = row.departmentName
            this.dialogFormVisible = true
        },
        handleDelete(id){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                majorDel(id).then((result) => {
                    // console.log(result);
                    if (result.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.gettable()
                    }
                })
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
        this.fenyeZongshu()
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
    overflow-x: auto; // 超出宽度时显示水平滚动条
    box-sizing: border-box;
}

.el-table {
    width: 100%;
    min-width: 600px; // 设置最小宽度，避免过窄
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