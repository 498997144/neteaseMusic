<template>
  <div class="cloud-container">
<!--    导航-->
    <Tab :tabList="[{name:'热评',path:'hotwall'},{name:'关注',path:'event'}]" class="tablist"></Tab>
<!--    主体-->
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "Cloud",
        data(){
            return {
            
            }
        },
    }
</script>

<style lang="less" scoped>
  .cloud-container{
    .tablist{
      margin-top: 0.9rem;
    }
  }
</style>