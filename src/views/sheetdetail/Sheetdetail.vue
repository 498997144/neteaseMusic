<template>
  <div class="sheetdetail-container">
    <!--    头部区域-->
    <Header class="header" v-show="!searchShow">
      <i slot="left" class="ali-iconarrow-lift" @click="$router.go(-1)"></i>
      <div slot="middle" class="center">
        <span>歌单祥情</span>
        <i class="ali-iconsearch" @click="searchShow = !searchShow"></i>
      </div>
      <i slot="right" class="ali-iconmore"></i>
    </Header>
    <!--    搜索头部-->
    <Header class="search-header" v-show="searchShow">
      <i slot="left" class="ali-iconarrow-lift" @click="toogleShow"></i>
      <div slot="middle" class="search-center">
        <Input class="search" v-show="searchShow" placeholder="搜索歌单内歌曲" v-model.trim="query" />
      </div>
    </Header>
<!--    歌单祥情-->
    <div class="sheetdetail">
<!--      祥情信息-->
      <div class="info">
        <div class="image">
          <div>
            <img :src="sheetDetail.coverImgUrl">
            <span class="ali-iconarrow-right-filling">{{sheetDetail.playCount | playCountFilter}}</span>
          </div>
        </div>
        <ul class="detail">
          <li class="name">{{sheetDetail.name}}</li>
          <li class="creator">
            <img :src="creator.avatarUrl">
            <span>{{creator.nickname}} ></span>
          </li>
          <li class="desc">
            <p>{{sheetDetail.description}}</p>
            <span>></span>
          </li>
        </ul>
      </div>
<!--      按钮-->
      <ul class="btns">
        <li>
          <i class="ali-iconcomments"></i>
          <span>{{sheetDetail.commentCount | countFilter}}</span>
        </li>
        <li>
          <i class="ali-iconsalescenter"></i>
          <span>{{sheetDetail.shareCount | countFilter}}</span>
        </li>
        <li>
          <i class="ali-icondownload"></i>
          <span>下载</span>
        </li>
        <li @click="showCheck">
          <i class="ali-iconnav-list"></i>
          <span>多选</span>
        </li>
      </ul>
      <Buttons v-show="checkbtnShow" @click="btnCliick" :buttonList="buttonList" class="buttons"></Buttons>
    </div>
<!--       主体-->
    <div class="body">
      <!--      播放按钮-->
      <div class="playall">
        <span class="ali-iconplay" @click="playAll">播放全部<i>共({{sheetDetail.trackCount}})首</i></span>
        <p @click="collSheet" :class="{active:isColl}"> + 收藏({{sheetDetail.subscribedCount | countFilter}})</p>
      </div>
      <!--      歌曲列表-->
      <ul class="songlist">
        <Song v-for="(item,index) in playList" :key="item.id" :index="index" :song="item"></Song>
        <!--      选择按钮区-->
        <div class="check" v-show="checkbtnShow">
          <Checkbtn v-for="(item) in playList" :value="item.id"  :key="item.id"
                    ref="selectBtn"  @pushitem="pushitem" @removeitem="removeitem">
          </Checkbtn>
        </div>
      </ul>
<!--      收藏者-->
      <ul class="colluser">
        <li v-for="item in sheetDetail.subscribers.slice(0,5)" :key="item.userId">
          <img :src="item.avatarUrl">
        </li>
        <span>{{sheetDetail.subscribedCount | countFilter}}人收藏</span>
      </ul>
    </div>
    {{isColl}}
<!--    搜索列表-->
    <Searchlist :searchList="searchList" :keyword="query" :tipShow="tipShow" v-show="searchShow"></Searchlist>
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
  import Searchlist from "./children/Searchlist";
  import {collsongSheet,slectAction} from "../../assets/js/mixin"
    export default {
        name: "Sheetdetail",
        mixins:[collsongSheet,slectAction],
        components:{Searchlist,},
        data(){
            return {
                id:this.$route.params.id,
                sheetDetail:{
                    commentCount:'',
                    shareCount:'',
                    subscribedCount:'',
                    subscribers:[],
                    tags:[],
                    playCount:'',
                    trackCount:'',
                    coverImgUrl:'',
                    id:'',
                    userId:'',
                    description:'',
                    name:'',
                },
                songList:[],
                privileges:[],
                creator:{},
                searchShow:false,
                query:'',
                searchList:[],
                tipShow:false,
            }
        },
        watch:{
            query(query){
                this.searchList = []
                if(!query) return
                let Uquery = ''
                for(let i = 0;i<query.length;i++){
                    if(/[\u4e00-\u9fa5]/.test(query.charAt(i))){
                        Uquery += `[\\u${query.charCodeAt(i).toString(16)}]`
                    }else {
                        Uquery += query.charAt(i)
                    }
                }
                const reg = RegExp(`${Uquery}`,'i')
                const searchList = []
                this.playList.forEach((song) =>{
                    if(reg.test(song.name)) return searchList.push(song)
                    if(reg.test(song.al.name)) return searchList.push(song)
                    for(let singer of song.ar){
                        if(reg.test(singer.name)){
                            searchList.push(song)
                            break
                        }
                    }
                })
                this.searchList = searchList
                if(this.searchList.length){
                    this.tipShow = false
                }else{
                    this.tipShow = true
                }
            },
        },
        computed:{
            //构建播放队列
            playList(){
                const playList =  this.songList.map((item,index)=>{
                    const song = {}
                    song.id = item.id
                    song.name = item.name
                    song.ar = item.ar
                    song.al = item.al
                    song.privilege = this.privileges[index]
                    return song
                })
                return playList
            },
            //
            isColl(){
                return this.userSongheet.find(item => item.id === this.id)
            },
        },
        methods:{
            async getDetail(id = this.id){
                const response = await this.axios.get(`/playlist/detail?id=${id}`)
                console.log(response)
                if(response.code === 200){
                    const ids = response.playlist.trackIds.map(item => item.id).join()
                    const songresponse = await this.axios.get(`/song/detail?ids=${ids}`)
                    if(songresponse.code === 200){
                        this.songList = songresponse.songs
                        this.privileges = songresponse.privileges
                        console.log(songresponse)
                    }
                    this.sheetDetail.songList = response.playlist.coverImgUrl
                    this.sheetDetail.commentCount = response.playlist.commentCount
                    this.sheetDetail.shareCount = response.playlist.shareCount
                    this.sheetDetail.subscribedCount = response.playlist.subscribedCount
                    this.sheetDetail.subscribers = response.playlist.subscribers
                    this.sheetDetail.tags = response.playlist.tags
                    this.sheetDetail.playCount = response.playlist.playCount
                    this.sheetDetail.trackCount = response.playlist.trackCount
                    this.sheetDetail.coverImgUrl = response.playlist.coverImgUrl
                    this.sheetDetail.name = response.playlist.name
                    this.sheetDetail.description = response.playlist.description
                    this.sheetDetail.id = response.playlist.id
                    this.sheetDetail.userId = response.playlist.userId
                    this.creator = response.playlist.creator
                }
            },
            async collSheet(){
                if(!this.isColl){
                    const response = await this.axios.get(`/playlist/subscribe?t=1&id=${this.id}`)
                    if(response.code === 200){
                        this.toast('收藏成功')
                        this.$store.dispatch('getusersongSheet',this.userId)
                    }
                }else {
                    const response = await this.axios.get(`/playlist/subscribe?t=2&id=${this.id}`)
                    if(response.code === 200){
                        this.toast('取消收藏')
                        this.$store.dispatch('getusersongSheet',this.userId)
                    }
                }
            },
            toogleShow(){
                this.searchShow = !this.searchShow
                this.query = ''
            },
        },
        filters:{
            countFilter(number){
                if(number >= 10000 && number < 100000000){
                    return `${(number / 10000).toFixed(1)}万`
                }
                if(number >= 100000000){
                    return `${(number / 1000000000).toFixed(1)}亿`
                }
                return number
            },
        },
        created() {
           this.getDetail()
        },
    }
</script>

<style lang="less" scoped>
.sheetdetail-container{
  .header {
    color: white;
    background-color: transparent;
    .center {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-size: 14px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 20% 0 0;
      }
    }
  }
  
  .search-header{
    color: white;
    background-color: transparent;
    .search-center{
      display: flex;
      justify-content: center;
      align-items: center;
      width:100%;
      height:100%;
     .search{
        width: 80%;
      /deep/ input{
        color: white;
        border-bottom: 1px solid white;
        &::-webkit-input-placeholder{
          color: white;
        }
       }
      }
    }
  }
  
  .sheetdetail{
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 7.5rem;
    height: 5.6rem;
    background-color:rgba(0,0,0,0.8);
    z-index: 2;
    .info{
      display: flex;
      margin-top: 0.9rem;
      padding: 0.2rem 0;
      .image{
        flex: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        div{
          position: relative;
          border-radius:0.1rem;
          overflow: hidden;
          img{
            width: 2.4rem;
            height: 2.4rem;
          }
          span{
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
            color: white;
            font-size:12px;
            &::before{
              font-size: 0.4rem;
            }
          }
        }
      }
      .detail{
        flex: 60%;
        display: flex;
        flex-direction: column;
        li{
          flex: 1;
          padding-right: 0.2rem;
          line-height: 0.4rem;
          overflow: hidden;
        }
        .name{
          font-size: 14px;
          font-weight: 600;
          color: white;
        }
        .creator{
          display: flex;
          align-items: center;
          img{
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
          }
          span{
            color:white;
            margin-left: 0.15rem;
          }
        }
        .desc{
          display: flex;
          align-items: center;
          justify-content: space-between;
          p{
            width: 3rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 0.4rem;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow:ellipsis
          }
        }
      }
    }
    .btns {
      display: flex;
      height: 1rem;
      position: absolute;
      bottom: 0;
      width: 7.5rem;
      z-index: 2;
      color: white;
      background-color: transparent;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .buttons{
      position: absolute;
      bottom: 1rem;
      width: 7.5rem;
      z-index: 2;
      color: white;
      background-color: transparent;
    }
  }
  .body{
    margin-top: 5.6rem;
    padding-bottom: 0.1rem;
    background-color: white;
    .playall{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      padding: 0 0.2rem;
      span{
        color: black;
        font-size: 14px;
        i{
          font-size: 12px;
          color: #a4a4a4;
        }
      }
      p{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.5rem;
        padding: 0 0.1rem;
        color: white;
        border-radius: 0.25rem;
        background-color: red;
        &.active{
          background-color: #8f8f8f;
        }
      }
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
  .colluser{
    display: flex;
    height: 1rem;
    li{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      img{
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
      }
    }
    span{
      display: flex;
      flex: 30% 0 0;
      justify-content: center;
      align-items: center;
    }
  }
  
}

</style>