<template>
    <div class="main-wrap">
        <el-container>
            <el-row>
                <el-col :span="24">

                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
                        <el-breadcrumb-item>Mã khuyến mãi</el-breadcrumb-item>
                    </el-breadcrumb>

                    <el-row :gutter="0" class="align-items-stretch">
                        <el-col :span="12"  v-for="item in coupons" :key="item.id" >
                            
                            <el-card class="c-item">
                                <el-row :gutter="20" class="align-items-center">
                                    <el-col :span="6">
                                        <el-image
                                            lazy
                                            style="width: 100%; height: auto"
                                            :src="item.image"
                                            
                                            ></el-image>
                                    </el-col>

                                    <el-col :span="18" class="align-self-top">
                                        <div class="c-item-content">
                                            <p class="c-i-site">{{ item.domain }}</p>
                                            <p class="c-i-name">{{ item.name }}</p>
                                            <p class="c-i-date">
                                                <i class="el-icon-time"></i> Bắt đầu {{ item.start_time  }}
                                                <i class="el-icon-time"></i> Kết thúc {{ item.end_time  }}
                                            </p>
                                            <!-- <p class="c-i-desc">{{ item.content }}</p> -->
                                            <div class="">
                                                <!-- <el-button type="" size="mini" class="button"></el-button> -->

                                                <el-button type="danger" size="mini" class="button">
                                                    <a target="_blank" :href="item.aff_link"><i class="el-icon-goods"></i> Đến mua ngay</a>
                                                </el-button>

                                                <p v-if="item.coupons.length > 0">Mã giảm giá</p>
                                                <el-alert
                                                    v-if="item.coupons.length > 0"
                                                    :closable="false"
                                                    type="success">
                                                    <slot name="title">
                                                        
                                                        <div v-for="(c, index) in item.coupons" :key="c.coupon_code">
                                                            <span :ref="`id${index}`">{{ c.coupon_code }} | {{ c.coupon_desc }}</span> 
                                                            
                                                            <!-- <el-button size="mini" @click="copyText(`id${index}`)">
                                                                <i class="el-icon-copy-document"></i>
                                                            </el-button>
                                                                -->
                                                        
                                                        </div>
                                                    
                                                    </slot>
                                                </el-alert>
                                        
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>

                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

        </el-container>
    </div>

</template>

<script>
import moment from 'moment';


export default {

    components: {
 
    },
    head(){
        return {
            title: 'Mã giảm giá'
        }
    },
    
    async fetch({store}) {
        await store.dispatch('coupons/get')
    },
        
    async asyncData ({ $axios, req, res }) {

    },

    data() {
        return {
        
            form: {
                created_at: [ moment().subtract(5,'day').toDate(), moment().toDate() ],
                campaign_ids: ''
            },
            loaded: false,
            selected_merchant: ''
        };
    },
    computed: {
        coupons () {
            return this.$store.state.coupons.coupons
        }
    },
    created() {
        
    },

    methods: {
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

<style scoped>
    .c-item{
        height: 100%;
    }
    .c-item-content{
    }
    .c-i-site{
        color:#00b198;
        margin-bottom: 5px;
    }
     .c-i-name{
        margin-bottom: 5px;
     }
    .c-i-date{
        margin-bottom: 5px;
        color: #999;
        font-size: 12px;
    }
    .c-i-desc{ color: #999; }
    .image {
        width: 100%;
        display: block;
    }
</style>
