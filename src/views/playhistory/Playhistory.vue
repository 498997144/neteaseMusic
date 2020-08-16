<template>
  <div class="playhistory-container">
    <!--    头部区域-->
    <Header class="header">
      <i slot="left" class="ali-iconarrow-lift" @click="$router.go(-1)"></i>
      <div slot="middle" class="center">播放历史</div>
    </Header>
    <Buttons v-show="checkbtnShow" @click="btnCliick" :buttonList="buttonList" class="buttons"></Buttons>
    <!--   主体-->
    <div class="body" :class="{active:checkbtnShow}">
      <!--      播放按钮-->
      <div class="playall">
        <span class="ali-iconplay" @click="playAll">播放全部</span>
        <i class="ali-iconnav-list" @click="showCheck">多选</i>
      </div>
      <!--      歌曲列表-->
      <ul class="songlist">
        <Song v-for="(item) in playList" :key="item.id" :song="item"></Song>
        <!--      选择按钮区-->
        <div class="check" v-show="checkbtnShow">
          <Checkbtn v-for="(item) in playList" :value="item.id" :key="item.id"
                    ref="selectBtn" @pushitem="pushitem" @removeitem="removeitem">
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
    import {collsongSheet, slectAction} from "../../assets/js/mixin";
    
    export default {
        name: "Playhistory",
        mixins: [collsongSheet, slectAction],
        data(){
            return {
                playHistoryList:this.$route.params.data
            }
        },
        computed:{
            //构建播放队列
            playList(){
                const playList =  this.playHistoryList.map((item)=>{
                    const song = {}
                    song.id = item.song.id
                    song.name = item.song.name
                    song.ar = item.song.ar
                    song.al = item.song.al
                    song.privilege = item.song.privilege
                    return song
                })
                return playList
            },
        
        },
    }
</script>

<style lang="less" scoped>
  .playhistory-container {
    .header {
      background-color: white;
      
      .center {
        font-size: 14px;
        color: black;
        font-weight: 600;
      }
      
      i {
        color: black;
      }
    }
    .buttons{
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: 0.9rem;
      width: 7.5rem;
      z-index: 2;
      color: white;
      background-color: rgba(0,0,0,0.3);
    }
    .body{
      margin-top: 0.9rem;
      padding-bottom: 0.1rem;
      background-color: white;
      &.active{
        margin-top: 1.9rem;
      }
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