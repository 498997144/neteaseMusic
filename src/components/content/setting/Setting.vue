<template>
  <div v-if="Object.keys(this.userInfo).length" :class="['setting-container','musk',{noactive:!isShow}]" @click.self="$emit('update:isShow',false)">
    <div :class="['setting-box',{active:isShow,noactive:!isShow}]" >
      <div class="background" :style="style">
        <ul class="userinfo">
          <li class="avatar">
            <img :src="avatarUrl">
          </li>
          <li class="name">
            <span>呢称:{{nickname}}</span>
          </li>
          <li class="level">
            <span class="elli">Lv.{{userInfo.level}}</span>
          </li>
        </ul>
        <div class="otherinfo">
          <span>关注:{{userInfo.profile.follows}}个</span>
          <span>粉丝:{{userInfo.profile.followeds}}个</span>
          <span>村龄:{{userInfo.createDays}}天</span>
          <span>听歌:{{userInfo.listenSongs}}首</span>
          <span>歌单:{{userInfo.profile.playlistCount}}个</span>
        </div>
      </div>
      <ul class="buttons">
        <li v-for="(item,index) in buttonList" :key="index" @click="clickHandler(index)">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </li>
      </ul>
<!--      <div class="logout">-->
<!--        <i class="ali-icontuichu1">退出登陆</i>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "Setting",
        props:{
            isShow:{
                type:Boolean,
                default:false,
            },
        },
        data(){
            return {
                buttonList:[
                    {name:'附近的人',icon:'ali-iconmap'},
                    {name:'我的消息',icon:'ali-iconemail'},
                    {name:'我的好友',icon:'ali-iconCustomermanagement'},
                    {name:'我的订单',icon:'ali-iconrejected-order'},
                    {name:'个人主页',icon:'ali-iconhome'},
                    {name:'退出登陆',icon:'ali-iconreeor'},
                ],
            }
        },
        computed:{
            userInfo(){
                return this.$store.state.userInfo
            },
            bacgroundUrl(){
                return this.userInfo.profile.backgroundUrl
            },
            avatarUrl(){
                return this.userInfo.profile.avatarUrl
            },
            nickname(){
                return this.userInfo.profile.nickname
            },
            style(){
                return {
                    background:`url(${this.bacgroundUrl}) no-repeat`,
                    backgroundSize:'100%',
                    backgroundPosition:'center',
                }
            },
        },
        methods:{
            clickHandler(index){
                if(index === 5){
                    this.confirm('确定要退出登陆吗?',this.logout)
                }
            },
           async logout(){
                const response = await this.axios.get(`/logout`)
                if(response.code === 200){
                    this.$emit('update:isShow',false)
                    localStorage.removeItem('token')
                    this.$router.push({name:'login'})
                }
            },
        },
    }
</script>

<style lang="less" scoped>
.setting-container{
  transition: all 1s ease;
  &.noactive{
    opacity: 0;
  }
  .setting-box{
    position: relative;
    width: 6.5rem;
    height: 100%;
    background-color: white;
    &.active{
      animation: move 1s ease;
    }
    &.noactive{
      animation: leave 1s ease;
    }
    .background{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 3.5rem;
      .userinfo{
        display: flex;
        width: 100%;
        height: 1.4rem;
        .avatar{
          display: flex;
          flex:1.4rem 0 0;
          justify-content: center;
          align-items: center;
          img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
          }
        }
        .name{
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: white;
          span{
            max-width: 3.5rem;
          }
        }
        .level{
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1.2rem 0 0;
          color: white;
          font-weight: 600;
          span{
            background-color: #666666;
            padding:0.1rem 0.1rem;
            border-radius: 0.2rem;
          }
        }
      }
      .otherinfo{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-around;
        height: 1.2rem;
        color: white;
        span{
        
        }
      }
    }
    .buttons{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: calc(100% - 3.5rem);
      li{
        display: flex;
        height: 0.8rem;
        padding: 0 0.4rem;
        align-items: center;
        i{
          color: red;
        }
        span{
          margin-left: 0.4rem;
          color: black;
          font-size: 14px;
        }
      }
    }
    /*.logout{*/
    /*  position: absolute;*/
    /*  width: 100%;*/
    /*  bottom: 0;*/
    /*  left: 0;*/
    /*  display: flex;*/
    /*  justify-content: center;*/
    /*  align-items: center;*/
    /*  height: 0.8rem;*/
    /*  font-weight: 600;*/
    /*  font-size: 14px;*/
    /*  color: black;*/
    /*}*/
  }
  @keyframes move{
    from{
      transform: translateX(-100%);
      opacity: 0;
    }
    to{
      transform: translateX(-0%);
      opacity: 1;
    }
  }
  @keyframes leave{
    from{
      transform: translateX(-0%);
      opacity: 1;
    }
    to{
      transform: translateX(-100%);
      opacity: 0;
    }
  }
}
</style>