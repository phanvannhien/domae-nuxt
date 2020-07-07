<template>
     
    <div>
         <el-card style="margin-bottom: 1rem">
            <el-row :gutter="20">
                <el-col :span="7" >
                    <p class="text-center">
                    <img
                        class="img-wrap-campaign"
                        :src="item.campaign_image"
                        />
                        </p>
                </el-col>
                <el-col :span="17">
                    <div style="height: 50px">
                        <strong>{{ item.campaign_name }}</strong>
                    </div>

                    <p style="margin-top: 10px;">

                        <el-button 
                            @click="dialogVisible = true"
                            v-if="item.is_registered"
                            class="el-button el-button--success el-button--mini" 
                            >
                            <i class="el-icon-paperclip"></i> Lấy link
                        </el-button>

                        <el-button v-else-if="!item.is_pending_registered" @click="registerCampaign( item.id )" type="danger" size="mini"> 
                            <i class="el-icon-plus"></i>
                            Đăng ký</el-button>

                        <el-button 
                            v-if="item.is_pending_registered"
                            class="el-button el-button--info el-button--mini">
                            <i class="el-icon-paperclip"></i> Chờ duyệt
                        </el-button>

                        <NuxtLink 
                            class="el-button el-button--primary el-button--mini" :to="`/campaign/${item.id}`">
                            <i class="el-icon-check"></i> Chi tiết
                        </NuxtLink>
                    </p>

                </el-col>
            </el-row>
            <hr class="sperate-c"/>
            <el-row :gutter="10">
                <el-col :span="12">
                    <span class="c-label">Loại:</span> <span class="c-value">{{ item.type }}</span><br/>
                    <span class="c-label">Hoa hồng:</span> <span class="c-value">{{ item.fixed_commission }} </span>
                </el-col>
                <el-col :span="12">
                    <span class="c-label">Cookie:</span> <span class="c-value">{{ item.cookie_time }}</span><br/>
                    <span class="c-label">Danh mục:</span> <span class="c-value">{{ item.category.name }} </span>
                </el-col>
            </el-row>
        
        </el-card>


        <el-dialog
            title="Lấy link"
            :visible.sync="dialogVisible"
            :close-on-click-modal=false
            :lock-scroll=false
            width="80%"
            >
            <el-form
                :model="form" 
                :rules="rules"
                ref="form" 
                class="" label-position="top">

                <el-form-item style="margin-bottom:0" label="Link chiến dịch" prop="">

                    <el-radio-group v-model="form.campaign_url">
                         <el-radio 
                            border
                            :label="url"
                            v-for="url in item.urls" 
                            @change="setCurrentUrl"
                            v-bind:key="url" >
                            {{ url }}
                        </el-radio>

                    </el-radio-group>

                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="THÔNG TIN THÊM" name="1">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Nguồn chiến dịch" prop="utm_source">
                                        <el-input @input="setURL()" size="medium" v-model="form.utm_source"></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Cách tiếp thị" prop="utm_medium">
                                        <el-input @input="setURL()" size="medium"  v-model="form.utm_medium"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <el-form-item label="Tên chiến dịch" prop="utm_campaign">
                                        <el-input @input="setURL()" size="medium"  v-model="form.utm_campaign"></el-input>
                                    </el-form-item>
                                </el-col>
                            
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Affiliate cấp 1" prop="aff_sub1">
                                        <el-input @input="setURL()" size="medium"  v-model="form.aff_sub1"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Affiliate cấp 2" prop="aff_sub2">
                                        <el-input @input="setURL()" v-model="form.aff_sub2"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        

                        
                        </el-collapse-item>
            
                    </el-collapse>
              

                </el-form-item>
            </el-form>
            <el-card shadow="never">

                <p style="color: #F56C6C; margin-bottom: 5px;">Link chiến dịch của bạn</p>
                <el-input placeholder="Please input" ref="urlcp" v-model="selectedUrl">
                    <template slot="append">
                        <el-button @click="copyText('urlcp')">
                            <i class="el-icon-copy-document"></i> Copy
                        </el-button>
                        <el-button @click="onSubmit()" type="success"><i class="el-icon-paperclip"></i> Lấy LINK RÚT GỌN</el-button>
                    </template>
                </el-input>

                <div v-if="shortUrl != ''" style="margin-top: 10px">
                    <p style="color: #F56C6C; margin-bottom: 5px;">Link rút gọn</p>
                    <el-input placeholder="" ref="shorturl" v-model="shortUrl" >
                        <template slot="append">
                            <el-button @click="copyText('shorturl')">
                                <i class="el-icon-copy-document"></i> Copy
                            </el-button>
                        </template>
                    </el-input>
                </div>
            </el-card>

            <el-card shadow="never" v-if="item.short_urls_created.length > 0 " style="margin-top: 20px">
                
                <p style="color: #000; margin-bottom: 10px; text-transform:uppercase">Link rút gọn đã tạo</p>
                <el-table
                    :data="item.short_urls_created"
                    stripe
                    style="width: 100%">
                        <el-table-column
                            prop="short_url"
                            label="Link rút gọn"
                            width="280">
                            <template slot-scope="scope">
                                <el-input placeholder="" :ref="'shorturl'+scope.$index" v-model="scope.row.short_url">
                                    <template slot="append">
                                        <el-button @click="copyText('shorturl'+scope.$index )">
                                            <i class="el-icon-copy-document"></i> Copy
                                        </el-button>
                                    </template>
                                </el-input>
                                
                               
                            </template>
                        
                        </el-table-column>
                        <el-table-column
                            prop="current_url"
                            label="Link đích"
                            width="">
                            <template slot-scope="scope">
                                <el-input placeholder="" :ref="'shorturl'+scope.$index+scope.$index" v-model="scope.row.current_url">
                                    <template slot="append">
                                        <el-button @click="copyText('shorturl'+scope.$index+scope.$index )">
                                            <i class="el-icon-copy-document"></i> Copy
                                        </el-button>
                                    </template>
                                </el-input>
                            </template>
                        </el-table-column>
                       
                </el-table>
                
            </el-card>



        </el-dialog>

    </div>
   

    
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            dialogVisible: false,
            rules: {
                campaign_url: [
                    { required: true, message: 'Vui lòng chọn link', trigger: ['blur', 'change'] },
                ],
            },
            form: {
                campaign_url: '',
                utm_source: '',
                utm_medium: '',
                utm_campaign: '',
                aff_sub1: '',
                aff_sub2: '',
            },
            activeNames: [],
            selectedUrl : '',
            shortUrl: ''
        }
       
    },

    created(){
        this.form.campaign_url = this.item.urls[0]
        this.selectedUrl = this.form.campaign_url
    },


    methods:{
        registerCampaign( id ){
            this.$axios.post( `/campaign/${ id }/register`)
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
        },

        onSubmit(formName){
           
            this.$axios.post( `/create-short-link`,{
                url: this.selectedUrl,
                campaign_id: this.item.id,
                utm_source: this.form.utm_source,
                utm_medium: this.form.utm_medium,
                utm_campaign: this.form.utm_campaign,
                aff_sub1: this.form.aff_sub1,
                aff_sub2: this.form.aff_sub2
            })
            .then( res => {
                if( res.data.success ){
                    this.shortUrl = res.data.url
                }

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

             
        },

        setURL(){
            let parmsObj = {};
            if( this.form.utm_source != '' ){
                parmsObj.utm_source = this.form.utm_source
            }
            if( this.form.utm_medium != '' ){
                parmsObj.utm_medium = this.form.utm_medium
            }
            if( this.form.utm_campaign != '' ){
                parmsObj.utm_campaign = this.form.utm_campaign
            }
            if( this.form.aff_sub1 != '' ){
                parmsObj.aff_sub1 = this.form.aff_sub1
            }
            if( this.form.aff_sub2 != '' ){
                parmsObj.aff_sub2 = this.form.aff_sub2
            }
            const params = new URLSearchParams(parmsObj);
            this.selectedUrl = `${this.form.campaign_url}&${params}`

      
        },

        setCurrentUrl( url ){
             this.selectedUrl = url
        },

        copyText( element ) {
            var copyText = this.$refs[ element ];
            copyText.select();
            document.execCommand("copy");
            this.$message({
                message: 'Đã copy.',
                type: 'success'
            });
      
        }
    }
}
</script>
<style scoped lang="scss">

    .img-wrap-campaign{
        max-height: 60px;
        width: auto;
        max-width: 100%;
        height: auto;
    }
    .sperate-c{
        border: 0;
        border-top: 1px solid #e5e5e5;
        margin: 10px 0;
    }
    .c-label{
        display: inline-block;
        width:80px;
        font-size: 13px;
    }
    .c-value{
        font-size: 13px;
        font-weight: 500;
        color: #333;
    }
    .el-radio.is-bordered+.el-radio.is-bordered{
        margin-left: 0;
    }

    .el-radio{
        margin-right: 0;
    }
</style>

