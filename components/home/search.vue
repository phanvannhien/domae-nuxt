<template>
    <div class="search-area">
        <!-- start .container -->
        <div class="el-container">
        
            <!-- start .search_box -->
            <div class="search_box">
                <el-form :model="form" :rules="rules" ref="ruleForm">
                    <el-input type="text" v-model="form.keywords" class="text_field" placeholder="Tìm tên sản phẩm trên tiki, shopee, lazada ... giá tốt nhất">
                    </el-input>
                    <button type="button" @click="search('ruleForm')" class="search-btn btn--lg">Tìm</button>
                </el-form>
            </div>
            <!-- end ./search_box -->
        
        </div>
        <!-- end /.container -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                keywords: ''
            },
            rules: {
                keywords: [
                    { required: true, message: 'Nhập từ khoá cần tìm', trigger: 'change' },
                    { min: 5, max: 200, message: 'Từ khoá tối thiểu 3 ký tự', trigger: 'change' }
                ],
            }
            
        }
    },
    methods: {
        search( formName ){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$router.push({
                        path: '/tim-kiem?keyword='+this.form.keywords
                    })
                } else {
                
                }
            });
            
            
        }
    },
}
</script>

<style lang="scss" scoped>
      .search-area {
            position: relative;
            margin-top: 50px;
            width: 100%;
            z-index: 2;
            .search_box {
                width: 100%;
                -webkit-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                padding: 40px;
                -webkit-border-radius: 6px;
                border-radius: 6px;
                position: relative;
                background: #fff;
                &:before, &:after {
                    position: absolute;
                    content: '';
                    background: rgba(255, 255, 255, 0.5);
                    -webkit-border-radius: 6px;
                    border-radius: 6px;
                    height: 100%;
                    z-index: -1;
                }
                &:before {
                    left: 15px;
                    top: -13px;
                    width: calc(100% - 30px);
                }
                &::after {
                    left: 30px;
                    width: calc(100% - 60px);
                    top: -26px;
                }
                form {
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-flex-wrap: wrap;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    -webkit-box-align: center;
                    -webkit-align-items: center;
                    -ms-flex-align: center;
                    align-items: center;
                    .text_field {
                        -webkit-box-flex: 2;
                        -webkit-flex: 2;
                        -ms-flex: 2;
                        flex: 2;
                        line-height: 55px;
                        height: 55px;
                        padding: 0 25px;
                        font-size: 16px;
                        -webkit-border-radius: 4px 0 0 4px;
                        border-radius: 4px 0 0 4px;
                        border-right: 0;
                        background: #fff;
                        border: 1px solid #dcdcdc;
                    }
                    .search-btn {
                        margin-left: 30px;
                        -webkit-transition: 0.3s ease;
                        -o-transition: 0.3s ease;
                        transition: 0.3s ease;
                        cursor: pointer;
                        background: #21ad51;
                        color: #fff;
                        -webkit-border-radius: 4px;
                        border-radius: 4px;
                        min-width: 223px;
                        font-size: 16px;
                        border: 0;
                        line-height: 55px;
                    }
                }
            }
        }
</style>