<template>
    <el-card>
      <h3>Đăng nhập</h3>
      <el-divider></el-divider>
      <el-form :model="form" ref="form" :rules="rules" label-width="" label-position="top" 
        @submit.prevent="login"
        class="form-login">

        <el-alert
          v-if="error"
          title="error alert"
          type="error">
        </el-alert>
      
        <el-form-item
          prop="email"
          label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="password">
          <span slot="label">
           
                Mật khẩu
 
          </span>
          <el-input type="password" v-model="form.password" autocomplete="off" show-password></el-input>
          
        </el-form-item>

        <el-form-item align="center">
          <el-button type="primary" @click="submitLogin('form')">Đăng nhập</el-button>
        </el-form-item>

        
        
        <el-form-item align="center">
          <nuxt-link to="/forgot">Quên mật khẩu?</nuxt-link> <br/>
          Bạn chưa có tài khoản? 
          <nuxt-link class="register-link" to="/register">Đăng ký ngay</nuxt-link>
        </el-form-item>


      </el-form>
    </el-card>


</template>

<script>
export default {
    head(){
        return {
            title: 'Đăng nhập'
        }
    },
    layout: 'auth',
    data() {
      return {
        error: '',
        form: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
            { type: 'email', message: 'Email không đúng', trigger: ['blur', 'change'] }
          ],
          password: [
            { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
          ]
        }
      };
    },
    methods: {
      async submitLogin (formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
              try {
                await this.$auth.loginWith('local', {
                  data: {
                      email: this.form.email,
                      password: this.form.password
                  }
                })
                this.$router.push('/')
              } catch (e) { 
                let message = ''
                    
                _.map( e.response.data.errors, ( item ) => {
                    message += item + '<br/>'
                })
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message: message,
                    type: 'error'
                });

              }
          } else {
            
            return false;
          }
        });

        
      }
 
    }
  }
</script>

<style scoped lang="scss">

  .register-link{
    text-transform: uppercase;
    color: red;
  }



</style>
