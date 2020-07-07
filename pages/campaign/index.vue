<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/campaign' }">Chiến dịch</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-form style="text-align:right" :inline="true" :model="form" class="form-inline" >
            <el-select
                :clearable=true
                v-model="form.category_id" filterable placeholder="Chuyên mục">
                <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            
            <el-form-item label="" >
               <el-input size="medium" placeholder="Tên chiến dịch" v-model="form.campaign_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="onSubmit">Tìm</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="8" v-for="campaign in campaigns" :key="campaign.id">
                <CampaignItemList  v-bind:item="campaign" />
            </el-col>
        </el-row>
    

    </div>
</template>
<script>

import CampaignItemList from '~/components/campaign/CampaignItemList'

export default {
    head(){
        return {
            title: 'Chiến dịch'
        }
    },
    layout: 'default',
    components: {
        CampaignItemList
    },
    middleware: ['auth'],
    async asyncData ({ $axios, req, res }) {
        const data = await $axios.get('/campaigns');
        return { 
            campaigns : data.data.payloads
        }
    },
    async fetch({store}) {
        await store.dispatch('category/get')
    },
   
    data() {
        return {
            campaigns: [],
            form: {
                campaign_name: '',
                category_id: ''
            }
        }
    },
    created(){
       
    },
    computed: {
        categories () {
            return this.$store.state.category.categories
        }
    },
    methods: {
        async onSubmit(){
            const data = await this.$axios.get('/campaigns', { params: {
                campaign_name: this.form.campaign_name,
                category_id:  this.form.category_id,
            }});
            this.campaigns = data.data.payloads
            
        }
    },
}
</script>

<style>

</style>
