<template>
    <el-header height="70px">
        <el-container>
            <el-row class="header-wrap">
                <el-col :md="6">
                     <div id="logo-wrap">
                        <el-image
                        style="width: 150px; height: auto"
                        src="/logo.png"
                        fit="cover"></el-image>
                    </div>
                </el-col>
                <el-col :md="12">
                    <el-form :inline="true" :model="form" class="demo-form-inline">
                        <el-input
                            placeholder="Tìm tên sản phẩm trên tiki, shopee, lazada ... giá tốt nhất"
                            suffix-icon="el-icon-search"
                            v-model="form.keywords">
                        </el-input>
                        
                    </el-form>
                </el-col>
                <el-col class="user-nav-wrap" :md="6">
                   
                    <el-button 
                        v-if="!this.$store.state.auth.loggedIn"
                        size="medium" type="warning" 
                        icon="el-icon-user">
                            <nuxt-link class="l-login" to="/auth/login">Đăng nhập</nuxt-link>
                        </el-button>
                
                    
                    <el-button 
                        v-if="!this.$store.state.auth.loggedIn"
                        size="medium" type="success" icon="el-icon-connection">
                            <nuxt-link class="l-reg" to="/auth/login">Đăng ký</nuxt-link></el-button>
                   
                    
                    <el-dropdown v-if="this.$store.state.auth.loggedIn" class="user-nav" @command="handleCommand">
                        <span>
                            <i class="el-icon-setting" style="margin-right: 15px"></i> 
                        
                        </span>

                        <el-dropdown-menu slot="dropdown">
                            
                            <el-dropdown-item>
                                <nuxt-link to="/auth/profile"><i class="el-icon-user"></i> Hồ sơ của bạn</nuxt-link>
                            </el-dropdown-item>
                            <el-dropdown-item command="logout"><i class="el-icon-switch-button"></i> Đăng xuất</el-dropdown-item>
                        </el-dropdown-menu>

                    </el-dropdown>
                </el-col>
            </el-row>
           
            
            
        </el-container>
        
      </el-header>
</template>

<script>
export default {
    data(){
        return {
            form: {
                keywords: ''
            }
        }
    },
    methods: {
        async handleCommand( command ) {
            if( command == 'logout'){

                await this.$auth.logout();
                return this.$router.push('/login')
            }
           

        },
    },
}
</script>

<style lang="scss" scoped>

    .el-header{
        background: #FFF;
        border-bottom: 1px solid #e5e5e5;
        align-items: center;
        justify-content: flex-end;
        display: flex;
    }
    .header-wrap{
        display: flex;
        align-items: center;
    }
    .user-nav{
        margin-left: auto;
        justify-self: flex-end;
    }

    .l-reg{
        color: #FFF;
    }
    .l-login{
        // color: #66c23a !important;
        // &:hover{ color: #FFF !important; }
    }
    .user-nav-wrap{
        text-align: right;
    }

</style>

