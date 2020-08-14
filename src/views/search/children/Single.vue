<template>
  <div class="singel-container">
    <div class="body" :class="{active:checkbtnShow}" v-if="searchResult.length">
      <Buttons v-show="checkbtnShow" @click="btnCliick" :buttonList="buttonList" class="buttons"></Buttons>
      <!--      播放按钮-->
      <div class="playall">
        <span class="ali-iconplay" @click="playAll">播放全部</span>
        <i class="ali-iconnav-list" @click="showCheck">多选</i>
      </div>
      <!--      歌曲列表-->
      <ul class="songlist">
        <Song v-for="(item,index) in playList" :index="index" :key="index" :song="item"></Song>
        <!--      选择按钮区-->
        <div class="check" v-show="checkbtnShow">
          <Checkbtn v-for="(item,index) in playList" :value="item.id"  :key="index"
                    ref="checkBtn"  @pushitem="pushitem" @removeitem="removeitem">
          </Checkbtn>
        </div>
      </ul>
    </div>
    <div class="notfound" v-show="notfountShow">没有找到关于{{keyword}}的内容</div>
    <!--    收藏区域-->
    <Dialog v-show="collShow" :isShow.sync="collShow" title="收藏到歌单">
      <div slot="right">
        <i @click="toogleCheck">多选</i>
      </div>
      <div slot="body">
        <swiper :options="collOption" style="height:7.8rem">
          <swiper-slide style="height:auto;">
            <New @click.native="newsheetShow = true"></New>
            <Collsongsheet ref="collSheet" :songSheet="item" :index="index"
                           v-for="(item,index) in collSongheet" :key="index"
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
    import {collsongSheet,slectAction,loadMore} from "../../../assets/js/mixin"
    export default {
        name: "Single",
        mixins:[collsongSheet,slectAction,loadMore],
        computed:{
            //构建播放队列
            playList(){
                if(!this.searchResult.length) return []
                const playList =  this.searchResult.map((item)=>{
                    const song = {}
                    song.id = item.id
                    song.name = item.name
                    song.ar = item.artists
                    song.al = item.album
                    song.privilege = null
                    song.mvid = item.mvid
                    return song
                })
                return playList
            },
        },
        methods:{
            async getsearchResult(page=this.page,limit=this.limit,keyword=this.keyword){
                if(!keyword) return
                if(page * limit > this.total) return this.toast('没有更多数据了')
                let url = `/search?keywords=${keyword}&type=1&limit=${limit}&offset=${page * limit}`
                const response = await this.axios.get(url)
                if(!response.result.songCount){
                   return this.notfountShow = true
                }else {
                    this.notfountShow = false
                }
                if(response.code === 200){
                    this.total = response.result.songCount
                    this.searchResult = this.searchResult.concat(response.result.songs)
                    this.page+=1
                }
                console.log(response)
            },
        },
    }
</script>

<style lang="less" scoped>
.singel-container{
  overflow: hidden;
  .buttons{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 1.7rem;
    width: 7.5rem;
    z-index: 2;
    color: white;
    background-color: rgba(0,0,0,0.3);
  }
  .body{
    padding-bottom: 0.1rem;
    background-color: white;
    &.active{
      margin-top: 1rem;
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
  .notfound{
    display: flex;
    justify-content: center;
    align-items: center;
    height:1rem;
    font-size: 14px;
    color: black;
  }
}
</style>