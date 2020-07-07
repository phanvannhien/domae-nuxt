<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/campaign' }">Thông tin cá nhân</el-breadcrumb-item>
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
                    <h4 style="margin: 1rem 0">Thông tin cá nhân</h4>
                   
                    <el-form :model="form" ref="form" :rules="rules" label-width="" label-position="top" 
                        @submit.prevent="login"
                        class="">

                        <el-alert
                            v-if="error"
                            title="error alert"
                            type="error">
                        </el-alert>
                        
                        <el-form-item
                            prop="full_name"
                            label="Họ và tên">
                                <span slot="label">
                                    Họ và tên <small style="color:red"> (Phải có khi thanh toán)</small>
                                </span>
                            
                            <el-input v-model="form.full_name"></el-input>
                        </el-form-item>


                        <el-form-item
                            prop="email"
                            label="Email">
                            <el-input disabled="" v-model="form.email"></el-input>
                        </el-form-item>

                        <el-form-item
                            prop="phone"
                            label="Số điện thoại">
                            <el-input disabled="" v-model="form.phone"></el-input>
                        </el-form-item>


                        <el-form-item
                            prop="dob"
                            label="Ngày sinh (yyyy-MM-dd)">
                                <el-date-picker
                                    v-model="form.dob"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="Chọn ngày"
                                    :picker-options="pickerOptions">
                                </el-date-picker>

                        </el-form-item>

                        
                        <el-form-item
                            prop="company"
                            label="Công ty ( Nếu có )">
                            <el-input v-model="form.company"></el-input>
                        </el-form-item>


                        <el-form-item
                            prop="cmnn"
                            label="Số CMNN">
                                <span slot="label">
                                    Số CMNN <small style="color:red"> (Phải có khi thanh toán)</small>
                                </span>
                            <el-input v-model="form.cmnn"></el-input>
                        </el-form-item>

                        <el-form-item
                            prop="date_cmnn"
                            label="Ngày cấp (yyyy-MM-dd)">
                                <span slot="label">
                                    Ngày cấp (yyyy-MM-dd)<small style="color:red"> (Phải có khi thanh toán)</small>
                                </span>
                                <el-date-picker
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    v-model="form.date_cmnn"
                                    type="date"
                                    placeholder="Chọn ngày"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                        </el-form-item>

                        <el-form-item
                            prop="place_cmnn"
                            label="Nơi cấp">
                                <span slot="label">
                                    Nơi cấp <small style="color:red"> (Phải có khi thanh toán)</small>
                                </span>
                            <el-input v-model="form.place_cmnn"></el-input>
                        </el-form-item>


                        <el-row :gutter=20>
                            <el-col :span=12>
                                <el-form-item
                                    prop="img_cmnd_1"
                                    label="">
                                        <span slot="label">
                                            Mặt trước <small style="color:red"> (Phải có khi thanh toán)</small>
                                        </span>
                                    <el-upload
                                        v-loading="loading"
                                        class="avatar-uploader"
                                        action="#"
                                        accept="image/*"
                                        name="file"
                                        data-filename="img_cmnd_1"
                                        :multiple=false
                                        :http-request="uploadFileFirst"
                                        :auto-upload=true
                                        :show-file-list="false"
                                        :before-upload="beforeAvatarUpload">
                                            <img v-if="form.img_cmnd_1 && form.img_cmnd_1 != ''" :src="form.img_cmnd_1" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                                
                                

                            </el-col>
                             <el-col :span=12>
                                <el-form-item
                                    prop="img_cmnd_2"
                                    label="">
                                        <span slot="label">
                                            Mặt sau <small style="color:red"> (Phải có khi thanh toán)</small>
                                        </span>
                                        <el-upload
                                            v-loading="loading"
                                            class="avatar-uploader"
                                            action="#"
                                            accept="image/*"
                                            name="file"
                                            :multiple=false
                                            :http-request="uploadFileLast"
                                            :auto-upload=true
                                            :show-file-list="false"
                                            :before-upload="beforeAvatarUpload">
                                                <img v-if="form.img_cmnd_2 && form.img_cmnd_2 != ''" :src="form.img_cmnd_2" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form')">Lưu lại</el-button>
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
            title: 'Thông tin cá nhân'
        }
    },

    data() {
       
    
        return {
            loading: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            error: '',
            form: {
                full_name: this.$auth.user.full_name,
                email: this.$auth.user.email ,
                phone:  this.$auth.user.phone ,
                dob:  this.$auth.user.dob ,
                company:  this.$auth.user.company ,
                cmnn: this.$auth.user.cmnn ,
                date_cmnn: this.$auth.user.date_cmnn ,
                place_cmnn: this.$auth.user.place_cmnn ,
                img_cmnd_1: this.$auth.user.img_cmnd_1 ,
                img_cmnd_2: this.$auth.user.img_cmnd_2 ,
            },
            rules: {

                full_name: [
                    { required: true, message: 'Vui lòng nhập Họ và tên', trigger: 'blur' },
                ],

                email: [
                    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
                    { type: 'email', message: 'Email không đúng', trigger: ['blur', 'change'] }
                ],
        
                phone: [
                    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
                ],

            }
        };
    },

    created() {

    },

    methods: {
        async submitForm (formName) {
            this.$refs[formName].validate( async (valid) => {
            if (valid) {
                this.$axios.post( `/auth/profile`, this.form )
                .then( res => { 
                    
                    this.$message({
                        message: 'Bạn đã cập nhật thành công.',
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

        
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || 'image/png' ;
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('Hình ảnh phải có định dạng jpg!');
            }
            if (!isLt2M) {
                this.$message.error('Hình ảnh không vượt quá 2MB!');
            }
            return isJPG && isLt2M;
        },

        uploadFileFirst( request ){
            this.loading = true;
    
            //Create new formData object
            const fd = new FormData();

            //append the file you want to upload
            fd.append("file", request.file );
        
            //add other data to the form data object if needed

            this.$axios.post( `/upload`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then( res => { 
                    this.loading = false;
                    this.form.img_cmnd_1 = res.data ;
        
                })
                .catch( e => {

                });
  
        },

        uploadFileLast( request ){
            this.loading = true;
    
            //Create new formData object
            const fd = new FormData();

            //append the file you want to upload
            fd.append("file", request.file );
        
            //add other data to the form data object if needed

            this.$axios.post( `/upload`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then( res => { 
                    this.loading = false;
                    this.form.img_cmnd_2 = res.data ;
                })
                .catch( e => {

                });
  
        }

    }
}
</script>

<style>

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 300px;
        height: 200px;
        line-height: 200px;
        text-align: center;
    }
    .avatar {
        width: 300px;
        height: 200px;
        display: block;
    }
</style>
