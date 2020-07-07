<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/campaign' }">Conversion</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        
        <el-form :inline="true" :model="form" class="demo-form-inline" style="margin-bottom: 2rem">

            <div class="block">
                <el-date-picker
                    v-model="form.created_at"
                    type="daterange"
                    format="dd-MM-yyyy"
                    :picker-options="dateOptions"
                    range-separator="đến"
                    start-placeholder="Từ ngày"
                    end-placeholder="Đến ngày"
                    align="center">
                </el-date-picker>
            
                <el-select
                    :clearable=true
                    v-model="form.campaign_ids" filterable placeholder="Chiến dịch">
                    <el-option
                        v-for="item in campaigns"
                        :key="item.id"
                        :label="item.campaign_name"
                        :value="item.id">
                    </el-option>
                </el-select>

                <el-button type="primary" @click="getData">Duyệt</el-button>

            </div>

        </el-form>

        <div style="margin-bottom:2rem">
            <ReportSummary v-bind:reportData="summaryData" /> 
        </div>

        <el-card style="margin-bottom: 2rem">
            <LineChart  v-if="loaded" :chartdata="chartdata" :options="options"  />
        </el-card>

        <el-card>
            <h4 style="margin: 1rem 0">Data</h4>
            <el-form :inline="true" :model="form_conversion" class="demo-form-inline" style="text-align:right; margin-bottom: 2rem">

                <div class="block">
                    <el-form-item>
                        <el-input placeholder="Utm source" v-model="form_conversion.utm_source"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="Utm medium" v-model="form_conversion.utm_medium"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="Utm campaign" v-model="form_conversion.utm_campaign"></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-select
                        :clearable=true
                        v-model="form_conversion.status" filterable placeholder="Trạng thái">
                        <el-option
                            v-for="item in [
                                    'pending',
                                    'approved',
                                    'rejected',
                                ]"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-button type="primary" @click="getData">Lọc</el-button>

                </div>

            </el-form>


            <el-table
                stripe
                v-loading="loadingTable"
                :data="tableData.data"
                style="width: 100%">

                <el-table-column type="expand">
                    
                    <template slot-scope="props">
                        <table style="width:100%" class="table table-stripped">
                            <thead>
                                <tr>
                                    <td>Thông tin</td>
                                    <td>Nguồn traffic</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p><strong style="width: 100px; display:inline-block">Họ tên:</strong> {{ props.row.full_name }}</p>
                                        <p><strong style="width: 100px; display:inline-block">Số điện thoại:</strong> {{ props.row.phone }}</p>
                                        <p><strong style="width: 100px; display:inline-block">Email:</strong> {{ props.row.email }}</p>
                                    </td>
                                    <td>
                                        <p><strong style="width: 100px; display:inline-block">Utm source:</strong> {{ props.row.traffic.utm_source }}</p>
                                        <p><strong style="width: 100px; display:inline-block">Utm medium:</strong> {{ props.row.traffic.utm_medium }}</p>
                                        <p><strong style="width: 100px; display:inline-block">Utm campaign:</strong> {{ props.row.traffic.utm_campaign }}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                       
                    </template>
                </el-table-column>

                <el-table-column
                    width="50"
                    label="ID"
                    prop="id">
                </el-table-column>

                <el-table-column
                    width="300"
                    label="Visitor ID"
                    
                    prop="traffic.visitor_id">
                </el-table-column>


                <el-table-column
                    width="200"
                    label="Chiến dịch"
                    prop="traffic.campaign.campaign_name">
                </el-table-column>

                <el-table-column
                    width="70"
                    label="Loại"
                    prop="traffic.campaign.type">
                </el-table-column>

                <el-table-column
                    width="100"
                    label="Hoa hồng"
                    prop="commission">
                     <template slot-scope="props">
                         <span style="color:red">{{ props.row.commission }}</span>
                     </template>
                </el-table-column>

                <el-table-column
                    label="Ngày"
                    prop="created_at">
                </el-table-column>

                 <el-table-column
                    label="Trạng thái"
                     prop="status">
                    <template slot-scope="props">
                        <el-tag type="warning">{{ props.row.status }}</el-tag>
                    </template> 
                </el-table-column>


            </el-table>

            <div class="pagination" style="text-align: center;margin: 1rem 0 0 0;">
                <el-pagination
                    background
                    layout="prev, pager, next, total"
                    @current-change="getData"
                    :current-page="parseInt(tableData.pagination.current_page)"
                    :page-size="parseInt(tableData.pagination.per_page)"
                    :total="tableData.pagination.total">
                </el-pagination>
            </div>
            
        </el-card>

       
    </div>
</template>

<script>
    import moment from 'moment';
    import LineChart from '~/components/chart/LineChart'
    import ReportSummary from '~/components/dashboard/ReportSummary'

    export default {
        components: {
            LineChart,
            ReportSummary
        },
        head(){
            return {
                title: 'Conversion'
            }
        },
        asyncData({ $axios, req, res }) {
           
        },
        async fetch({store}) {
            await store.dispatch('campaign/get')
        },
        data() {
            return {
                summaryData:{},
                dateOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [
                        {
                            text: 'Hôm nay',
                            onClick(picker) {
                             
                                picker.$emit('pick', [ moment().startOf('day').toDate() , moment().toDate() ]);
                            }
                        },

                        {
                            text: 'Hôm qua',
                            onClick(picker) {
                               
                                picker.$emit('pick', [ 
                                    moment().subtract(1, 'days').startOf('day').toDate() , 
                                    moment().subtract(1, 'days').endOf('day').toDate() , 
                                ]);
                            }
                        },
                        
                        {
                            text: 'Tuần này',
                            onClick(picker) {
                  
                                picker.$emit('pick', [ moment().startOf('week').toDate() , moment().toDate() ]);
                            }
                        },

                         {
                            text: 'Tháng này',
                            onClick(picker) {
                          
                                picker.$emit('pick', [ moment().startOf('month').toDate() , moment().toDate() ]);
                            }
                        }
                        , 
                        {
                            text: 'Tháng trước',
                            onClick(picker) {
                                
                                picker.$emit('pick', [
                                    moment().subtract(1, 'month').startOf('month').toDate()
                                    , 
                                    moment().subtract(1, 'month').endOf('month').toDate()
                                ]);
                            }
                        }
                    ]
                },
                form: {
                    created_at: [ moment().subtract(5,'day').toDate(), moment().toDate() ],
                    campaign_ids: ''
                },
                form_conversion: {
                    utm_source: '',
                    utm_medium: '',
                    utm_campaign: '',
                    status: ''
                },
                loadingTable: true, 
                loaded: false,
                tableData: {
                    pagination: {
                        current_page: 1,
                        per_page: 20
                    }
                },
               
                chartdata: null,
                
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
					yAxes: [
                        {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Conversion value'
                            },
							position: 'right',
							id: 'y-axis-conversion',
                            ticks: {
                                // min: 0,
                                // max: 100,
                                // forces step size to be 5 units
                                stepSize: 1
                            },
							// grid line settings
							gridLines: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						}],
					}
                }
            };
        },
        computed: {
            campaigns () {
                return this.$store.state.campaign.campaigns
            }
        },
        created() {
            this.getData();
        },

        mounted () {
        
        },

        methods: {
            handleChangePage(val){
                this.getData(val)
            },
     
            getData( page = 1 ){
                // const loading = this.$loading({
                //     lock: true,
                //     text: 'Loading',
                //     spinner: 'el-icon-loading',
                //     background: 'rgba(0, 0, 0, 0.7)'
                // });
                
                this.$axios.get( `/report/conversion`, {  params: {
                    date_start: moment(this.form.created_at[0]).format('YYYY-MM-DD'),
                    date_end: moment(this.form.created_at[1]).format('YYYY-MM-DD'),
                    campaign_id: this.form.campaign_ids,
                    utm_source: this.form_conversion.utm_source,
                    utm_campaign: this.form_conversion.utm_campaign,
                    utm_medium: this.form_conversion.utm_medium,
                    status: this.form_conversion.status,
                    page: page
                }})
                .then( res => {
                    // loading.close();
                    this.loadingTable = false;
                    this.loaded = true;
                    this.tableData = res.data.payloads.tableData;
                    this.summaryData = res.data.payloads.summaryData;
                    this.chartdata = res.data.payloads.chartdata;
       
                })
                .catch( e => {
                   
                });

      
            }
        },

    };
</script>