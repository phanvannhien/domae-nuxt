<template>

  <div class="auth">
    
    <el-image
      class="logo"
      style="width: 80px; height: 80px"
      src="/logo-blue.png"
      fit="fit"></el-image>
      <div class="form-wrap">
        <nuxt />
      </div>
  </div>

</template>



<style>

.auth {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}


.auth .logo{
  margin-bottom: 1rem;
}

.auth .form-wrap{
  width: 500px;
}

@media screen and (max-width: 480px) {
  .auth .form-wrap{
    width: 375px;
  }
}

.auth .el-button--primary{
  width: 100%;
}

</style>
