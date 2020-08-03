<template>
  <div class="my-container">
<!--   用户信息-->
    <Userinfo></Userinfo>
  </div>
</template>

<script>
  import Userinfo from "./children/Userinfo";
    export default {
        name: "My",
        components:{Userinfo},
    }
</script>

<style lang="less" scoped>
.my-container{
  margin-top: 0.9rem;
}
</style>