<template>
  <div class="my-container">
    <div class="header">
      <!--   用户信息-->
      <Userinfo></Userinfo>
      <!--  按钮-->
      <Buttons :buttonList="buttonList" class="buttons"></Buttons>
    </div>
<!--              播放历史-->
    <div class="playhistory">
      <Title class="title" title="最近播放">
        <span @click="$router.push({name:'playhistory',params:{data:playHistoryList}})">更多></span>
      </Title>
      <div class="song" @click="addSong(item)" v-for="(item) in playHistoryList.slice(0,6)" :key="item.song.id">
        <div class="image">
          <img :src="item.song.al.picUrl">
        </div>
        <div class="center">
          <p class="name">
            <span class="elli">{{item.song.name}}</span>
          </p>
          <p class="count">播放{{item.playCount}}次</p>
        </div>
      </div>
    </div>
    <div class="sheet">
      <ul class="cate">
        <li :class="{active:currentIndex === 0}" @click="currentIndex = 0">
          创建的歌单<span>({{createsheetList.length}})</span>
        </li>
        <li :class="{active:currentIndex === 1}" @click="currentIndex = 1">
          收藏的歌单<span>({{collsheetList.length}})</span>
        </li>
      </ul>
<!--      创建的歌单-->
      <div v-show="currentIndex === 0" class="songsheet" v-for="(item,index) in createsheetList"
           @click="$router.push({name:'sheetdetail',params:{id:item.id}})" :key="item.id">
        <div class="image">
          <img :src="item.coverImgUrl">
          <i class="ali-iconpassword" v-if="item.privacy"></i>
        </div>
        <div class="center">
          <p class="name">
            <span class="elli">{{index?item.name:'我喜欢的音乐'}}</span>
          </p>
          <p class="count">{{item.trackCount}}首</p>
        </div>
        <div class="delete" @click.stop="removeSheet(item.id)">
          <i class="ali-iconclose" v-if="index && item.userId === userId"></i>
        </div>
      </div>
      <New @click.native="newsheetShow = true" style="width: 50%" v-show="currentIndex === 0"></New>
<!--      收藏的歌单-->
      <div v-show="currentIndex === 1" class="songsheet" v-for="(item,index) in collsheetList"
           @click="$router.push({name:'sheetdetail',params:{id:item.id}})" :key="item.id">
        <div class="image">
          <img :src="item.coverImgUrl">
          <i class="ali-iconpassword" v-if="item.privacy"></i>
        </div>
        <div class="center">
          <p class="name">
            <span class="elli">{{item.name}}</span>
          </p>
          <p class="count">{{item.trackCount}}首</p>
        </div>
        <div class="delete">
          <i class="ali-iconclose" v-if="index && item.userId === userId"></i>
        </div>
      </div>
    </div>
    
    <!--    新建歌单-->
    <Newsheet v-show="newsheetShow" :isShow.sync="newsheetShow" @success="$store.dispatch('getusersongSheet')"></Newsheet>
  </div>
</template>

<script>
  import Userinfo from "./children/Userinfo";
  import Buttons from "../../components/common/buttons/Buttons";
  import New from "../../components/content/play/children/New";
  import Newsheet from "../../components/content/play/children/Newsheet";
  import Title from "../../components/content/title/Title";
    export default {
        name: "My",
        components:{Userinfo,Buttons,Newsheet,New,Title},
        data(){
            return {
                newsheetShow:false, //新建歌单显示
                currentIndex:0,
                currentId:'',
                buttonList:[
                    {icon:'ali-iconyinyue',text:'本地音乐'},
                    {icon:'ali-icondownload',text:'下载管理'},
                    {icon:'ali-icondiantai',text:'电台'},
                    {icon:'ali-iconcollection',text:'我的收藏'},
                    {icon:'ali-iconnew1',text:'关注新歌'},
                ],//按钮
                playHistoryList:[],
            }
        },
        computed:{
            //用户id
            userId(){
                return this.$store.state.userInfo.profile.userId
            },
            //用户歌单
            userSongsheet(){
                return this.$store.state.userSongsheet
            },
            collsheetList(){
                return this.userSongsheet.filter(item => item.userId !== this.userId)
            },
            createsheetList(){
                return this.userSongsheet.filter(item => item.userId === this.userId)
            },
        },
        methods:{
            removeSheet(id){
                this.confirm('确定要删除此歌单吗?',async ()=>{
                    const response = await this.axios.get(`/playlist/delete?id=${id}`)
                    if(response.code === 200){
                        this.toast('删除成功')
                        this.$store.dispatch('getusersongSheet',this.userId)
                    }
                })
            },
            async getplayHistory(){
                const response = await this.axios.get(`/user/record?uid=${this.userId}&type=0`)
                if(response.code === 200){
                    this.playHistoryList = response.allData
                }
            },
            //添加歌曲到播放列表
            addSong(item){
                if(this.currentId !== item.song.id){
                    const song = {}
                    song.id = item.song.id
                    song.name = item.song.name
                    song.ar = item.song.ar
                    song.al = item.song.al
                    song.privilege = item.song.privilege
                    this.$store.commit('addSong',song)
                    this.bus.$emit('play',song.id)
                }else {
                    this.bus.$emit('showDetail')
                }
            },
        },
        created() {
            this.getplayHistory()
        },
        mounted() {
            //接收播放列表id改变,如果id相同则收变播放按钮为播放状态
            this.bus.$on('changeId',(id)=>{
                this.currentId = id
            })
        }
    }
</script>

<style lang="less" scoped>
.my-container{
  margin-top: 0.9rem;
  .header{
    background-color: #282828;
    .buttons{
      color: white;
     /deep/ li:nth-child(3){
       span{
         margin-top: 0.05rem;
       }
       i::before{
         font-size: 0.45rem;
       }
     }
     /deep/ li:nth-child(5){
       span{
          margin-top: 0.05rem;
        }
        i::before{
          font-size: 0.45rem;
        }
      }
    }
  }
  .playhistory{
    display: flex;
    flex-wrap: wrap;
    .title{
      width: 100%;
      color: black;
      padding: 0 0.3rem;
      span{
        color: #666666;
        font-size: 12px;
      }
    }
    .song{
      display: flex;
      flex: 50%;
      height: 1rem;
      margin: 0.1rem 0;
      .image{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.4rem;
        img{
          height: 1rem;
          height: 1rem;
          border-radius: 0.1rem;
        }
      }
      .center{
        display: flex;
        flex: 1;
        flex-direction: column;
        .name{
          display: flex;
          flex: 1;
          align-items: center;
          font-size: 14px;
          color: black;
          span{
            width: 1.5rem;
          }
        }
        .count{
          display: flex;
          flex: 1;
          align-items: center;
        }
      }
    }
  }
  .sheet{
    display: flex;
    flex-wrap: wrap;
    .cate{
      display: flex;
      align-items: center;
      font-size: 14px;
      height: 0.6rem;
      width: 100%;
      li{
        margin-left: 0.3rem;
        font-weight: 600;
        &.active{
          color: black;
        }
        span{
          font-size: 12px;
          color: #8f8f8f;
        }
      }
    }
    .songsheet{
      display: flex;
      flex: 50%;
      height: 1rem;
      margin: 0.1rem 0;
      .image{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1.4rem;
        i{
          position: absolute;
          right: 0.3rem;
          bottom:0.1rem;
          color: white;
          &::before{
            font-size: 0.3rem;
          }
        }
        img{
          height: 1rem;
          height: 1rem;
          border-radius: 0.1rem;
        }
      }
      .center{
        display: flex;
        flex: 1;
        flex-direction: column;
        .name{
          display: flex;
          flex: 1;
          align-items: center;
          font-size: 14px;
          color: black;
          span{
            width: 1.5rem;
          }
        }
        .count{
          display: flex;
          flex: 1;
          align-items: center;
        }
      }
      .delete{
        display: flex;
        flex: 0.8rem 0 0;
        justify-content: center;
        align-items: center;
      }
    }
  }
  
}
</style>