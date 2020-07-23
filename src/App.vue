<template>
  <div id="app">
<!--    头部区域-->
    <Header v-if="$route.meta.showHeader">
        <Tab slot="middle"></Tab>
    </Header>
<!--    主体-->
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/common/header/Header";
  import Tab from "./components/common/tab/Tab";
  export default {
      name:'App',
      components:{Header,Tab,},
      created(){
          this.getuserInfo()
      },
      methods:{
          getuserInfo(){
              this.$store.commit('saveUserinfo',JSON.parse(localStorage.getItem('userInfo')))
          },
      },
  }
</script>

<style lang="less" scoped>
  #app{
    height: 100%;
  }
</style>
