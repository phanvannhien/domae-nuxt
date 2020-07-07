<template>
    <div>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="8">
                <el-card class="box-card" style="background: #E6A23C">
                    <i class="el-icon-money"></i>
                    <div class="box-card-content">
                        <p>TẠM TÍNH</p>
                        <p class="box-number">{{ reportData.commission_pending }} đ</p>
                        <p style="margin-top: 10px;">Conversions</p>
                        <p class="box-number">{{ reportData.count_pending }}</p>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8">
                <el-card class="box-card" style="background: #00a65a">
                    <i class="el-icon-circle-check"></i>
                    <div class="box-card-content">
                        <p>ĐÃ DUYỆT</p>
                        <p class="box-number">{{ reportData.commission_approved }} đ</p>
                        <p style="margin-top: 10px;">Conversions</p>
                        <p class="box-number">{{ reportData.count_approved }}</p>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12" :lg="8">
                <el-card class="box-card" style="background: #F56C6C">
                    <i class="el-icon-circle-close"></i>
                    <div class="box-card-content">
                        <p>ĐÃ HUỶ</p>
                        <p class="box-number">{{ reportData.commission_rejected }} đ</p>
                        <p style="margin-top: 10px;">Conversions</p>
                        <p class="box-number">{{ reportData.count_rejected }}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>


    </div>
</template>

<script>

    export default {
        props: ['reportData'],
        components: {

        },
        data() {
            return {
                
            };
        },
        
        computed: {
          
        },

        created() {
      
        },

        mounted () {
    
        },

        methods: {
            
        },
    }
</script>

<style scoped>
    .box-card{
        border-radius: 20px;
        position: relative;
    }

    .box-card i{
        position: absolute;
        top: 10px; right: 10px;
        font-size: 3rem;
        color: rgba(0, 0, 0, 0.3)
    }

    .box-card-content{
        color: #FFF;
    }

    .box-number{
        font-size: 1.6rem;
        font-weight: 600;
    }
</style>
