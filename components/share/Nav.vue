<template>
  <nav id="main-nav">
    <el-container>
      <el-menu :default-active="activeIndex" background-color="#e6e6e6" text-color="#222" mode="horizontal">
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <nuxt-link to="/"><span>Trang chủ</span></nuxt-link>
        </el-menu-item>

        <el-menu-item index="3">
          <i class="el-icon-files"></i>
          <nuxt-link to="/ma-giam-gia"><span>Mã giảm giá</span></nuxt-link>
        </el-menu-item>

        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <nuxt-link to="/"><span>Chia sẻ</span></nuxt-link>
        </el-menu-item>
      </el-menu>
    </el-container>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
}
</script>

<style lang="scss" scoped>
  #main-nav{
    background: #e6e6e6;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #1eaa50;
  }
  .el-menu-item i, .el-submenu__title i {
    color: #222;
  }
  .el-submenu__title i {
    color: #222;
  }
  .el-menu--horizontal>.el-menu-item{
    height: 50px;
    line-height: 50px;
  }
</style>
