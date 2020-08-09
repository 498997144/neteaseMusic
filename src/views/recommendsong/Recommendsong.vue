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
                  ref="checkBtn"  @pushitem="pushitem" @removeitem="removeitem">
          </Checkbtn>
        </div>
      </ul>
    </div>
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
  import Song from "../../components/content/song/Song";
  import Buttons from "../../components/common/buttons/Buttons";
  import {collsongSheet} from "../../assets/js/mixin"
    export default {
        name: "Recommendsong",
        components:{Song,Buttons},
        mixins:[collsongSheet],
        data(){
            return {
                songData:{
                    dailySongs:[],
                    orderSongs:[],
                    recommendReasons:[],
                },//每日推荐数据
                buttonList:[
                    {icon:'ali-iconplay',text:'下一首播放'},
                    {icon:'ali-iconadd',text:'加入歌单'},
                    {icon:'ali-icondownload',text:'下载'},
                    {icon:'ali-iconashbin',text:'删除下载'},
                ],//按钮
                currentSong:0, //当前正在播放第几首歌曲
                checkSongs:[], //选中的歌曲
                checkbtnShow:false, //选择歌曲显示隐藏
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
            //选择歌曲
            pushitem(value){
                this.checkSongs.push(value)
            },
            removeitem(value){
               const index = this.checkSongs.findIndex((item)=>{
                    return item === value
                })
                this.checkSongs.splice(index,1)
            },
            //按钮点击
            btnCliick(index){
                switch (index) {
                    case 0:
                        if(this.checkSongs.length){
                            //取出选中的歌曲
                            const checkSongs = []
                            this.checkSongs.forEach((id)=>{
                               const song =  this.playList.find((item)=>{
                                    return item.id == id
                                })
                                checkSongs.push(song)
                            })
                            //检查重复
                            const repeatSongs = []
                            checkSongs.forEach((item)=>{
                                const song = this.$store.state.playList.find((song)=>{
                                    return item.id == song.id
                                })
                                if(song){
                                    repeatSongs.push(song)
                                }
                            })
                            if(repeatSongs.length){
                                this.toast('重复歌曲')
                            }else {
                                this.$store.commit('Additional',{index:this.currentSong,songs:checkSongs})
                            }
                        }
                        break
                    case 1:
                        this.checkbtnShow = false
                        this.showColl()
                        break
                }
            },
            //播放全部
            playAll(){
                this.$store.commit('savePlaylist',this.playList)
                this.bus.$emit('toogleSong',0)
            },
            //显示选择按钮
            showCheck(){
                this.checkbtnShow = !this.checkbtnShow
                if(!this.checkbtnShow){
                    this.checkSongs = []
                    this.$refs.checkBtn.forEach(item => item.reset())
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
            //收藏歌曲的Id
            collsongsid(){
               return this.checkSongs
            },
        },
        mounted() {
            //接收播放列表id改变,记录当前播放歌曲的id
            this.bus.$on('changeSong',(currentSong)=>{
                this.currentSong = currentSong
            })
        }
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