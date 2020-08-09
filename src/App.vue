<template>
  <div id="app">
<!--    头部区域-->
    <Header v-if="$route.meta.showHeader" style=" border-bottom: 1px solid #999999;">
        <i slot="left" class="ali-iconset"></i>
        <Tab slot="middle" class="tab"></Tab>
        <i slot="right" class="ali-iconsearch"></i>
    </Header>
<!--    主体-->
    <router-view :class="{active:this.$store.state.playList.length}" />
<!--    播放控件-->
    <Play></Play>
  
  </div>
</template>

<script>
  import Play from "./components/content/play/Play";
  export default {
      name:'App',
      components:{Play},
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
   /deep/ .tab .tab-item .active{
      height: auto;
      color: black;
      transform: scale(1.2);
      border: none;
    }
  }
</style>
