<template>
    <div>
        <h4>Trafic</h4>
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
                label="ID"
                prop="visitor_id">
            </el-table-column>

            <el-table-column
                label="Chiến dịch"
                prop="campaign_name">
            </el-table-column>

            <el-table-column
                label="URL"
                prop="URL">
            </el-table-column>

            <el-table-column
                label="Ngày"
                prop="created_at">
            </el-table-column>

            <el-table-column
                label="Agent"
                prop="user_agent">
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
    props: [],
    data() {
        return {
            tableData: {},
            per_page: 5
        }
    },
    created() {

    },
    computed: {
        tableData(){
            return this.$store.state.dashboard.traficData
        }
    },
    methods: {
       
    },

}
</script>
<style>

</style>
