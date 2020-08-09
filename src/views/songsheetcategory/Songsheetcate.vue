<template>
  <div class="songsheetcate-container">
    <!--    头部区域-->
    <Header class="header">
      <i slot="left" class="ali-iconarrow-lift" @click="$router.push({name:'more'})"></i>
      <div slot="middle" class="center">歌单广场</div>
      <i slot="right" class="ali-iconall" @click="$router.push({name:'tagcategories'})"></i>
    </Header>
    <!--    滑动导航-->
    <swiper :options="{slidesPerView: 'auto',freeMode: true,}" class="swiper">
      <swiper-slide class="swiper-item" v-for="(item,index) in tabList" :key="index">
        <Tabctrlitem @click.native="toogle(index)">
          <p :class="{active:currentIndex === index}">
            <span>{{item.name}}</span>
          </p>
        </Tabctrlitem>
      </swiper-slide>
    </swiper>
    <!--    轮播推荐-->
    <swiper :options="bannerOptions" class="banner" v-if="!currentIndex">
      <swiper-slide class="banneritem" v-for="item in swiperData" :key="item.id">
        <div>
          <img :src="item.coverImgUrl">
          <span class="ali-iconarrow-right-filling">{{item.playCount | playCountFilter}}</span>
        </div>
        <p>{{item.name}}</p>
      </swiper-slide>
    </swiper>
    
    <!--    歌单列表-->
    <div :class="['songsheetlist',{active:currentIndex}]" v-if="tag">
      <Songsheet class="songsheetitem" v-for="(item,index) in tagList"
                  :songItem="item" :key="index">
      </Songsheet>
    </div>
    <div :class="['songsheetlist',{active:currentIndex}]" v-else>
      <Songsheet class="songsheetitem" v-for="(item,index) in songsheetList"
                 :picUrl="picUrl(index)" :songItem="item" :key="index">
      </Songsheet>
    </div>
  </div>
</template>

<script>
    import Songsheet from "../../components/content/songsheet/Songsheet";
    
    export default {
        name: "Songsheetcate",
        components: {Songsheet},
        data() {
            return {
                tabList: [
                    {name: '全部'}, {name: '推荐'}, {name: '精品'}, {name: '华语'}, {name: '流行'},
                    {name: '电子'},{name: '民谣'}, {name: '轻音乐'},
                ],
                tags:{
                    tagList:[],
                    categories:{},
                },
                currentIndex: 0,
                currentType: 'all',
                songsheets: {
                    all: {
                        songsheetList: [],
                        total: 1,
                        page: 0,
                        limit: 30,
                        tag: '',
                    },
                    recommend: {
                        songsheetList: [],
                        total: 1,
                        page: 1,
                    },
                    hq: {
                        songsheetList: [],
                        page: 0,
                        limit: 30,
                        before:'',
                        total:1,
                    },
                },
                swiperData: [],
                bannerOptions: {
                    loop: true,
                    effect: 'coverflow',
                    spaceBetween: 60,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                }, //轮播配置
                Flag1:true,
                Flag2:true,
                Flag3:true,
                Flag4:true,
                Flag5:true,
                scrollEnd:true,
            }
        },
        computed: {
            tagList(){
                return this.tags.tagList.find(item => item.name === this.tag).songsheetList
            },
            songsheetList() {
                return this.songsheets[this.currentType].songsheetList
            },
            limit() {
                return this.songsheets[this.currentType].limit
            },
            page() {
                return this.songsheets[this.currentType].page
            },
            tag() {
                return this.songsheets[this.currentType].tag
            },
            total() {
                return this.songsheets[this.currentType].total
            },
            picUrl() {
                return function (index) {
                    if (this.songsheets[this.currentType].songsheetList[index].picUrl) {
                        return this.songsheets[this.currentType].songsheetList[index].picUrl
                    } else {
                        return ''
                    }
                }
            },
        },
        methods: {
            //分类和标签
            async getTags() {
                const response = await this.axios.get(`/playlist/catlist`)
                if(response.code === 200){
                    this.tags.tagList = response.sub.map(item => {
                        item.page = 0
                        item.total = 1
                        item.songsheetList = []
                        return item
                    })
                    this.tags.categories = response.categories
                }
            },
            //精品歌单
            async getHighquality(limit = this.songsheets.hq.limit,page = this.songsheets.hq.page,before = this.songsheets.hq.before) {
                if ((limit * page) >= this.songsheets.hq.total) return this.toast('没有更多歌单了')
                const response = await this.axios.get(`top/playlist/highquality?before=${before}&limit=${limit}&offset=${limit * page}`)
                // console.log(response)
                if (response.code === 200) {
                    this.songsheets.hq.songsheetList = this.songsheets.hq.songsheetList.concat(response.playlists)
                    this.songsheets.hq.before = response.lasttime
                    this.songsheets.hq.total = response.total
                    this.songsheets.hq.page += 1
                }
            },
            //全部歌单
            async getAll(tag = this.tag, limit = this.limit, page = this.page) {
                console.log(tag)
                if(!tag){
                    if ((limit * page) >= this.total) return this.toast('没有更多歌单了')
                    const response = await this.axios.get(`/top/playlist?limit=${limit}&offset=${limit * page}&cat=${tag}`)
                    if (response.code === 200) {
                        if (!page) {
                            this.songsheets.all.songsheetList = response.playlists.slice(3, response.playlists.length)
                            this.swiperData = response.playlists.slice(0, 3)
                        } else {
                            this.songsheets.all.songsheetList = this.songsheets.all.songsheetList.concat(response.playlists)
                        }
                        this.songsheets.all.page += 1
                        this.songsheets.all.total = response.total
                        // console.log(this.songsheetList)
                    }
                }
                else {
                    const currentTag = this.tags.tagList.find(item => item.name === this.tag)
                    const total = currentTag.total
                    const page = currentTag.page
                    if ((limit * page) >= total) return this.toast('没有更多歌单了')
                    const response = await this.axios.get(`/top/playlist?limit=${limit}&offset=${limit * page}&cat=${tag}`)
                    if (response.code === 200) {
                        this.tags.tagList.forEach(item =>{
                            if(item.name === this.tag){
                                item.songsheetList = item.songsheetList.concat(response.playlists)
                                item.page += 1
                                item.total = response.total
                                console.log(item.songsheetList)
                            }
                        })
                    }
                }
            },
            //推荐歌单
            async getRecommend(page = this.songsheets.recommend.page) {
                const response = await this.axios.get(`/personalized?limit=${page * 30}`)
                    .catch(()=> this.toast('没有更多歌单了'))
                if (response.code === 200) {
                    if(!response.result.length) return this.toast('没有更多歌单了')
                    this.songsheets.recommend.songsheetList = response.result
                    this.songsheets.recommend.page += 1
                }
            },
            toogle(index) {
                this.currentIndex = index
                switch (index) {
                    case 0:
                        this.currentType = 'all'
                        this.songsheets.all.tag = ''
                        window.scroll(0,0)
                        break
                    case 1:
                        this.songsheets.all.tag = ''
                        this.currentType = 'recommend'
                        window.scroll(0,0)
                        break
                    case 2:
                        this.songsheets.all.tag = ''
                        this.currentType = 'hq'
                        window.scroll(0,0)
                        break
                    case 3:
                        this.currentType = 'all'
                        this.songsheets.all.tag = '华语'
                        window.scroll(0,0)
                        if(this.Flag1){
                            this.getAll()
                            this.Flag1 = false
                        }
                        break
                    case 4:
                        this.currentType = 'all'
                        this.songsheets.all.tag = '流行'
                        window.scroll(0,0)
                        if(this.Flag2){
                            this.getAll()
                            this.Flag2 = false
                        }
                        break
                    case 5:
                        this.currentType = 'all'
                        this.songsheets.all.tag = '电子'
                        window.scroll(0,0)
                        if(this.Flag3){
                            this.getAll()
                            this.Flag3 = false
                        }
                        break
                    case 6:
                        this.currentType = 'all'
                        this.songsheets.all.tag = '民谣'
                        window.scroll(0,0)
                        if(this.Flag4){
                            this.getAll()
                            this.Flag4 = false
                        }
                        break
                    case 7:
                        this.currentType = 'all'
                        this.songsheets.all.tag = '轻音乐'
                        window.scroll(0,0)
                        if(this.Flag5){
                            this.getAll()
                            this.Flag5 = false
                        }
                        break
                }
            },
            //加载更多
            loadmoreData(){
                clearTimeout(this.loadTimer)
                this.loadTimer = setTimeout(()=>{
                    const scrollHeight = document.documentElement.scrollTop ||window.pageYOffset
                    const clientHeight = document.documentElement.clientHeight
                    const totalHeight = document.documentElement.scrollHeight
                    if ((scrollHeight + clientHeight) >= totalHeight) {
                        switch (this.currentType) {
                            case "all":
                                this.getAll()
                                break
                            case 'recommend':
                                this.getRecommend()
                                break
                            case 'hq':
                                this.getHighquality()
                                break
                        }
                    }
                },500)
            }
        },
        created() {
            this.getAll()
            this.getTags()
            this.getRecommend()
            this.getHighquality()
        },
        mounted() {
            window.addEventListener('scroll',this.loadmoreData)
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.loadmoreData)
        }
    }
</script>

<style lang="less" scoped>
  .songsheetcate-container {
    .header {
      .center {
        font-size: 14px;
        color: black;
        font-weight: 600;
      }
    }
    
    .swiper {
      position: fixed;
      z-index: 2;
      width: 7.5rem;
      left: 50%;
      top: 0.9rem;
      transform: translateX(-50%);
      border-bottom: 1px solid #cccccc;
      background-color: white;
      
      .swiper-item {
        width: 1.2rem;
      }
    }
    
    .banner {
      margin-top: 1.9rem;
      padding: 0.2rem;
      .banneritem {
        width: auto;
        div{
          position: relative;
          border-radius:0.1rem;
          overflow: hidden;
          width: 3rem;
          height: 3rem;
          img{
            width: 3rem;
            height: 3rem;
          }
          span{
            position: absolute;
            top: 0.1rem;
            right: 0.3rem;
            color: white;
            font-size:12px;
            &::before{
              font-size: 0.4rem;
            }
          }
        }
        p{
          color: black;
          width: 3rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow:ellipsis
        }
      }
    }
    
    .songsheetlist {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 0.2rem;
      
      &.active {
        margin-top: 1.9rem;
      }
      
      .songsheetitem {
        margin-left: 0.36rem;
        margin-top: 0.2rem;
      }
    }
  }
</style>