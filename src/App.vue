<template>
  <div id="app">
<!--    头部区域-->
    <Header v-if="$route.meta.showHeader">
        <i slot="left" class="ali-iconset" @click="settingShow = true"></i>
        <Tab slot="middle" class="tab"></Tab>
        <i slot="right" class="ali-iconsearch" @click="$router.push({name:'search'})"></i>
    </Header>
<!--    主体-->
    <transition>
      <router-view :class="{active:this.$store.state.playList.length}" />
    </transition>
<!--    播放控件-->
    <Play></Play>
<!--    设置信息-->
    <Setting :class="['setting',{active:settingShow}]" :isShow.sync="settingShow"></Setting>
  </div>
</template>

<script>
  import Play from "./components/content/play/Play";
  import Setting from "./components/content/setting/Setting";
  export default {
      name:'App',
      components:{Play,Setting},
      data(){
          return {
              settingShow:false,
          }
      },
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
    .setting{
      visibility: hidden;
      &.active{
        visibility: visible;
      }
    }
    .v-enter-active,.v-leave-active{
      position: absolute;
      top: 0;
      width: 7.5rem;
      transition: all 1s ease-in;
    }
    .v-leave-active{
      /*left: 30%;*/
    }
    .v-enter,.v-leave-to{
      opacity: 0;
      transform: rotateY(180deg);
    }
  }
</style>
