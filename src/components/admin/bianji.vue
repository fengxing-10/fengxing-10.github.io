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
export default{
    
}
</script>