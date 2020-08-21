<template>
  <div class="search-container">
    <!--    头部区域-->
    <Header class="search-header">
      <i slot="left" v-show="!searchShow" class="ali-iconarrow-lift" @click="$router.go(-1)"></i>
      <i slot="left" v-show="searchShow" class="ali-iconarrow-lift" @click="toogleShow"></i>
      <div slot="middle" class="search-center">
        <Input class="search" v-model.trim="keyword" @focus="suggestShow = true"
                :placeholder="showKeyword"/>
        <i class="ali-iconsearch" @click="search(keyword)"></i>
        <ul class="searchsuggest" v-if="searchSuggest.length" v-show="suggestShow">
          <li @click="suggestShow = false">
            <span>关闭搜索建议</span>
            <em class="ali-iconclose"></em>
          </li>
          <li v-for="(item,index) in searchSuggest" :key="index" @click="search(item.keyword)">
            <span>{{item.keyword}}</span>
            <em class="ali-iconsearch"></em>
          </li>
        </ul>
      </div>
      <i slot="right" class="ali-iconusercenter"></i>
    </Header>
    <!--    历史搜索-->
    <Searchhistory v-if="historyList.length" :historyList="historyList" v-show="!searchShow"
                  @click="search" @clear="clear" @remove="remove"></Searchhistory>
    <!--    热搜榜-->
    <Searchhot :hotList="hotList" v-show="!searchShow" :class="{active:!historyList.length}"
    @click="search"></Searchhot>
<!--    搜索结果-->
    <div class="search-result" v-show="searchShow">
      <swiper :options="swiperOptions" class="swiper">
        <swiper-slide class="item" v-for="(item,index) in tabList" :key="index">
          <Tabitem @click.native="$router.replace({name:item.path})" class="slide">
            <i v-if="item.icon" :class="item.icon"></i>
            <span :class="{active:$route.name === item.path}">{{item.name}}</span>
          </Tabitem>
        </swiper-slide>
      </swiper>
      <router-view class="view" :keyword="keyword"></router-view>
    </div>
  </div>
</template>

<script>
    import Searchhistory from "./children/Searchhistory";
    import Searchhot from "./children/Searchhot";
    
    export default {
        name: "Search",
        components: {Searchhistory, Searchhot,},
        data() {
            return {
                keyword: '',
                showKeyword: '',
                realkeyword: '',
                searchSuggest: [],
                hotList: [],
                historyList: [],
                searchShow: false,
                suggestShow:true,
                tabList:[
                    {name:'单曲',path:'single'},{name:'专辑',path:'album'},{name:'歌手',path:'singer'},
                    {name:'歌单',path:'sheet'},{name:'用户',path:'user'},
                    {name:'电台',path:'radio'},{name:'视频',path:'smovie'},
                ],
                swiperOptions:{slidesPerView: 'auto',freeMode: true,observer:true,observeParents:true,}
            }
        },
        watch: {
            keyword(keyword) {
                if (!keyword) return this.searchSuggest = []
                clearTimeout(this.suggestTimer)
                this.suggestTimer = setTimeout(async () => {
                    const response = await this.axios.get(`/search/suggest?keywords=${keyword}&type=mobile`)
                    if (response.code === 200 && Object.keys(response.result).length) {
                        this.searchSuggest = response.result.allMatch
                    }else {
                        this.searchSuggest = [{keyword:'没有搜索建议!'}]
                    }
                }, 1000)
            },
        },
        methods: {
            async gethotList() {
                const response = await this.axios.get(`/search/hot/detail`)
                if (response.code === 200) {
                    this.hotList = response.data
                }
            },
            async getdefaultWord() {
                const response = await this.axios.get(`/search/default`)
                if (response.code === 200) {
                    this.showKeyword = response.data.showKeyword
                    this.realkeyword = response.data.realkeyword
                }
            },
            gethistoryList() {
                let historyList = JSON.parse(localStorage.getItem('historyList'))
                this.historyList = historyList === null ? [] : historyList
            },
            async search(keyword){
                this.suggestShow = false
                this.searchShow = true
                this.keyword = keyword
                if (!keyword) this.keyword = this.realkeyword
                if(!this.historyList.find(item => item === this.keyword)){
                    this.historyList.push(this.keyword)
                    localStorage.setItem('historyList', JSON.stringify(this.historyList))
                }
                this.$router.replace({name:'single'})
            },
            clear() {
                this.confirm('确定要清空搜索历史记录吗?', () => {
                    this.historyList = []
                    localStorage.removeItem('historyList')
                })
            },
            remove(index) {
                this.historyList.splice(index, 1)
                localStorage.setItem('historyList', JSON.stringify(this.historyList))
            },
            toogleShow(){
                this.searchShow = false
                this.getdefaultWord()
                this.keyword = ''
                this.$router.replace({name:'search'})
            },
        },
        created() {
            this.gethotList()
            this.gethistoryList()
            this.getdefaultWord()
        },
    }
</script>

<style lang="less" scoped>
  .search-container {
    
    .search-header {
      background-color: white;
      color: black;
      
      .search-center {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        
        i {
          position: absolute;
          color: black;
          right: 0;
        }
        
        /deep/ .search {
          /*width: 80%;*/
          
          input {
            color: black;
            border-bottom: 1px solid black;
            
            &::-webkit-input-placeholder {
              color: #979797;
            }
          }
          
          .clear {
            color: #727272;
            right: 0.5rem;
          }
        }
        .searchsuggest {
          position: absolute;
          top: 100%;
          width: 100%;
          background-color: white;
          box-shadow: 0 2px 8px 3px #0e0e0e5c;
          li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 0.6rem;
            padding: 0 0.3rem;
            border-bottom:1px solid #d1d1d1;
            em::before{
              color: #acacac;
              font-size: 0.3rem;
            }
          }
        }
      }
    }
    .search-result{
      margin-top: 0.9rem;
      background-color: white;
      .view{
        margin-top: 1.7rem;
      }
      .swiper{
        position: fixed;
        left: 50%;
        width: 7.5rem;
        transform: translateX(-50%);
        top: 0.9rem;
        background-color: white;
        border-bottom: 1px solid #cdcdcd;
        z-index: 3;
        .item{
          width: 1.2rem;
          .slide{
            height: 0.8rem;
          }
        }
      }
    }
  }
</style>