<template>
  <div class="recommendsong-container">
    <!--    头部区域-->
    <Header class="header">
      <i slot="left" class="ali-iconarrow-lift" @click="$router.go(-1)"></i>
      <div slot="middle" class="center">每日推荐</div>
    </Header>
<!--    背景图-->
    <div class="background">
      <img v-if="songData.dailySongs.length" :src="songData.dailySongs[0].al.picUrl">
      <Buttons v-show="checkbtnShow" @click="btnCliick" :buttonList="buttonList" class="buttons"></Buttons>
    </div>
<!--   主体-->
    <div class="body">
<!--      播放按钮-->
      <div class="playall">
        <span class="ali-iconplay" @click="playAll">播放全部</span>
        <i class="ali-iconnav-list" @click="showCheck">多选</i>
      </div>
<!--      歌曲列表-->
      <ul class="songlist">
        <Song v-for="(item) in songData.dailySongs" :reasons="songData.recommendReasons" :key="item.id" :song="item"></Song>
        <!--      选择按钮区-->
        <div class="check" v-show="checkbtnShow">
          <Checkbtn v-for="(item) in playList" :value="item.id"  :key="item.id"
                  ref="selectBtn"  @pushitem="pushitem" @removeitem="removeitem">
          </Checkbtn>
        </div>
      </ul>
    </div>
    <!--    收藏区域-->
    <Dialog v-show="collShow" :isShow.sync="collShow" title="收藏到歌单">
      <div slot="right">
        <i @click="toogleCheck" ref="checkBtn">多选</i>
      </div>
      <div slot="body">
        <swiper :options="collOption" style="height:7.8rem">
          <swiper-slide style="height:auto;">
            <New @click.native="newsheetShow = true"></New>
            <Collsongsheet ref="collSheet" :songSheet="item" :index="index"
                           v-for="(item,index) in userSongheet" :key="index"
                           @coll="coll" :checkShow="checkShow" :checkList.sync="checkList">
            </Collsongsheet>
          </swiper-slide>
        </swiper>
      </div>
    </Dialog>
    <!--    新建歌单-->
    <Newsheet v-show="newsheetShow" :isShow.sync="newsheetShow" @success="coll"></Newsheet>
  </div>
</template>

<script>
  import {collsongSheet,slectAction} from "../../assets/js/mixin"
    export default {
        name: "Recommendsong",
        mixins:[collsongSheet,slectAction],
        data(){
            return {
                songData:{
                    dailySongs:[],
                    orderSongs:[],
                    recommendReasons:[],
                },//每日推荐数据
                
            }
        },
        methods:{
            //获取推荐歌曲数据
            async getrecommendSong(){
                const response = await this.axios.get(`/recommend/songs`)
                console.log('每日推荐',response)
                if(response.code === 200){
                    this.songData.dailySongs = response.data.dailySongs
                    this.songData.orderSongs = response.data.orderSongs
                    this.songData.recommendReasons = response.data.recommendReasons
                }
            },
        },
        created() {
          this.getrecommendSong()
        },
        computed:{
            //构建播放队列
            playList(){
                const playList =  this.songData.dailySongs.map((item)=>{
                    const song = {}
                    song.id = item.id
                    song.name = item.name
                    song.ar = item.ar
                    song.al = item.al
                    song.privilege = item.privilege
                    return song
                })
                return playList
            },
            
        },
    }
</script>

<style lang="less" scoped>
.recommendsong-container{
  .header {
    background-color: transparent;
    .center{
      font-size: 14px;
      color: white;
      font-weight: 600;
    }
    i {
      color: white
    }
  }
  .background{
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 0;
    transform: translate(-50%);
    width: 7.5rem;
    overflow: hidden;
    height: 2.9rem;
    perspective: 2000px;
    img{
      position: absolute;
      z-index: 1;
      width: 7.5rem;
      animation: move 15s linear infinite alternate;
      transform-style: preserve-3d;
      transform: translateZ(300px);
    }
    .buttons{
      position: absolute;
      bottom: 0;
      width: 7.5rem;
      z-index: 2;
      color: white;
      background-color: rgba(0,0,0,0.3);
    }
    @keyframes move{
      from{
        top: 0;
      }
      to{
        top: 100%;
        transform: translateY(-100%);
      }
    }
  }
  .body{
    margin-top: 2.9rem;
    padding-bottom: 0.1rem;
    background-color: white;
    .playall{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      padding: 0 0.2rem;
      color: black;
      font-size: 14px;
    }
    .songlist{
      position: relative;
      .check{
        position: absolute;
        left: 0.5rem;
        top: 0;
        width: 0.4rem;
        .checkbtn-container{
          display: flex;
          align-items: center;
          height: 1rem;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
  
}
</style>