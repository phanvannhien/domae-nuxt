<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item>Ngân hàng của tôi</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-alert
            style="margin-bottom: 1rem"
                :closable=false
                show-icon
                title="*Lưu ý: Thông tin ngân hàng phải chính xác. Ulu sẽ thanh toán cho bạn qua thông tin tài khoản ngân hàng"
                type="warning">
        </el-alert>


        <el-row v-if="payloads.length > 0" :gutter="20">
            <el-col  :xs="24" :sm="8" v-for="item in payloads" :key="item.id">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{ item.bank_name }}</span>
                        <span style="float: right; padding: 3px 0">
                            <nuxt-link :to="`/affiliate/banks/${item.id}/edit`" >
                                <i class="el-icon-edit"></i>
                                Sửa</nuxt-link>
                                
                            <span @click="removeBank( item.id )">
                                <i class="el-icon-delete"></i> Xoá
                            </span>     
                        </span>
                       
                    </div>
                    
                
                 
                     <el-row :gutter="5" type="flex" justify="space-between">
                        <el-col :span="12">Tên tài khoản:</el-col>
                        <el-col align="right" :span="12">{{ item.bank_full_name }}</el-col>
                       
                    </el-row>
                     <el-row :gutter="5" type="flex" justify="space-between">
                        <el-col :span="12">Số tài khoản:</el-col>
                        <el-col align="right" :span="12">
                            <el-tag size="small">{{ item.bank_acc_number }}</el-tag>
                        </el-col>
                       
                    </el-row>
                     <el-row :gutter="5" type="flex" justify="space-between">
                        <el-col :span="12">Chi nhánh:</el-col>
                        <el-col align="right" :span="12">{{ item.bank_location }}</el-col>
                       
                    </el-row>
       
                </el-card>
            </el-col>
        </el-row>

         <el-alert v-else
            title=""
            :closable=false
            effect="dark"
            type="success"
            show-icon>
            <span slot="title">
                Bạn chưa thiết lập ngân hàng, <nuxt-link to="/affiliate/banks/add">Thêm ngay</nuxt-link>
            </span>
        </el-alert>
       
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
    async asyncData ({ $axios, req, res }) {

        return $axios.get(`/affiliate/banks`)
            .then((res) => {
                return { payloads: res.data.payloads }
            }).catch(e => {
      
            })

    },
   
    data() {
        return {
               
        }
    },
    methods: {
   
        removeBank( id ){
            this.$confirm('Bạn chắc chắn muốn xoá?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Huỷ',
                type: 'warning'
            }).then(() => {
                this.$axios.delete( `/affiliate/banks/${ id }` )
                    .then( res => { 
                        console.log(this.payloads)
                        this.payloads = _.remove( this.payloads, i => {
                            return i.id == id
                        })
                        this.$message({
                            message: 'Congrats, Xoá thành công',
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
            }).catch(() => {
                   
            });
        }
    },
}
</script>
<style>

</style>
