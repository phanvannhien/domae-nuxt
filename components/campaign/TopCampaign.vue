<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="Top" name="first">
            <el-row :gutter="20">
                <el-col v-for="item in topCampaigns" :span="6" :key="item.id">
                    <CampaignItemGrid v-bind:item="item" />
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="Mới nhất" name="second">
                <el-row :gutter="20">
                    <el-col v-for="item in newCampaigns" :span="6" :key="item.id">
                        <CampaignItemGrid v-bind:item="item" />
                    </el-col>
                </el-row>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import CampaignItemGrid from '~/components/campaign/CampaignItemGrid'
export default {
    components: {
        CampaignItemGrid
    },
    data() {
        return {
            newCampaigns: [],
            topCampaigns: [],
            activeName: 'first'
        }
    },
    created() {
        this.getData( )
    },
    computed: {
        
    },
    methods: {
    
        getData(){
            this.$axios.get('/campaign-top')
                .then((res) => {
                
                    
                    this.topCampaigns = res.data.payloads.top,
                    this.newCampaigns = res.data.payloads.new
                

                }).catch(e => {
        
                })
        }
    },

}

</script>