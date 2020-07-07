<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/affiliate/banks' }">Ngân hàng</el-breadcrumb-item>
            <el-breadcrumb-item>Thêm mới</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

      
       <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
                <el-card class="box-card">
                    <el-form :model="form" ref="form" :rules="rules" label-width="" label-position="top" 
                        @submit.prevent="login"
                        class="form-login">


                        <el-form-item
                            prop="bank_name"
                            label="Tên Ngân hàng">
                            <el-input v-model="form.bank_name"></el-input>
                        </el-form-item>

                        <el-form-item
                            prop="bank_full_name"
                            label="Tên tài khoản">
                            <el-input v-model="form.bank_full_name"></el-input>
                        </el-form-item>

                        <el-form-item
                            prop="bank_acc_number"
                            label="Số tài khoản">
                            <el-input v-model="form.bank_acc_number"></el-input>
                        </el-form-item>

                        <el-form-item
                            prop="bank_location"
                            label="Chi nhánh">
                            <el-input v-model="form.bank_location"></el-input>
                        </el-form-item>
                  
                        <el-form-item align="right">
                            <el-button type="primary" @click="submitForm('form')">Lưu</el-button>
                        </el-form-item>
                        


                    </el-form>
                </el-card>
            </el-col>
        </el-row>


    </div>
</template>
<script>
export default {
    head(){
        return {
            title: 'Ngân hàng'
        }
    },
    layout: 'default',
    components: {
        
    },
    middleware: ['auth'],

    data() {
        return {
            form: {
                bank_name: '',
                bank_acc_number: '',
                bank_full_name: '',
                bank_location: '',
            },
             rules: {
                bank_name: [
                    { required: true, message: 'Vui lòng nhập Tên Ngân hàng', trigger: 'blur' },
                ],
                bank_acc_number: [
                    { required: true, message: 'Vui lòng nhập Số tài khoản', trigger: 'blur' },
                ],
                bank_full_name: [
                    { required: true, message: 'Vui lòng nhập Tên tài khoản', trigger: 'blur' },
                ],
                bank_location: [
                    { required: true, message: 'Vui lòng nhập Chi nhánh', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        async submitForm (formName) {
            this.$refs[formName].validate( async (valid) => {
            if (valid) {
                this.$axios.post( `/affiliate/banks/create`, this.form )
                    .then( res => { 
                        
                        this.$message({
                            message: 'Congrats, Bạn đã đăng ký thành công. Vui lòng đăng nhập',
                            type: 'success'
                        });

                        this.$router.push('/affiliate/banks');

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
    },
}
</script>
<style>

</style>
