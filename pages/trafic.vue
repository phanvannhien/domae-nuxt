<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/campaign' }">Báo cáo Trafic</el-breadcrumb-item>
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

                <el-button type="primary" @click="getTraffic">Duyệt</el-button>

            </div>

        </el-form>

        <el-card style="margin-bottom: 2rem">
            <LineChart  v-if="loaded" :chartdata="chartdata" :options="options"  />
        </el-card>

         <el-row :gutter="20" style="margin-bottom: 2rem">
            <el-col :xs="24" :sm="12">
               <el-card>
                    <h4 style="margin: 1rem 0">Location</h4>
                    <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover">
                        <table class="table" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Tỉnh/ Thành</th>
                                    <th>Số truy cập</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in tableDataCity" :key="key">
                                    <td>{{ key }}</td>
                                    <td>{{ value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </el-card>
            </el-col>

            <el-col  :xs="24" :sm="6" >
                <el-card>
                    <h4 style="margin: 1rem 0">Trình duyệt</h4>
                    <DoughnutChart :chartdata="chartDataBrowser" />
                
                </el-card>
            </el-col>

            <el-col  :xs="24" :sm="6" >
                <el-card>
                    <h4 style="margin: 1rem 0">Thiết bị</h4>
                    <DoughnutChart :chartdata="chartDataPie" />
                    <!-- <el-row type="flex" justify="center" :gutter="20" style="margin-top: 1rem">
                        <el-col :span="12">
                            <div class="text-center">
                                <i class="el-icon-mobile-phone"></i> <br/>
                                Mobile <br/>
                                {{ chartDataPieRaw.mobile / (chartDataPieRaw.mobile + chartDataPieRaw.desktop ) * 100  }} %
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="text-center">
                                <i class="el-icon-s-platform"></i> <br/>
                                Desktop <br/>
                                {{ chartDataPieRaw.desktop / (chartDataPieRaw.mobile + chartDataPieRaw.desktop ) * 100  }} %
                            </div>
                        </el-col>

                    </el-row> -->

                </el-card>
            </el-col>
        
        </el-row>

        <el-card style="margin-bottom: 2rem">
            <h4 style="margin: 1rem 0">Thống kê theo nguồn chiến dịch</h4>
            <el-tabs v-model="activeName">
                <el-tab-pane label="Chiến dịch" name="first">
                    <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover">
                        <table class="table" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Tên chiến dịch</th>
                                    <th>Số truy cập</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in group_count_campaign" :key="key">
                                    <td>{{ key }}</td>
                                    <td>{{ value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="Nguồn chiến dịch" name="second">
                    <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover">
                        <table class="table" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Nguồn chiến dịch</th>
                                    <th>Số truy cập</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, key) in group_count_utm" :key="key">
                                    <td>{{ key }}</td>
                                    <td>{{ value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-tab-pane>
       
            </el-tabs>
            
        </el-card>

        <el-card>
            <h4 style="margin: 1rem 0">Data</h4>

            <el-table
                v-loading="loadingTable"
                :data="tableData.data"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <p>URL: {{ props.row.redirect_url }}</p>
                        <p>Nguồn chiến dịch: {{ props.row.utm_source }}</p>
                        <p>Cách tiếp thị: {{ props.row.utm_medium }}</p>
                        <p>Tên chiến dịch: {{ props.row.utm_campaign }}</p>
                        <p>Affiliate cấp 1: {{ props.row.aff_sub1 }}</p>
                        <p>Affiliate cấp 2: {{ props.row.aff_sub2 }}</p>
                    </template>
                </el-table-column>

                <el-table-column
                    label="Visitor ID"
                    prop="visitor_id">
                </el-table-column>

                <el-table-column
                    label="Chiến dịch"
                    prop="campaign.campaign_name">
                </el-table-column>

                <el-table-column
                    label="Ngày"
                    prop="created_at">
                </el-table-column>


            </el-table>

            <div class="pagination" style="text-align: center;margin: 1rem 0 0 0;">
                <el-pagination
                    background
                    layout="prev, pager, next, total"
                    @current-change="handleChangePage"
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
    import PieChart from '~/components/chart/PieChart'
    import DoughnutChart from '~/components/chart/DoughnutChart'
    export default {
        components: {
            LineChart,
            PieChart,
            DoughnutChart,
        },
        head(){
            return {
                title: 'Traffic'
            }
        },
        asyncData({ $axios, req, res }) {
           
        },
        async fetch({store}) {
            await store.dispatch('campaign/get')
        },
        data() {
            return {
                activeName: 'first',
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
                loadingTable: true, 
                tableData: {
                    pagination: {
                        current_page: 1,
                        per_page: 20
                    }
                },
                tableDataSource: [],
                tableDataCity: [],
                group_count_campaign: null,
                group_count_utm: null,
                loaded: false,
                chartdata: null,
                chartDataPie: null,
                chartDataBrowser: null,
                chartDataPieRaw: { mobile: 0, desktop: 0 },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
					yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Traffic value'
                            },
							position: 'left',
                            id: 'y-axis-1',
                            ticks: {
                                // min: 0,
                                // max: 100,
                                // forces step size to be 5 units
                                stepSize: 5
                            }
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Conversion value'
                            },
							position: 'right',
							id: 'y-axis-2',

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
            this.getTraffic();
        },
        mounted () {
        
        },

        methods: {
            handleChangePage(val){
                this.getTraffic(val)
            },

            getTraffic( page = 1 ){
                // const loading = this.$loading({
                //     lock: true,
                //     text: 'Loading',
                //     spinner: 'el-icon-loading',
                //     background: 'rgba(0, 0, 0, 0.7)'
                // });
                
                this.$axios.get( `/report/traffic`, {  params: {
                    date_start: moment(this.form.created_at[0]).format('YYYY-MM-DD'),
                    date_end: moment(this.form.created_at[1]).format('YYYY-MM-DD'),
                    campaign_id: this.form.campaign_ids,
                    page: page
                }})
                .then( res => {
                    //loading.close();
                    this.loadingTable = false;
                    this.tableData = res.data.payloads.tableData;
                    this.loaded = true;
                    this.chartdata = res.data.payloads.chartLineData.chartdata;
                    this.chartDataPie = res.data.payloads.chartDataPie.chartdata;

                    this.chartDataBrowser = res.data.payloads.chartDataBrowser.chartdata;
                    this.chartDataPieRaw = res.data.payloads.chartDataPie.data;
                    this.tableDataCity = res.data.payloads.dataCity;
                    this.group_count_campaign = res.data.payloads.group_count_campaign;
                    this.group_count_utm = res.data.payloads.group_count_utm;
                })
                .catch( e => {
                   
                });

      
            }
        },

    };
</script>