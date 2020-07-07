<template>
  
  <el-card>
    <h3>Quên mật khẩu</h3>
    <el-divider></el-divider>
    <el-form :model="form" ref="form" :rules="rules" label-width="" label-position="top" 
      @submit.prevent="login"
      class="">

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

      
      <el-form-item align="center">
        <el-button type="primary" @click="submitForm('form')">Gửi</el-button>
      </el-form-item>

      <el-form-item align="center">
        Quay lại? <nuxt-link to="/login">Đăng nhập</nuxt-link>
      </el-form-item>
      
    </el-form>
  </el-card>

</template>

<script>
export default {
    layout: 'auth',
    head(){
        return {
            title: 'Quên mật khẩu'
        }
    },

    data() {
      return {
        error: '',
        form: {
          email: ''
        },
        rules: {
          email: [
            { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
            { type: 'email', message: 'Email không đúng', trigger: ['blur', 'change'] }
          ],
       
        }
      };
    },

    methods: {
      async submitForm (formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
            this.$axios.post( `/forgot`, this.form )
              .then( res => { 
                 
                this.$message({
                    message: 'Bạn đã yêu cầu quên mật khẩu thành công. Bạn vui lòng check email để tiếp tục',
                    type: 'success'
                });

                this.$router.push('/login');

              })
              .catch( e => {

                 let message = ''
                 _.map( e.response.data.errors, ( item ) => {
                   message += item + '<br/>'
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
