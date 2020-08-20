<template>
  <div id="app">
<!--    头部区域-->
    <Header v-if="$route.meta.showHeader">
        <i slot="left" class="ali-iconset"></i>
        <Tab slot="middle" class="tab"></Tab>
        <i slot="right" class="ali-iconsearch" @click="$router.push({name:'search'})"></i>
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
      computed:{
          userId(){
              if(Object.keys(this.$store.state.userInfo).length){
                  return this.$store.state.userInfo.profile.userId
              }
              return false
          },
      },
      methods:{
          getuserInfo(){
              this.$store.commit('saveUserinfo',JSON.parse(localStorage.getItem('userInfo')))
          },
          getplayList(){
              this.$store.commit('savePlaylist',JSON.parse(localStorage.getItem('playList')))
          },
          getlikeList(){
              this.$store.commit('savelikeList',JSON.parse(localStorage.getItem('likeList')))
          },
          getusersongSheet(){
              this.$store.commit('saveusersongSheet',JSON.parse(localStorage.getItem('userSongsheet')))
          },
          getuserDetail(){
              if(this.userId) this.$store.dispatch('getuserDetail',this.userId)
          },
      },
      created(){
          this.getuserInfo()
          this.getplayList()
          this.getlikeList()
          this.getusersongSheet()
          this.getuserDetail()
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
