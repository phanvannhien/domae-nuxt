<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/campaign' }">Chiến dịch</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <p class="text-center">
                        <el-image
                            class="img-wrap"
                            style="margin-bottom: 1rem"
                            :src="payloads.campaign_image"
                            ></el-image>
                    </p>
                    <strong>{{ payloads.campaign_name }}</strong> / {{ payloads.category.name }} <br/>
                    <span>Loại:</span> <strong>{{ payloads.type }}</strong> <br/>
                    <span>Cookie:</span> <strong>{{ payloads.cookie_time }}</strong> <br/>

                    <p>
                        <span >Chiết khấu:</span>
                        <strong>{{ payloads.fixed_commission }}</strong>
    
                    </p>
                    
                
                    
                </el-card>
            </el-col>

            <el-col :span="16">

                <el-card class="box-create-link">
                    <h3>Chi tiết</h3>
                    <el-divider></el-divider>
                    <div class="content-html" v-html="payloads.description"></div>
                </el-card>

                <el-card class="box-create-link">
                    <h3>Điều kiện chấp nhận đơn hàng</h3>
                    <el-divider></el-divider>
                    <div class="content-html" v-html="payloads.accept_condition"></div>
                </el-card>

                <el-card class="box-create-link">
                    <h3>Điều kiện từ chối đơn hàng</h3>
                    <el-divider></el-divider>
                    <div class="content-html" v-html="payloads.reject_condition"></div>
                </el-card>

                <el-card class="box-create-link">
                    <h3>Chính sách trả thưởng hoa hồng</h3>
                    <el-divider></el-divider>
                    <div class="content-html" v-html="payloads.comission_policy"></div>
                </el-card>

                <el-card class="box-create-link">
                    <h3>Chính sách cookie</h3>
                    <el-divider></el-divider>
                    <div class="content-html" v-html="payloads.cookie_policy"></div>
                </el-card>

                <el-card class="box-create-link">
                    <h3>Quy định về cách chạy quảng cáo</h3>
                    <el-divider></el-divider>
                    <div class="content-html" v-html="payloads.ads_condition"></div>
                </el-card>

                
                <!-- <el-card class="box-create-link">
                    <h4>Lấy link</h4>
                    <el-divider></el-divider>

                    <el-alert
                        title="Thông báo"
                        type="error"
                        style="margin-bottom: 1rem"
                        description=""
                        v-if="errors.length"
                        >
                        <slot name="description">
                            <span v-for="err in errors" :key="err">{{ err }}</span>
                        </slot>
                        
                    </el-alert>


                    <el-form style="margin-bottom: 2rem" :model="form" :rules="rules" ref="form" class="" label-position="top">

                        <el-form-item label="Link chiến dịch" prop="campaign_url">
                            
                            

                                <div v-if="payloads.affiliates && payloads.affiliates.length > 0 && payloads.affiliates[0].pivot.campaign_url " >
                                    
                                    <el-radio 
                                        v-model="form.campaign_url"
                                        :key="payloads.affiliates[0].pivot.campaign_url" 
                                        :label="payloads.affiliates[0].pivot.campaign_url">
                                        {{ payloads.affiliates[0].pivot.campaign_url }}
                                    </el-radio>
                                       
                                </div>

                                <el-radio-group v-else v-model="form.campaign_url">
                                    <el-radio v-for="link in payloads.urls" 
                                        :key="link.url" 
                                        :label="link.url">
                                        {{ link.url }}
                                    </el-radio>
                                    <br/>


                                </el-radio-group>

                        </el-form-item>

                        

                        <el-collapse v-model="activeNames">
                            <el-collapse-item title="THÔNG TIN THÊM" name="1">
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item label="Nguồn chiến dịch" prop="utm_source">
                                            <el-input size="medium" v-model="form.utm_source"></el-input>
                                        </el-form-item>

                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="Cách tiếp thị" prop="utm_medium">
                                            <el-input  size="medium"  v-model="form.utm_medium"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item label="Tên chiến dịch" prop="utm_campaign">
                                            <el-input  size="medium"  v-model="form.utm_campaign"></el-input>
                                        </el-form-item>
                                    </el-col>
                                
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item label="Affiliate cấp 1" prop="aff_sub1">
                                            <el-input  size="medium"  v-model="form.aff_sub1"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="Affiliate cấp 2" prop="aff_sub2">
                                            <el-input  v-model="form.aff_sub2"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            

                            
                            </el-collapse-item>
                
                        </el-collapse>

                        <el-form-item size="large">
                            <el-button v-if="payloads.affiliates && payloads.affiliates.length > 0 && payloads.affiliates[0].pivot.status == 1 " type="primary" @click="onSubmit('form')">Nhận link</el-button>

                            <el-button v-else-if="payloads.affiliates && payloads.affiliates.length > 0 && payloads.affiliates[0].pivot.status == 0" type="info" > 
                                <i class="el-icon-close"></i> Đang chờ duyệt</el-button>
                                
                            <el-button v-else @click="registerCampaign( payloads.id )" type="success" > 
                                <i class="el-icon-add"></i>
                                Đăng ký</el-button>




                        </el-form-item>
                        <el-alert
                            v-if="link!=''"
                            title=""
                            :closable=false
                            type="success">
                            <span slot="title">{{ link }}</span>
                        </el-alert>
                      
                    </el-form>

                    

                </el-card> -->

            </el-col>
            
        </el-row>

        <!-- <el-card class="box-create-link">
           <Shortener v-bind:id="payloads.id" />
        </el-card> -->

       
      

        

    </div>
</template>

<script>
import Shortener from '~/components/affiliate/Shortener'
export default {
    components: {
        Shortener
    },
    async asyncData({ params, $axios }) {

        const res = await $axios.get('/campaign/' + params.id );
        return { 
            payloads: res.data.payloads , 
            title:  res.data.payloads.campaign_name,
            form: {
                campaign_url: _.has( res.data.payloads, 'affiliates[0].pivot.campaign_url' ) 
                    && res.data.payloads.affiliates[0].pivot.campaign_url 
                    ? res.data.payloads.affiliates[0].pivot.campaign_url 
                    : res.data.payloads.urls[0].url
            }
        }
        
        // await $axios.get('/campaign/' + params.id )
        //     .then((res) => {
                
        //         return { 
        //             payloads: res.data.payloads , 
        //             title:  res.data.payloads.campaign_name,
        //             form: {
        //                 campaign_url: _.has( res.data.payloads, 'affiliates[0].pivot.campaign_url' ) 
        //                     && res.data.payloads.affiliates[0].pivot.campaign_url 
        //                     ? res.data.payloads.affiliates[0].pivot.campaign_url 
        //                     : res.data.payloads.urls[0].url
        //             }
        //         }
                
        //     }).catch(e => {
                
        //     })
    },
    head () {
        return {
            title: this.title,
        }
    },
    data() {
        return {
            payloads: {
                affiliates: [],
                merchant: {}
            },
            form: {
                campaign_url: '',
                utm_source: '',
                utm_medium: '',
                utm_campaign: '',
                aff_sub1: '',
                aff_sub2: '',
            },
            rules: {

            },
            errors: [],
            activeNames: [],
            link: ''
        }
    },
    watch: {

    },
    methods: {
        onSubmit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post( `/campaign/${ this.payloads.id }/get-link`, this.form )
                    .then( res => {

                        this.link = res.data.url
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
        },

        registerCampaign( id ){
            this.$axios.post( `/campaign/${ this.payloads.id }/register`)
                .then( res => {
                    
                    this.$message({
                        message: 'Congrats, Bạn đã đăng ký thành công.',
                        type: 'success'
                    });
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
        }

    },
}
</script>

<style lang="scss">
    .box-create-link{
        margin-bottom: 2rem;
    }
    .el-radio-group{
        display: block;
    }
    .el-radio{
        display: block;
        margin-bottom: 5px;
    }
    .el-collapse{
        border: none;
        margin-bottom: 20px;
    }
    .img-wrap img{
        max-width: 200px;
        width: auto;
        height: auto;
    }
</style>


