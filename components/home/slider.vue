<template>
    <section class="hero-area bgimage">
        <div class="bg_image_holder" style="background: url('bg-slider.jpg'); opacity: 1;">
            <img src="bg-slider.jpg" alt="background-image">
        </div>
        <!-- start hero-content -->
        <div class="hero-content content_above">
            <!-- start .contact_wrapper -->
            <div class="content-wrapper">
                <!-- start .container -->
                <div class="el-container">
                 
                    <div class="hero__content__title">
                        <p class="tagline">Gõ vào sản phẩm bạn muốn tìm kiếm</p>
                    </div>

                       
                </div>
                <!-- end /.container -->
            </div>
            <!-- end .contact_wrapper -->
        </div>
        <!-- end hero-content -->

        <!--start search-area -->
        <search />

    </section>
</template>

<script>

import search from '~/components/home/search'

export default {
    components: {
        search
    }
}
</script>

<style lang="scss" scoped>
    .hero-area {
        position: relative;
        width: 100%;
        padding: 3rem 0;
        &:before{
            position: absolute;
            height: 100%;
            width: 100%;
            content: '';
            background: linear-gradient(to left, #e6a23d, #67c23a);
            top: 0;
            left: 0;
            opacity: 0.8;
            z-index: 1;
        }
        
        .bg_image_holder {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            -webkit-background-size: cover !important;
            background-size: cover !important;
            background-position: 50% 50% !important;
            z-index: 0;
            -o-transition: opacity .3s linear;
            transition: opacity .3s linear;
            -webkit-transition: opacity .3s linear;
            opacity: 0;
            img{
                display: none;
            }
        }
        .content_above {
            position: relative;
            z-index: 2;
        }

        .hero-content {
            
            text-align: center;
            width: 100%;
            height: 100%;
            .content-wrapper {
                
            }
            .hero__content__title {
                text-align: center;
                h1 {
                    color: #f3f3f8;
                    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
                    font-size: 60px;
                }
                .tagline {
                    color: #f3f3f8;
                    font-size: 20px;
                    font-weight: 500;
                    margin: 0;
                }
            }
        }

      
    }

</style>