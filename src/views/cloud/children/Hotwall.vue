<template>
  <div class="hotwall-container">
    <swiper ref="swiper" :options="swiperOptions">
      <swiper-slide v-for="(item,index) in hotwallList" :key="item.id">
        <div class="avatar">
          <img :src="item.simpleUserInfo.avatar">
          <span>{{item.simpleUserInfo.nickname}}</span>
          <i>{{item.time | dateFormat('YYYY.MM.DD HH:mm:ss')}}</i>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="song">
          <span class="elli">歌曲 : {{item.simpleResourceInfo.song.name}}-{{item.simpleResourceInfo.song.ar[0].name}}</span>
          <i class="ali-iconfavorites"></i>
          <audio ref="audio" :src="item.url" :preload="index == currentIndex?'auto':'none'" loop="loop"></audio>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    
    <swiper ref="comentSwiper" :options="commentOptions" class="comment-swiper">
      <swiper-slide v-for="(item) in hotComments" :key="item.id" class="comment-slide">
        <div class="comment">
          <img :src="item.user.avatarUrl">
          <span class="elli">{{item.content}}</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
    export default {
        name: "Hotwall",
        data(){
            return {
                hotwallList:[],
                hotComments:[],
                currentIndex:0,
                indexFlag:false,
                swiperOptions:{
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type:'fraction',
                    },
                    loop: true,
                    speed: 500,
                    initialSlide: 1,
                    observer:true,
                    observeParents:true,
                    on: {
                        slideChangeTransitionEnd:()=>{
                            this.$nextTick(()=>{
                                if(this.indexFlag){
                                    this.currentIndex = this.swiper.swiperInstance.realIndex
                                }
                                this.indexFlag = true
                            })
                        },
                    },
                },
                commentOptions:{
                    direction:'vertical',
                    slidesPerView:'auto',
                    loop: true,
                    speed: 1200,
                    initialSlide: 1,
                    observer:true,
                    observeParents:true,
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false,
                    },
                },
            }
        },
        computed:{
            swiper(){
                return this.$refs.swiper
            },
        },
        watch:{
            hotwallList(){
                this.gethotComment()
                this.$nextTick(()=>{
                    this.$refs.audio[this.currentIndex].play()
                })
            },
            currentIndex(index){
                this.gethotComment()
                for(let audio of this.$refs.audio){
                    audio.pause()
                }
                this.$refs.audio[index].play()
            },
        },
        methods:{
            async gethotWall(){
                const response = await this.axios.get(`/comment/hotwall/list`)
                if(response.code === 200){
                    const songIds = response.data.map(item => item.simpleResourceInfo.songId).join()
                    const songresponse = await this.axios.get(`/song/url?id=${songIds}`)
                    if(songresponse.code === 200){
                        response.data.forEach(item =>{
                            const result = songresponse.data.find(urlItem => item.simpleResourceInfo.songId === urlItem.id)
                            item.url = result.url
                        })
                        this.hotwallList = response.data
                    }
                }
            },
            async gethotComment(){
                const threadId = this.hotwallList[this.currentIndex].threadId
                const response = await this.axios.get(`/comment/event?threadId=${threadId}`)
                if(response.code === 200){
                    this.hotComments = response.hotComments
                }
            },
        },
        created() {
            this.gethotWall()
        },
    }
</script>

<style lang="less" scoped>
  .hotwall-container{
    position: fixed;
    width: 7.5rem;
    left: 50%;
    transform: translateX(-50%);
    height: calc(100% - 2.8rem);
    background: linear-gradient(to bottom, #1f221c, #999999);
    .avatar{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1rem;
      img{
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 50%;
      }
      span{
        margin-left: 0.2rem;
        color: white;
        font-weight: 600;
      }
      i{
        color: white;
        margin-left: 0.2rem;
      }
    }
    .content{
      height: 2.4rem;
      overflow-y: auto;
      padding: 0 0.4rem;
      font-size: 0.3rem;
      font-weight: 600;
      color: white;
      line-height: 0.6rem;
      text-indent: 0.6rem;
      &::-webkit-scrollbar{
        width: 5px;
      }
      &::-webkit-scrollbar-track{
        background-color: white;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #b6b6b6;
      }
    }
    .song{
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .swiper-pagination{
      color: white;
      bottom: 0px;
    }
    .comment-swiper{
      position: absolute;
      width: 7.5rem;
      height: 1.4rem;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
    .comment-slide{
      display:flex;
      align-items: center;
      height: 0.7rem;
      padding: 0 0.2rem;
    }
    .comment{
      display: flex;
      align-items: center;
      padding: 0.2rem;
      height: 0.6rem;
      background-color:rgba(0,0,0,0.3);
      border-radius: 0.3rem;
      color: white;
      img{
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 50%;
      }
      span{
        margin-left: 0.2rem;
        max-width: 6rem;
      }
    }
  }
</style>