<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/campaign' }">Đổi mật khẩu</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>  
        

        <el-row :gutter=20>
            <el-col :span=8>
                <el-card>
                    <UserCard />
                </el-card>
            </el-col>
            <el-col :span=16>
                <el-card>
                    <h4 style="margin: 1rem 0">Thay đổi mật khẩu</h4>
                   
                    <el-form :model="form" ref="form" 
                        :rules="rules" 
                        label-width="" 
                        label-position="top" 
                       
                        class="">

                            <el-alert
                                v-if="error"
                                title="error alert"
                                type="error">
                            </el-alert>
                            
                            <el-form-item
                               
                                prop="old_password"
                                label="Mật khẩu cũ">
                                <el-input 
                                    v-model="form.old_password"
                                    type="password"
                                    show-password
                                    ></el-input>
                            </el-form-item>

                            <el-form-item
                                prop="password"
                                type="password"
                                show-password
                                label="Mật khẩu mới">
                                <el-input 
                                    type="password"
                                    show-password
                                    autocomplete="off"
                                    v-model="form.password"></el-input>
                            </el-form-item>

                            <el-form-item
                                prop="password_confirmation"
                                label="Nhắc lại mật khẩu mới">
                                <el-input 
                                     type="password"
                                    show-password
                                    autocomplete="off"
                                    v-model="form.password_confirmation"></el-input>
                            </el-form-item>

                            
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('form')">Xác nhận</el-button>
                            </el-form-item>
                    
                    </el-form>
                </el-card>
            </el-col>
        </el-row>

    
        
    </div>
   
</template>

<script>
import UserCard from '~/components/auth/UserCard'
export default {
    layout: 'default',
    components: {
        UserCard
    },

    head(){
        return {
            title: 'Đổi mật khẩu'
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
                old_password: '',
                password: '',
                password_confirmation: '',
            },
            rules: {

                old_password: [
                    { required: true, message: 'Vui lòng nhập mật khẩu hiện tại', trigger: 'blur' },
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
                this.$axios.post( `/auth/password`, {
                    old_password: this.form.old_password,
                    password: this.form.password,
                    password_confirmation: this.form.password_confirmation,

                })
                .then( res => { 
                    
                    this.$message({
                        message: 'Bạn đã thay đổi mật khẩu thành công.',
                        type: 'success'
                    });

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
