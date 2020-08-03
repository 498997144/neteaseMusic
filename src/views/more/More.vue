<template>
  <div class="more-container">
<!--    轮播图区域-->
    <Banner></Banner>
<!--    滑块导航-->
    <Slides></Slides>
<!--    首页推荐-->
<!--    推荐歌单-->
    <Title v-if="length" :btnText="btnText(0)" :title="title(0)"></Title>
    <Rsongsheet v-if="length" :songSheet="recommendData(0)"></Rsongsheet>
<!--    推荐歌曲-->
    <Title v-if="length" @btnClick="playAllsong" :btnText="btnText(1)" :title="title(1)"></Title>
    <Rsong v-if="length" :songList="recommendData(1)"></Rsong>
<!--    官方推荐歌单-->
    <Title v-if="length" :btnText="btnText(2)" :title="title(2)"></Title>
    <Rsongsheet v-if="length" :songSheet="recommendData(2)"></Rsongsheet>
<!--    云村广场精选-->
    <Title v-if="length" :btnText="btnText(3)" :title="title(3)"></Title>
    <Rsquare v-if="length" :squareList="squareList(3)"></Rsquare>
<!--  底部刷新-->
      <div class="footer">
          <i class="ali-iconexchangerate" @click="gethomeData">点击刷新&nbsp;<span>换一批内容</span></i>
      </div>
  </div>
</template>

<script>
  import Banner from "./children/Banner";
  import Slides from "./children/Slides";
  import Title from "../../components/content/title/Title";
  import Rsongsheet from "./children/Rsongsheet";
  import Rsong from "./children/Rsong";
  import Rsquare from "./children/Rsquare";
    export default {
        name: "More",
        components:{Banner,Slides,Title,Rsongsheet,Rsong,Rsquare},
        data(){
            return {
                homeData:[]
            }
        },
        methods:{
            //获取首页数据
           async gethomeData(){
               const response = await this.axios.get(`/homepage/block/page?refresh=true`)
               if(response.code === 200){
                   this.homeData = response.data.blocks
                   console.log(response.data.blocks)
               }
           },
            //将所有歌曲添加至播放队列
           playAllsong(){
               const playList = []
               this.recommendData(1).forEach((item)=>{
                   item.resources.forEach((item)=>{
                       playList.push(item)
                   })
               })
               this.$store.commit('savePlaylist',playList)
               this.bus.$emit('toogleSong',0)
           },
        },
        computed:{
            btnText(){
                return (index)=>{
                    return this.homeData[index].uiElement.button.text
                }
            },
            title(){
                return (index)=>{
                    return this.homeData[index].uiElement.subTitle.title
                }
            },
            length(){
                return Object.keys(this.homeData).length > 0
            },
            recommendData(){
                return (index)=>{
                    return this.homeData[index].creatives
                }
            },
            squareList(){
                return (index)=>{
                    return this.homeData[index].extInfo.squareFeedViewDTOList
                }
            },
        },
        created(){
            this.gethomeData()
        },
        
    }
</script>

<style lang="less" scoped>
.more-container{
  margin-top: 0.9rem;
    .footer{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.8rem;
        i{
            color: blue;
            span{
              color: #666666;
              margin-left: 0.2rem;
            }
        }
    }
}
</style>