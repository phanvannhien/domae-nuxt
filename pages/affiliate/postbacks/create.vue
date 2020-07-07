<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/affiliate/postbacks' }">Postbacks</el-breadcrumb-item>
            <el-breadcrumb-item>Thêm</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-card>
            <el-form ref="form" :rules="rules" :model="form" label-position="top" label-width="100%">
                <el-row :gutter="20">
                <el-col :sm="24" :md="12">
                    <el-form-item label="URL" >
                        <el-input size="medium" placeholder="URL" v-model="form.postback_url"></el-input>
                        <p><small>Ex: http://your-website.com?cp={campaign_id}&com={commission}&at={lead_created_at}</small></p>
                    </el-form-item>

                    <el-form-item top label="Conversion status" >
                       <el-select v-model="form.conversion_status" 
                        placeholder="Select" size="medium">
                            <el-option
                                v-for="item in conversion_status"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Request method" >
                       <el-select v-model="form.request_method" 
                        placeholder="Select" size="medium">
                            <el-option
                                v-for="item in methods"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                
                    <el-form-item  label="" >
                        <el-radio v-model="form.is_active_postback" label="1">Enable</el-radio>
                        <el-radio v-model="form.is_active_postback" label="0">Disable</el-radio>
                    </el-form-item>
                        
                    <el-form-item label="Select params">
                        <el-checkbox-group v-model="form.params">
                            <el-checkbox checked disabled style="width: 200px" :label="item.param" v-for="item in tableData" :key="item.param"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                   
                     <el-form-item style="margin-top: 1rem">
                        <el-button size="medium" type="primary" @click="onSubmit('form')">LƯU</el-button>
                    </el-form-item>
                    
                </el-col>
                <el-col :sm="24" :md="12">
                    <h3>Params description</h3>
                  
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">

                            <el-table-column
                            prop="param"
                            label="Param"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="description"
                            label="Mô tả"
                           
                            >
                            </el-table-column>
                           
                    </el-table>
                </el-col>
            </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [
                {
                    param: 'lead_id',
                    description: 'Lead ID'
                },
                {
                    param: 'campaign_id',
                    description: 'ID chiến dịch'
                },
                {
                    param: 'quantity',
                    description: 'Số lượng đặt hàng'
                },
                {
                    param: 'commission',
                    description: 'Hoa hồng'
                },
                {
                    param: 'lead_created_at',
                    description: 'Ngày phát sinh LEAD'
                },
                {
                    param: 'browser',
                    description: 'Trình duyệt'
                },
                {
                    param: 'device',
                    description: 'Thiết bị'
                },
                {
                    param: 'flatform',
                    description: 'Nền tảng'
                },
                {
                    param: 'is_desktop',
                    description: 'Là desktop'
                },
                {
                    param: 'is_phone',
                    description: 'Là điện thoại'
                },
                {
                    param: 'click_time',
                    description: 'Thời gian phát sinh click'
                },
                
                {
                    param: 'status',
                    description: `Status của đơn hàng gồm 3 giá trị: pending, approved, rejected`
                },
                
                {
                    param: 'reject_reason',
                    description: 'Lí do từ chối'
                },

                {
                    param: 'utm_source',
                    description: 'Thông tin tùy biến pub truyền vào url trong param utm_source'
                },

                {
                    param: 'utm_medium',
                    description: 'Thông tin tùy biến pub truyền vào url trong param utm_medium'
                },
                {
                    param: 'utm_campaign',
                    description: 'Thông tin tùy biến pub truyền vào url trong param utm_campaign'
                },
                {
                    param: 'aff_sub1',
                    description: 'Thông tin tùy biến pub truyền vào url trong param aff_sub1'
                },
                {
                    param: 'aff_sub2',
                    description: 'Thông tin tùy biến pub truyền vào url trong param aff_sub2'
                },


            ],
            conversion_status: [
                {
                    value: 'all',
                    label: 'Tất cả'
                },
                {
                    value: 'new',
                    label: 'new (Mới)'
                },
                {
                    value: 'update',
                    label: 'update (Cập nhật)'
                },
            ],
            methods: [
                {
                    value: 'GET',
                    label: 'GET'
                },
                {
                    value: 'POST',
                    label: 'POST'
                },
            ],
            
            form: {
                postback_url: '',
                conversion_status: 'new',
                request_method: 'GET',
                params: [],
                is_active_postback: "1",
                
            },
            rules: {
                postback_url : [
                    { required: true, message: 'Vui lòng nhập URL', trigger: 'blur' },
                ]
            }
            
        }
    },
    methods: {
        onSubmit(formName){
            this.$refs[formName].validate( async (valid) => {
                if (valid) {

                    this.$axios.post( `/postbacks`, this.form )
                        .then( res => { 
                            

                            this.$message({
                                message: 'Congrats, Bạn đã tạo thành công',
                                type: 'success'
                            });

                            this.$router.push('/affiliate/postbacks');
                        
                        })
                        .catch( e => {
                            let message = ''
                            _.map( e.response.data.errors, ( item ) => {
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

<style lang="scss" scoped>
    .el-select{
        width: 100%;
    }
    .el-form-item__label{
        float: none !important;
    }

    

</style>
