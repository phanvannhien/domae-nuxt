<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/affiliate/postbacks' }">Postbacks</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <div style="margin-bottom: 1rem; text-align:right">
            <nuxt-link class="el-button el-button--primary" :to="`/affiliate/postbacks/create`" >
                    <i class="el-icon-plus"></i>
                Thêm
            </nuxt-link>

        </div>

        <el-card>
            
                
            <el-table
                :data="tableData"
                border
                style="width: 100%">

                    <el-table-column
                    prop="postback_url"
                    label="URL"
                    width="500">
                    </el-table-column>

                    <el-table-column
                    prop="request_method"
                    label="Request method"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="conversion_status"
                    label="Conversion status"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="is_active_postback"
                    label="Status"
                    >
                        <template slot-scope="props">
                            <el-tag v-if="props.row.is_active_postback == 1" type="success">Enable</el-tag>
                            <el-tag v-if="props.row.is_active_postback == 0" type="warning">Disable</el-tag>
                        </template>

                    </el-table-column>

                    <el-table-column
                    prop=""
                    label="Action"
                    >
                        <template slot-scope="props">
                             <nuxt-link :to="`/affiliate/postbacks/${props.row.id}/edit`" >
                                    <i class="el-icon-edit"></i>
                                Sửa</nuxt-link>

                            <el-link type="danger" @click="remove( props.row.id )">
                                <i class="el-icon-delete"></i> Xoá
                            </el-link>


                        </template>

                    </el-table-column>


                    
            </el-table>
        </el-card>

    </div>
</template>

<script>
export default {
    head(){
        return {
            title: 'Post backs'
        }
    },
    layout: 'default',
    components: {
        
    },
    async asyncData ({ $axios, req, res }) {

        return $axios.get(`/postbacks`)
            .then((res) => {
                return { tableData: res.data.payloads }
            }).catch(e => {
      
            })

    },
   
    data() {
        return {
               
        }
    },
    methods: {
        remove( id ){
            this.$confirm('Bạn chắc chắn muốn xoá?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Huỷ',
                type: 'warning'
            }).then(() => {
                this.$axios.delete( `/postbacks/${ id }` )
                    .then( res => { 
                   
                        this.tableData = _.remove( this.payloads, i => {
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
    }
}
</script>

<style>

</style>
