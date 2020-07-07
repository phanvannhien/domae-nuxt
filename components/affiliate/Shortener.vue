<template>
    <div>
        <h4>Link đã tạo</h4>
        <el-divider></el-divider>
        <el-table
            :data="tableData.data"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <p>Nguồn chiến dịch: {{ props.row.utm_source }}</p>
                    <p>Cách tiếp thị: {{ props.row.utm_medium }}</p>
                    <p>Tên chiến dịch: {{ props.row.utm_campaign }}</p>
                    <p>Affiliate cấp 1: {{ props.row.aff_sub1 }}</p>
                    <p>Affiliate cấp 2: {{ props.row.aff_sub2 }}</p>
                </template>
            </el-table-column>

            <el-table-column
                label="Link rút gọn"
                prop="short_url">
            </el-table-column>

            <el-table-column
                label="Link đích"
                prop="current_url">
            </el-table-column>

        </el-table>
        <div class="pagination" style="text-align: center;margin: 1rem 0 0 0;">
             <el-pagination
                background
                layout="prev, pager, next, total"
                @current-change="handleCurrentChange"
                :current-page="tableData.current_page"
                :page-size="parseInt(tableData.per_page)"
                :total="tableData.total">
            </el-pagination>
        </div>
       

    </div>
</template>
<script>
export default {
    props: ['id'],
    data() {
        return {
            tableData: {},
            campaign_id: this.id ,
            per_page: 5
        }
    },
    created() {
        this.getLinks( )
    },
    computed: {
        
    },
    methods: {
        handleCurrentChange(val){
            this.getLinks(val)
        },

        getLinks( page = 1 ){
            this.$axios.get( `/campaign/${ this.id }/links`,{
                params: {
                    per_page: this.per_page,
                    page: page
                }
            })
                .then( res => {
                    this.tableData = res.data.payloads;
                })
                .catch( e => {
                   
                });
        }
    },

}
</script>
<style>

</style>
