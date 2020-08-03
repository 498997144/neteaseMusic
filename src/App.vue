<template>
  <div id="app">
<!--    头部区域-->
    <Header v-if="$route.meta.showHeader">
        <Tab slot="middle"></Tab>
    </Header>
<!--    主体-->
    <router-view :class="{active:this.$store.state.playList.length}" />
<!--    播放控件-->
    <Play></Play>
  
  </div>
</template>

<script>
  import Header from "./components/common/header/Header";
  import Tab from "./components/common/tab/Tab";
  import Play from "./components/content/play/Play";
  export default {
      name:'App',
      components:{Header,Tab,Play},
      created(){
          this.getuserInfo()
          this.getplayList()
      },
      methods:{
          getuserInfo(){
              this.$store.commit('saveUserinfo',JSON.parse(localStorage.getItem('userInfo')))
          },
          getplayList(){
              this.$store.commit('savePlaylist',JSON.parse(localStorage.getItem('playList')))
          },
      },
  }
</script>

<style lang="less" scoped>
  #app{
    .active{
      &:after{
        content: '';
        height: 1rem;
        display: block;
      }
    }
  }
</style>
