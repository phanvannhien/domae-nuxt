<template>
    <div>
        <div class="text-center user-card">
            <el-avatar :size=120 
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar> <br/>
            <p>{{ this.$auth.user.full_name }}</p>
            <p style="color: #999">PUBLISHER</p> 
            <el-button type="success" round size="small"><i class="el-icon-check"></i> Đã kích hoạt</el-button>
        </div>
        <div class="user-link">
            <nuxt-link to="/auth/profile"><i class="el-icon-user"></i> Thông tin cá nhân</nuxt-link>
            <nuxt-link to="/auth/password"><i class="el-icon-key"></i> Đổi mật khẩu</nuxt-link>
        </div>
    </div>
    
</template>

<script>
export default {

}
</script>

<style scoped>
    .user-card p{
        margin-bottom: 10px;
    }
    .user-link{
        margin-top: 1rem;
    }
    .user-link a{
        display: block;
        color: #666;
        padding: 5px 0;
    }
</style>
