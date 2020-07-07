<template>
    <div class="centered-content">
        <el-container>
            <el-alert
                :closable=false
                show-icon
                title="Trang không tìm thấy."
                type="info">
            </el-alert>
        </el-container>
    </div>
</template>
<script>
export default {
    layout: 'none'
}
</script>
<style scoped>
    .el-container{
        max-width: 320px;
    }
    .centered-content{
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
