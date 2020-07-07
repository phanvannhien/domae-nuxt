<template>
    <el-card>
        <h3>Thay đổi mật khẩu</h3>
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

        <el-form-item
            prop="password"
            label="Mật khẩu">
            <el-input 
                type="password"
                autocomplete="off"
                v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item
            prop="password_confirmation"
            label="Nhắc lại mật khẩu">
            <el-input 
                type="password"
                autocomplete="off"
                v-model="form.password_confirmation"></el-input>
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
            title: 'Thay đổi mật khẩu'
        }
    },

    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng nhập mật khẩu'));
            } else {
                if (this.form.password_confirmation !== '') {
                    this.$refs.form.validateField('password_confirmation');
                }
                callback();
            }
        };

        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng nhập Nhắc lại mật khẩu'));
            } else if (value !== this.form.password) {
                callback(new Error('Mật khẩu không trùng khớp'));
            } else {
                callback();
            }
        };
        
        return {
            error: '',
            form: {
                email: '',
                password: '',
                password_confirmation: '',
            },
            rules: {

                email: [
                    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
                    { type: 'email', message: 'Email không đúng', trigger: ['blur', 'change'] }
                ],
        
                password: [
                    { validator:  validatePass , trigger: 'blur' },
                ],

                password_confirmation: [
                    { validator:  validatePass2 , trigger: 'blur' },
                ],
        
            }
        };
    },

    methods: {
        async submitForm (formName) {
            this.$refs[formName].validate( async (valid) => {
            if (valid) {
                this.$axios.post( `/forgot/change-password`, {
                    token: this.$route.query.token,
                    email: this.form.email,
                    password: this.form.password,
                    password_confirmation: this.form.password_confirmation,

                })
                .then( res => { 
                    
                    this.$message({
                        message: 'Bạn đã thay đổi mật khẩu thành công.',
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

<style>

</style>
