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
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 7.5rem;
  height: 100%;
  background-color: #C20C0C;
  z-index: 5;
  .logo{
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 1.6rem;
    img{
      width: 1.6rem;
    }
  }
}
</style>