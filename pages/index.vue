<template>
  <div>
   
    <div class="el-container">
      <div class="py-5">
        <h2 class="mb-5 text-center">TOP SẢN PHẨM BÁN CHẠY 3 NGÀY TRƯỚC</h2>
        <TopProducts v-bind:topProducts="topProductData" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import TopProducts from '~/components/home/TopProducts'


export default {

  components: {
    TopProducts
  },
  head(){
    return {
      title: 'Takiti | Chia sẻ mã giảm giá'
    }
  },
  async fetch({store}) {
    await store.dispatch('coupons/getTopProducts')
  },

  async asyncData ({ $axios, req, res }) {

  },

  data() {
    return {
     
    };
  },
  computed: {
    topProductData() {
        return this.$store.state.coupons.topProducts
    }
  },
  created() {
    
  },

  methods: {
     
  }
}
</script>

<style scoped>
 
</style>
