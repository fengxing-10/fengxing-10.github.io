<template>
    <div class="page-container"> <!-- 新增容器 -->
        <el-card class="box-card">
            <div class="table-wrapper"> <!-- 新增表格包裹层 -->
                <div class="text item">
                    <el-table :data="tableData">
                        <el-table-column label="课程名">
                            <template slot-scope="scope">
                                <span>{{ scope.row.courseName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="教师">
                            <template slot-scope="scope">
                                <span>{{ scope.row.teacherName }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="学分">
                            <template slot-scope="scope">
                                <span>{{ scope.row.credit }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="日常成绩">
                            <template slot-scope="scope">
                                <span>{{ scope.row.dailyScore }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="考试成绩">
                            <template slot-scope="scope">
                                <span>{{ scope.row.examScore }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="总成绩">
                            <template slot-scope="scope">
                                <span>{{ scope.row.score }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="update(scope.row.studentCourseId)">退选</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { stuCourse, stuCourseDel } from '@/api/student/stu';
export default {
    data() {
        return {
            tableData: [],
            courseName: '',
            teacherName: ''
        }
    },
    methods: {
        gettable() {
            stuCourse().then((result) => {
                console.log(result);
                this.tableData = result.data
            })
        },
        update(id) {
            stuCourseDel(id).then((result) => {
                if (result.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '退选成功!'
                        });
                        this.gettable()
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