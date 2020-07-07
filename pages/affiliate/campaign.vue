<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/campaign' }">Chiến dịch của tôi</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-row :gutter="20">
            <el-col v-for="item in payloads" :xs="24" :sm="12" :lg="8" :key="item.id">
                <CampaignItemList v-bind:item="item" />
            </el-col>
        </el-row>
    </div>
</template>
<script>


import CampaignItemList from '~/components/campaign/CampaignItemList'

export default {
    head(){
        return {
            title: 'Chiến dịch của tôi'
        }
    },
    layout: 'default',
    components: {
        CampaignItemList
    },
    middleware: ['auth'],
    async asyncData ({ $axios, req, res }) {

        return $axios.get('/campaign-affiliate')
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
        
    },
}
</script>

<style>

</style>
