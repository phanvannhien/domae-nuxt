<template>
    <el-card>
        <el-image
            style="max-height: 60px; margin-bottom: 1rem"
            :src="item.merchant.logo"
            ></el-image>
            <span>{{ item.campaign_name }}</span> <br/>
            <span>Loại:</span> <strong>{{ item.type }}</strong><br/>
            <span>Chiết khấu:</span> <strong>{{ Number((item.fixed_commission).toFixed(1)).toLocaleString()  }} đ</strong>
            <el-divider><i class="el-icon-star-on"></i></el-divider>
            <p style="text-align:right">

                <NuxtLink 
                    class="el-button el-button--primary" :to="`/campaign/${item.id}`">
                    <i class="el-icon-check"></i> Chi tiết
                </NuxtLink>
            
            </p>
    </el-card>
</template>

<script>
export default {
    props: ['item'],
    methods:{}
}
</script>
