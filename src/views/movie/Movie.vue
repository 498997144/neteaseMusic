<template>
  <div class="movie-container">
    <!--    滑动导航-->
    <swiper :options="{slidesPerView: 'auto',freeMode: true,}" class="swiper" ref="swiper">
      <swiper-slide class="swiper-item" v-for="(item) in tabList" :key="item.id">
        <Tabctrlitem @click.native="toogle(item.id)">
          <p :class="{active:currentId === item.id}">
            <span>{{item.name}}</span>
          </p>
        </Tabctrlitem>
      </swiper-slide>
    </swiper>
<!--    视频区域-->
    <div class="videolist">
      <Video v-for="(item,index) in videodata" ref="videos" :index="index"
             :video="item.data" :key="item.data.coverUrl" @click="play">
      </Video>
    </div>
  </div>
</template>

<script>
  import Video from "../../components/content/video/Video";
    export default {
        name: "Movie",
        components:{Video},
        data(){
            return {
                tabList:[],
                currentId:666,
                videoList:[],
                page:0,
                more:true,
            }
        },
        computed:{
            videodata(){
                if(this.currentId === 666) return this.videoList
                return this.tabList.find(item =>item.id === this.currentId).videoList
            },
            videos(){
                return this.$refs.videos
            },
            videoHei(){
                return parseInt(getComputedStyle(this.videos[0].$el).height)
            },
            headerHei(){
                return this.$refs.swiper.$el.offsetHeight * 2
            },
        },
        methods:{
            play({paused},index){
                clearTimeout(this.playTimer)
                this.playTimer = setTimeout(()=>{
                    this.videos.forEach(item =>{
                        item.pause()
                    })
                    if(paused) this.videos[index].play()
                },500)
            },
            pause(){
                this.$nextTick(()=>{
                    const scrollTop = document.documentElement.scrollTop
                    const clientHei = document.documentElement.clientHeight
                    this.videos.forEach(item =>{
                        if(scrollTop >= item.$el.offsetTop + this.videoHei - this.headerHei ||
                        scrollTop + clientHei <= item.$el.offsetTop){
                            item.pause()
                        }
                    })
                })
            },
            toogle(id){
                this.currentId = id
                window.scroll(0,0)
            },
            async gettabList(){
                const response = await this.axios.get(`/video/category/list`)
                if(response.code === 200){
                    response.data.unshift({name:'推荐',id:666})
                    this.tabList = response.data.map(item => {
                        item.page = 0
                        item.more = true
                        item.videoList = []
                        return item
                    })
                    this.tabList.forEach(item => {
                        if(item.id !== 666) this.getVideos(item.id)
                    })
                }
            },
            async getAllvideo(page=this.page){
                if(!this.more) return false
                const response = await this.axios.get(`/video/timeline/all?offset=${page * 8}`)
                if(response.code === 200){
                    this.videoList = this.videoList.concat(response.datas)
                    this.page += 1
                    this.more = response.hasmore
                    console.log(this.videoList)
                }
                
            },
            async getVideos(id = this.currentId){
                const result = this.tabList.find(item => item.id === id)
                if(!result.more) return false
                const response = await this.axios.get(`/video/group?id=${id}&offset=${result.page * 8}`)
                if(response.code === 200){
                     this.tabList.forEach(item => {
                        if(item.id === id){
                            item.more = response.hasmore
                            item.videoList = item.videoList.concat(response.datas)
                            item.page += 1
                        }
                    })
                }
            },
            loadmoreData() {
                clearTimeout(this.loadTimer)
                this.loadTimer = setTimeout(()=>{
                    const scrollHeight = document.documentElement.scrollTop || window.pageYOffset
                    const clientHeight = document.documentElement.clientHeight
                    const totalHeight = document.documentElement.scrollHeight
                    if ((scrollHeight + clientHeight) >= totalHeight) {
                        switch (this.currentId) {
                            case 666:
                                return this.getAllvideo()
                            default:
                                this.getVideos()
                        }
                    }
                },500)
            },
        },
        created() {
            this.gettabList()
            this.getAllvideo()
        },
        updated() {
            window.addEventListener('scroll',this.loadmoreData)
            window.addEventListener('scroll',this.pause)
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.loadmoreData)
            window.removeEventListener("scroll", this.pause)
        }
        
    }
</script>

<style lang="less" scoped>
  .movie-container{
    .swiper{
      position: fixed;
      z-index: 2;
      width: 7.5rem;
      left: 50%;
      top: 0.9rem;
      transform: translateX(-50%);
      border-bottom: 1px solid #cccccc;
      background-color: white;
      .swiper-item{
        width: 1.8rem;
      }
    }
    .videolist{
      display: flex;
      flex-direction: column;
      margin-top:1.8rem;
      padding-bottom: 0.1rem;
    }
  }
</style>