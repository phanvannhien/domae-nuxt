<script>
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: ['chartdata', 'options'],
    mounted () {
        this.renderChart(this.chartdata, this.options)
    },
    computed: {
        chartData: function() {
            return this.chartdata;
        }
    },
    watch: {
        chartData: function() {
            // this._chart.destroy();
            //this.renderChart(this.data, this.options);
            this.renderChart(this.chartdata, this.options)
        }
    },
    methods: {
  
    },
}
</script>

<style>

</style>
