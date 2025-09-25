<template>
    <div class="page-container"> <!-- 新增容器 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div></div>
                <div style="display: flex;width: 400px;">
                    <el-input v-model="courseName" placeholder="班级名"></el-input>
                    <el-input v-model="studentName" placeholder="学生名"></el-input>
                    <el-button type="primary" @click="gettable">
                        <li class="el-icon-search"></li>&nbsp;查询
                    </el-button>
                </div>
            </div>
            <div class="table-wrapper"> <!-- 新增表格包裹层 -->
                <div class="text item">
                    <el-table :data="tableData">
                        <el-table-column label="课程名">
                            <template slot-scope="scope">
                                <span>{{ scope.row.courseName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="学生姓名">
                            <template slot-scope="scope">
                                <span>{{ scope.row.studentName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="日常分">
                            <template slot-scope="scope">
                                <span>{{ scope.row.dailyScore }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="考试分">
                            <template slot-scope="scope">
                                <span>{{ scope.row.examScore }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="成绩">
                            <template slot-scope="scope">
                                <span>{{ scope.row.score }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="bianji(scope.row)">录入</el-button>
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
        <el-dialog title="录入" :visible.sync="dialogFormVisible" width="30%">
            <bianji @close="handleClose" :key="dialogFormVisible" :form1="form" />
        </el-dialog>

    </div>
</template>
<script>
import bianji from '@/components/teacher/bianji.vue'
import { teaScoreLuru, teaScoreLuruTotal, teaScoreLuruXq } from '@/api/tearcher/teach'
export default {
    components: {
        bianji
    },
    data() {
        return {
            courseName: '',
            studentName: '',
            tableData: [],
            dialogFormVisible: false,
            totalpage: 1,
            page: 1,
            form: {
                id: -1,
                dailyScore: '',
                examScore: '',
                score: ''
            }
        }
    },
    methods: {
        showAdd() {
            this.form.id = -1
            this.form.dailyScore = ''
            this.form.examScore = ''
            this.form.score = ''
            this.dialogFormVisible = true
        },
        handleClose() {
            this.fenyeZongshu()
            this.gettable()
            this.dialogFormVisible = false
        },
        bianji(row) {
            this.form.id = row.studentCourseId
            console.log(this.form.id);
            
            teaScoreLuruXq(this.form.id).then((result) => {
                console.log(result);
                if (result.code === 0) {
                    this.form.dailyScore = row.dailyScore
                    this.form.examScore = row.examScore
                    this.form.score = row.score
                    this.dialogFormVisible = true
                }
            }).catch((err) => {
                console.log(err);
                
            });

        },
        gettable() {
            let data = {
                courseName: this.courseName,
                studentName: this.studentName,
            }
            this.fenyeZongshu()
            teaScoreLuru(data, this.page).then((result) => {
                console.log(result);
                this.tableData = result.data
            }).catch((err) => {
                console.log(err);

            });
        },
        handlePageChange(newPage) {
            this.page = newPage;  // 更新当前页码
            this.gettable();     // 重新加载表格数据
        },
        fenyeZongshu() {
            let params = {
                courseName: this.courseName,
                studentName: this.studentName,
            }
            teaScoreLuruTotal(params).then((result) => {
                // console.log(result);
                this.totalpage = result.data * 10
            })
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