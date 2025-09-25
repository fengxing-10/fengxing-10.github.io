<template>
    <div class="page-container"> <!-- 新增容器 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div style="display: flex;width: 400px;">
                    <el-input v-model="courseName" placeholder="课程名"></el-input>
                    <el-input v-model="teacherName" placeholder="教师"></el-input>
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
                        <el-table-column label="上课时间">
                            <template slot-scope="scope">
                                <span>{{ scope.row.time }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="已选人数">
                            <template slot-scope="scope">
                                <span>{{ scope.row.selectedCount }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="课程容量">
                            <template slot-scope="scope">
                                <span>{{ scope.row.maxSize }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" @click="update(scope.row.courseId)">选课</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { stuSelectCourse, stuUpdateCourse } from '@/api/student/stu';
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
            let data= {
                courseName:this.courseName,
                teacherName:this.teacherName
            }
            stuSelectCourse(data).then((result) => {
                console.log(result);
                this.tableData = result.data
            })
        },
        update(id) {
            stuUpdateCourse(id).then((result) => {
                if (result.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
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