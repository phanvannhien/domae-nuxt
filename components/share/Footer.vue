<template>
    <footer class="footer-area">
        <div class="footer-big section--padding">
            <!-- start .container -->
            <div class="el-container">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="info-footer">
                           
                            <p class="info--text">Là nơi chia sẻ mã giảm giá, coupon, voucher, thông tin khuyến mãi, kinh nghiệm mua sắm trức tuyến tại các website thương mại điện tử lớn và uy tín tại Việt Nam.</p>
                            <ul class="info-contact">
                                <li>
                                    <i class="las la-mobile-alt"></i>
                                    <span class="info">Phone: 0971 1818 52</span>
                                </li>
                                <li>
                                    <i class="las la-envelope"></i>
                                    <span class="info">info@takiti.com</span>
                                </li>
                                <li>
                                   <i class="las la-map-marker-alt"></i>
                                    <span class="info">346 Nguyễn Văn Công, Phường 03, Quận Gò Vấp, Thành phố Hồ Chí Minh.</span>
                                </li>
                            </ul>
                        </div>
                        <!-- end /.info-footer -->
                    </el-col>
                    <!-- end /.col-md-3 -->

                    <el-col :span="8">
                        <div class="footer-menu">
                            <h4 class="footer-widget-title text--white">Giúp đỡ</h4>
                            <ul>
                                <li>
                                    <a href="#">How to Join Us</a>
                                </li>
                                <li>
                                    <a href="#">How It Work</a>
                                </li>
                                <li>
                                    <a href="#">Buying and Selling</a>
                                </li>
                                <li>
                                    <a href="#">Testimonials</a>
                                </li>
                                <li>
                                    <a href="#">Copyright Notice</a>
                                </li>
                                <li>
                                    <a href="#">Refund Policy</a>
                                </li>
                                <li>
                                    <a href="#">Affiliates</a>
                                </li>
                            </ul>
                        </div>
                        <!-- end /.footer-menu -->

                
                     </el-col>
                    <!-- end /.col-md-5 -->

                    <el-col :span="8">
                        <div class="newsletter">
                            <h4 class="footer-widget-title text--white">Connect Us in Social</h4>
                           
                            <!-- start .social -->
                            <div class="social">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i class="lab la-facebook-square"></i>
                                        </a>
                                    </li>
                                   
                                </ul>
                            </div>
                            <!-- end /.social -->
                        </div>
                        <!-- end /.newsletter -->
                     </el-col>
                    <!-- end /.col-md-4 -->
                </el-row>
                <!-- end /.row -->
            </div>
            <!-- end /.container -->
        </div>
        <!-- end /.footer-big -->

        <div class="mini-footer">
            <div class="el-container">
               
                <div class="copyright-text">
                    <p>© 2020 <a href="#">Takiti</a>. All rights reserved.</p>
                </div>

                <div class="go_top">
                    <span class="lnr lnr-chevron-up"></span>
                </div>
                   
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    
}
</script>


<style lang="scss" scoped>
footer{
    ul{
        list-style: none;
        li{

        }
    } 
    .social{
        a{
            font-size: 2rem;
            color: #FFF;
        }
    }
}
.footer-big{
    padding: 2rem 0;
}

.footer-area.footer--light .footer-big {
  background: #eff1f5;
}

.footer-area.footer--light .mini-footer {
  background: #e2e5eb;
}

.footer-area.footer--light .mini-footer p {
  color: #5e6c7c;
}

.footer-area.footer--light .mini-footer p a {
  color: #0674ec;
}

.footer-area.footer--light .footer-menu ul li a {
  color: #737373;
}

.footer-area.footer--light .footer-menu ul li a:hover {
  color: #000;
}

.footer-big {
  background: #262b30;
}

.footer-big p, .footer-big ul li, .footer-big .footer-menu ul li a {
  color: #ababab;
}

.info-contact {
  margin-top: 21px;
}

.info-contact li {
  font-size: 16px;
  margin-bottom: 12px;
}

.info-contact li .info-icon, .info-contact li .info {
  display: inline-block;
  vertical-align: middle;
}

.info-contact li .info-icon {
  color: #fff;
}

.info-contact li .info {
  width: calc(100% - 30px);
  padding-left: 8px;
}

.info__logo {
  margin-bottom: 25px;
}

.footer-menu {
  display: inline-block;
  width: 49%;
  padding-left: 48px;
  
}

.footer-menu.footer-menu--1 {
  width: auto;
}

.footer-menu ul li a {
  font-size: 15px;
  line-height: 32px;
  -webkit-transition: 0.3s ease;
  -o-transition: 0.3s ease;
  transition: 0.3s ease;
}

.footer-menu ul li a:hover {
  color: #fff;
}

.footer-widget-title {
  line-height: 42px;
  margin-bottom: 10px;
  color: #FFF;
}

.field-wrapper {
  position: relative;
  margin-top: 32px;
  margin-bottom: 48px;
}

.field-wrapper .relative-field {
  line-height: 50px;
  height: 50px;
}

.field-wrapper .btn {
  position: absolute;
  right: 0;
  height: 100%;
  padding: 0 30px;
  top: 0;
}

.mini-footer {
  background: #192027;
  text-align: center;
  padding: 32px 0;
}

.mini-footer p {
  margin: 0;
  line-height: 26px;
  font-size: 15px;
  color: #999;
}

.mini-footer p a {
  color: #fff;
}

.mini-footer p a:hover {
  color: #0674ec;
}

.copyright-text{
    width: 100%;
    text-align: center;
}

</style>