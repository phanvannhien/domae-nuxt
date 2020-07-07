<template>

    <div>
        <div class="mb-5" v-for="product in topProducts.data" 
            :label="product.site" 
            :name="product.site" 
            :key="product.site">
                <h3 class="text-uppercase">{{ product.site }}</h3>
               
                <el-row :gutter="0" class="align-items-stretch">
                    <el-col :span="4" v-for="productItem in product.data.data" :key="productItem.product_id">
                        <el-card  :body-style="{ padding: '0px' }">
                            <img :src="productItem.image" class="p-img">
                            <div class="p-2">
                                <p class="mb-3">{{ productItem.name }}</p>
                                <div class="bottom">
                                    <p class="mb-3">
                                        <span class="price">{{ formatPrice(productItem.price) }}</span>
                                        <del v-if="productItem.discount != 0" class="price-sale">{{ formatPrice(productItem.discount) }}</del>
                                        
                                    </p>
                                    <p class="text-center">
                                        <el-button type="danger" size="mini" class="button">
                                            <a target="_blank" :href="productItem.aff_link"><i class="el-icon-goods"></i> Đến mua ngay</a>
                                        </el-button>
                                    </p>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>          
            
                
                        
   
        </div>
    </div>
    



</template>

<script>
export default {
    props: ['topProducts'],
    data() {
		return {

		};
    },
    methods : {
        formatPrice(price){
            return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .p-img{
        max-height: 120px;
        height: auto;
        display: block;
        margin: 0 auto;
        padding: 1rem;
    }
    .el-card{
        height: 100%;
    }
</style>