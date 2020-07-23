<template>
  <div class="login-container">
<!--    Logo-->
    <div class="logo">
      <img src="../../assets/imags/logo.png">
    </div>
<!--    导航控制-->
    <Tabctrl></Tabctrl>
<!--    表单区域-->
    <router-view></router-view>
  </div>
</template>

<script>
  import Tabctrl from "../../components/common/tabctrl/Tabctrl";
    export default {
        name: "Login",
        components:{Tabctrl},
    }
</script>

<style lang="less" scoped>
.login-container{
  height: 100%;
  background-color: #C20C0C;
  border-top: 1px solid transparent;
  .logo{
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 1.6rem;
    }
  }
}
</style>