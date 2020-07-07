<template>
<div>
    <HeaderFull/>
    <Nav/>
    <main class="main-content">
      <nuxt />
    </main>
    <Footer/>
</div>
</template>

<script>

import HeaderFull from '~/components/share/HeaderFull'
import Nav from '~/components/share/Nav'
import Footer from '~/components/share/Footer'

import { mapGetters } from 'vuex'

export default {
  components: {
    HeaderFull,
    Nav,
    Footer
  },
  computed: {

  },
  middleware: [],
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

.mb-2{
  margin-bottom: 20px;
}

body{
  font-family: "Open Sans";
  background: #F3F8FB;
  font-weight: 300;
  font-size: 14px;
}
main.main-content{
  min-height: 500px;
}
.main-wrap{
  padding: 1rem 0;
}
.el-container{
  max-width: 1200px;
  margin: 0 auto;
}
.img-fluid{
  max-width: 100%;
  height: auto;
}

.mb{
  &-1{ margin-bottom: 5px; }
  &-2{ margin-bottom: 7px; }
  &-3{ margin-bottom: 15px; }
  &-4{ margin-bottom: 25px; }
  &-5{ margin-bottom: 30px; }
}
.py{
  &-5{
    padding: 2rem 0;
  }
}

.p{
  &-2{ padding: 0.8rem; }
  &-3{ padding: 1rem; }
}
.d-block{
  display: block !important;
}

.price{ color: red }

.text-uppercase{  text-transform: uppercase;}


.el-row{
    display: flex;
    flex-direction: row;
    flex: 1 0 0;
    flex-wrap: wrap;
}

.align-items-stretch{
  align-items: stretch;
}
.align-items-center{
  align-items: center;
}
.align-self-top{
  align-self: flex-start;
}

.el-button{
  &.el-button--danger,
  &.el-button--success,
  &.el-button--warning{
    color: #FFF;
    a{
      color: #FFF;
    }
  }
}

strong{
  font-weight: 500 !important;
}

h1, h2, h3, h4, h5, h6{ 
  font-weight: 600;
  margin-bottom: 10px;  
}

h1{ font-size: 1.4rem }
h2{ font-size: 1.3rem }
h3{ font-size: 1.2rem }
h4{ font-size: 1rem }
h5{ font-size: 0.9rem }
h6{ font-size: 0.8rem }

a{
  text-decoration: none;
}
strong{
  font-weight: 700;
}
.text-center{
  text-align: center;
}

.el-header{
    justify-content: flex-start;
}

.main-content{
  margin-left: 0;
}



.el-breadcrumb{
  margin-bottom: 1rem;
}

.el-form-item{
  margin-bottom: 10px !important;
}

.el-form-item__label{
  line-height: 1.1;
}

.content-html{
  h1, h2, h3, h4, h5, h6{
    margin-bottom: 10px;
  }
  p{
    margin-bottom: 10px;
  }
  ul{
    padding-left: 20px;
     margin-bottom: 10px;
  }
}
.content-html{
  table{
    margin-bottom: 1rem;
    border-collapse: collapse;
    border: 1px solid #e5e5e5;
    td, th{
      border: 1px solid #e5e5e5;
      padding: 5px;
    }
  }

}

.el-table th>.cell{
  font-weight: 700;
  color: #000;
}

</style>
