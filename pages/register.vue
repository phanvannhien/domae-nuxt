<template>

    <el-card >
      <h3>Đăng ký</h3>
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
            prop="full_name"
            label="Họ tên của bạn">
            <el-input v-model="form.full_name"></el-input>
        </el-form-item>
          
        <el-form-item
          prop="email"
          label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

          <el-form-item
            prop="phone"
            label="Số điện thoại">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="password">
          <el-input type="password" v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <p style="font-size: 0.8rem; color: #666; margin-bottom: 1rem">
          Khi đăng ký tài khoản là bạn đã đồng ý với chính sách bảo mật, 
          điều khoản của Ulu và nhận tài liệu hướng dẫn qua Messenger.
        </p>
        <el-form-item align="center">
          <el-button type="primary" @click="submitRegister('form')">Đăng ký</el-button>
        </el-form-item>

        <el-form-item align="center">
          Bạn đã có tài khoản? <nuxt-link class="register-link" to="/login">Đăng nhập</nuxt-link>
        </el-form-item>

      </el-form>
    </el-card>


</template>

<script>
export default {
    head(){
        return {
            title: 'Đăng ký'
        }
    },
    layout: 'auth',
    data() {
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Vui lòng nhập số điện thoại'));
        } else {
          var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
          if (vnf_regex.test(value) == false) {
            callback(new Error('Số điện thoại không đúng'));
          }else{
             callback();
          }

        }
      };

      return {
        error: '',
        form: {
          full_name: '',
          email: '',
          password: '',
          phone: ''
        },
        rules: {

          full_name: [
            { required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
            { type: 'email', message: 'Email không đúng', trigger: ['blur', 'change'] }
          ],
          password: [
            { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
          ],
          phone: [
            { validator: validatePhone , trigger: 'blur' },
            
          ],
        }
      };
    },
    methods: {
      async submitRegister (formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {

            this.$axios.post( `/register`, this.form )
              .then( res => { 
                 
                this.$message({
                    message: 'Congrats, Bạn đã đăng ký thành công. Vui lòng đăng nhập',
                    type: 'success'
                });

                this.$router.push('/login');

              })
              .catch( e => {
                 let message = ''
                 _.map( e.response.data.message, ( item ) => {
                   message += item[0] + '<br/>'
                 })
                 this.$message({
                      dangerouslyUseHTMLString: true,
                      message: message,
                      type: 'error'
                  });
              });
              
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

