<template>
  <div class="play-container" v-if="length && currentRoute !== 'login'">
<!--    播放控件-->
    <Player @playClick="play" @middleClick="detailShow = !detailShow"
            @listClick="toogleShow" :isPlay="isPlay" :imageUrl="imageUrl"
            :songName="songName" :names="names" :url="url" ref="audio" @ended="playEnd"
            @canplay="canplay" @timeupdate="timeupdate" @progress="loading">
    </Player>
    
<!--    播放列表-->
    <div class="musk" v-show="isShow" @click.self="listShowType">
      <ul class="playlist">
        <li class="title">
          <p>当前播放<span>({{length}})</span></p>
        </li>
        <li class="edit">
          <div :class="modes[currentMode].icon" @click="toogleMode">{{modes[currentMode].name}}</div>
          <div class="ali-iconfolder-close" @click="showColl">收藏全部</div>
          <div class="ali-iconashbin" @click="clearplayList"></div>
        </li>
        <swiper :options="playlistOption" style="height: 4.8rem;margin-bottom: 0.1rem">
          <swiper-slide style="height:auto;">
            <li class="list">
              <ul>
                <li v-for="(item,index) in playList" :key="index">
                  <p :class="{active:index == currentSong}" @click="toogleSong(index)">
                    <em class="ali-iconsound-filling"></em>
                    <span>{{listName(index)}}</span>
                    <i>{{name(index)}}</i>
                  </p>
                  <div @click="removeSong(index)">
                    <i class="ali-iconclose"></i>
                  </div>
                </li>
              </ul>
            </li>
          </swiper-slide>
<!--          <div class="swiper-scrollbar" slot="scrollbar"></div>-->
        </swiper>
      </ul>
    </div>
    
<!--    收藏区域-->
    <Dialog v-show="collShow" :isShow.sync="collShow" title="收藏到歌单">
      <div slot="right">
        <Checkbtn :isChecked.sync="isAll" ref="allBtn" @click.native="allSelect"></Checkbtn>
      </div>
      <div slot="body">
        <swiper :options="playlistOption" style="height:7.8rem">
          <swiper-slide style="height:auto;">
            <New @click.native="newsheetShow = true"></New>
            <Collsongsheet ref="collSheet" :songSheet="item" :index="index"
                           v-for="(item,index) in collSongheet" :key="index"
                           @coll="coll" @btnClick="isSelected"></Collsongsheet>
          </swiper-slide>
        </swiper>
      </div>
    </Dialog>
<!--    新建歌单-->
    <Newsheet v-show="newsheetShow" :isShow.sync="newsheetShow" @success="coll"></Newsheet>
<!--    歌曲祥情-->
    <Songdetail v-show="detailShow" :isShow.sync="detailShow"
      :songName="songName" :names="names" :imageUrl="imageUrl"
    :isPlay="isPlay" @playClick="play" @next="next" @prev="prev"
    @listClick="toogleShow" :currentTime="currentTime" :totalTime="totalTime"
    @input="timeChange" :loadingTime="loadingTime" :id="id">
    </Songdetail>
  </div>
</template>

<script>
  import Dialog from "../../common/dialog/Dialog";
  import Collsongsheet from "./children/Collsongsheet";
  import Player from "./children/Player";
  import Checkbtn from "../../common/checkbtn/Checkbtn";
  import New from "./children/New";
  import Newsheet from "./children/Newsheet";
  import Songdetail from "./children/Songdetail";
    export default {
        name: "Play",
        components:{Dialog,Collsongsheet,New,Newsheet,Checkbtn,Songdetail,Player},
        data(){
            return {
                isShow:false, //播放列表显示
                isPlay:false, //播放状态
                currentSong:0, //当前歌曲
                url:'', //歌曲url
                modes:[
                    {mode:'singleLoop',name:'单曲循环',icon:'ali-iconexchangerate'},
                    {mode:'listLoop',name:'列表循环',icon:'ali-iconhistory'},
                    {mode:'random',name:'随机播放',icon:'ali-iconsalescenter'}
                ],//播放模式
                currentMode:1, //当前播放模式
                playlistOption:{
                    // scrollbar: {
                    //     el: '.swiper-scrollbar',
                    //     // hide: true,
                    // },
                    direction:'vertical',
                    slidesPerView:'auto',
                    freeMode:true,
                    mousewheel: true,
                    setWrapperSize: true,
                    // roundLengths: true,
                }, //滑动配置
                currentRoute:'', //当前路由
                collShow:false,  //收藏到歌单显示
                newsheetShow:false, //新建歌显示
                collSongheet:[],//用户歌单
                isAll:false, //是否全选
                detailShow:false, //播放祥显示
                currentTime:0,//当前播放的时间
                totalTime:0, //总的时间
                updateFlag:true,//更新时间控制
                loadingTime:0,//当前加载的时间
            }
        },
        methods:{
            //播放控制
            play(){
                if(!this.isPlay){
                    this.audio.play()
                    this.isPlay = true
                }else{
                    this.audio.pause()
                    this.isPlay = false
                }
                // console.log(this.totalTime)
            },
            //切换播放模式
            toogleMode(){
                this.currentMode++
                if(this.currentMode > 2){
                    this.currentMode = 0
                }
                if(this.currentMode < 0){
                    this.currentMode = 2
                }
            },
            //下一首
            next(){
                this.currentSong++
                if(this.currentSong === this.length){
                    this.currentSong = 0
                }
                this.toogleSong(this.currentSong)
            },
            //上一首
            prev(){
                this.currentSong--
                if(this.currentSong < 0){
                    this.currentSong = this.length - 1
                }
                this.toogleSong(this.currentSong)
            },
            //播放结束控制
            playEnd(){
                this.isPlay = false
                switch (this.currentMode) {
                    case 0:
                        this.play()
                        break
                    case 1:
                        this.currentSong++
                        if(this.currentSong === this.length){
                            this.currentSong = 0
                        }
                        this.toogleSong(this.currentSong)
                        break
                    case 2:
                        var randomSong = Math.floor(Math.random() * (this.length - 1))
                        this.toogleSong(randomSong)
                }
            },
            //切换歌曲
            toogleSong(index){
                this.currentSong = index
                this.isPlay = false
                // this.audio.pause()
                if(this.playTimer){
                    clearTimeout(this.playTimer)
                }
                this.playTimer = setTimeout(this.play,500)
            },
            //删除歌曲
            removeSong(index){
                this.$store.commit('removeSong',index)
                if(index < this.currentSong && this.currentSong > 0){
                    this.currentSong--
                }
                if(index === this.currentSong && this.currentSong > 0){
                    this.toogleSong(index)
                }
                if(this.currentSong === this.length){
                    this.toogleSong(index - 1)
                }
            },
            //清空播放列表
            clearplayList(){
                this.confirm('确定要清空播放列表吗?',()=>{
                    this.$store.commit('clearPlaylist')
                })
            },
            //获取歌曲url
           async getsongUrl(){
               const response = await this.axios.get(`/song/url?id=${this.id}`)
               if(response.code === 200){
                   this.url = response.data[0].url
               }
            },
            //获取用户歌单
           async showColl(){
               const response = await this.axios.get(`/user/playlist?uid=${this.userId}`)
               if(response.code === 200){
                   this.collSongheet = response.playlist
                   this.collShow = true
               }else {
                   this.toast(response.msg)
               }
            },
            //切换播放列表显示
            toogleShow(type){
                this.showType = type
                switch (type) {
                    case 1:
                        this.isShow = !this.isShow
                        break
                    case 2:
                        this.isShow = !this.isShow
                        this.detailShow = !this.detailShow
                        break
                }
            },
            //根据当前showType决定歌曲祥情页的显示
            listShowType(){
                if(this.showType === 1){
                    this.isShow = !this.isShow
                }else {
                    this.detailShow = !this.detailShow
                    this.isShow = !this.isShow
                }
            },
           async coll(sheetId){
               const songIds = []
               this.playList.forEach((item)=>{
                   songIds.push(item.resourceExtInfo.songData.id)
               })
               const response = await this.axios.get(`/playlist/tracks?op=add&pid=${sheetId}&tracks=${songIds.join()}`)
               if(response.code === 200){
                   this.toast('收藏成功')
                   this.showColl()
               }else{
                   this.toast(response.msg)
               }
               console.log(response)
           },
            //全选、反选
            allSelect(){
                this.$refs.collSheet.forEach(item => item.isChecked = !this.isAll)
            },
            // 是否全选
            isSelected(){
               
                const isAll = !this.$refs.collSheet.find((item)=>{
                     return item.$children[0].$el.firstChild.checked === false
                 })
                this.isAll = isAll
            },
            canplay({duration,currentTime}){
                this.totalTime = duration
                this.currentTime = currentTime
            },
            timeupdate({currentTime}){
               this.updateFlag && (this.currentTime = currentTime)
            },
            timeChange({value}){
                this.updateFlag = false
                this.currentTime = value
                clearTimeout(this.audioTimer)
                this.audioTimer = setTimeout(()=>{
                    this.audio.currentTime = value
                    this.updateFlag = true
                },1000)
            },
            loading({buffered}){
                this.loadingTime = buffered.end(buffered.length - 1)
            },
        },
        watch:{
            //当前歌曲id
            id(){
                if(this.id){
                    this.getsongUrl()
                    this.bus.$emit('changeId',this.id)
                }
            },
            //如何播列为空隐藏播放控制
            length(){
                if(!this.length){
                    this.isShow = false
                }
            },
            //监路当前路由,控制在某些页面不要显示控件
            $route(route){
                this.currentRoute = route.matched[0].name
            },
        },
        computed:{
            //audio
            audio(){
               return this.$refs.audio.$el.lastChild
            },
            //播放列表
            playList(){
                return this.$store.state.playList
            },
            //播放列表长度
            length(){
                return this.$store.state.playList.length
            },
           
            //播放列表歌曲名字
            listName(){
                return function (index) {
                   return this.playList[index].resourceExtInfo.songData.name
                }
            },
            //拼接播放列表歌手名字
            name(){
                return function (index) {
                    let names = '-'
                    this.playList[index].resourceExtInfo.artists.forEach((item)=>{
                        names += item.name + '/'
                    })
                    names = names.substring(0,names.length-1)
                    return names
                }
            },
            //拼接当前歌曲多个歌手名字
            names(){
                let names = ''
                this.playList[this.currentSong].resourceExtInfo.artists.forEach((item)=>{
                    names += item.name + '/'
                })
                names = names.substring(0,names.length-1)
                return names
            },
            //当前歌曲名字
            songName(){
                return this.playList[this.currentSong].resourceExtInfo.songData.name
            },
            //歌曲ID
            id(){
                if(this.length){
                    return this.playList[this.currentSong].resourceExtInfo.songData.id
                }else {
                    return false
                }
            },
            //歌曲图片
            imageUrl(){
               return  this.playList[this.currentSong].uiElement.image.imageUrl
            },
            //用户id
            userId(){
                return this.$store.state.userInfo.profile.userId
            },
        },
        created() {
            //如果id为真发送请求获取歌曲url
            if(this.id){
                this.getsongUrl()
            }
        },
        mounted() {
            //接收推荐歌曲点击播放的是哪首歌曲
            this.bus.$on('play',(songId)=>{
               const index = this.playList.findIndex((item)=>{
                    return songId === item.resourceExtInfo.songData.id
                })
                if(index !== this.currentSong){
                    this.toogleSong(index)
                }
            })
            //接收播放全按钮点击后切换歌曲
            this.bus.$on('toogleSong',this.toogleSong)
        },
    }
</script>

<style lang="less" scoped>
.play-container{
  
  .musk {
    .playlist {
      position: absolute;
      left: 50%;
      bottom: 1.2rem;
      transform: translateX(-50%);
      width: 7rem;
      background-color: white;
      border-radius: 0.1rem;
      overflow: hidden;
      box-shadow: 1px 4px 5px 2px rgba(95, 89, 89, 0.76);
    
      .title {
        height: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
      
        p {
          color: black;
          font-size: 14px;
          font-weight: 600;
        
          span {
            color: #666666;
            font-size: 12px;
          }
        }
      }
    
      .edit {
        display: flex;
        height: 0.8rem;
        border-bottom: 1px solid #666666;
        border-top: 1px solid #666666;
      
        div,button,a {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          cursor: pointer;
        }
      }
    
      .list {
        ul {
          li {
            display: flex;
            height: 0.6rem;
  
            p {
              flex: 85%;
              display: flex;
              align-items: center;
    
              &.active {
                color: red;
      
                span {
                  color: red;
                }
              }
    
              em {
                margin-left: 0.2rem;
              }
    
              span {
                margin-left: 0.2rem;
                color: black;
                font-size: 14px;
                width: 2rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
    
              i {
                width: 2.5rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
            }
  
            div {
              flex: 15%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>