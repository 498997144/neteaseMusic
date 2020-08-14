<template>
  <div class="singer-container">
    <div class="body" v-if="searchResult.length">
      <Singerbox v-for="item in searchResult" :key="item.id" :singer="item"></Singerbox>
    </div>
    <div class="notfound" v-show="notfountShow">没有找到关于{{keyword}}的内容</div>
  </div>
</template>

<script>
    import {loadMore} from "../../../assets/js/mixin"
    import Singerbox from "../../../components/content/Singerbox/Singerbox";
    export default {
        name: "Singer",
        components:{Singerbox,},
        mixins:[loadMore],
        methods:{
            async getsearchResult(page=this.page,limit=this.limit,keyword=this.keyword){
                if(!keyword) return
                if(page * limit > this.total) return this.toast('没有更多数据了')
                let url = `/search?keywords=${keyword}&type=100&limit=${limit}&offset=${page * limit}`
                const response = await this.axios.get(url)
                console.log(response)
                if(!response.result.artistCount){
                    return this.notfountShow = true
                }else {
                    this.notfountShow = false
                }
                if(response.code === 200){
                    this.total = response.result.artistCount
                    this.searchResult = this.searchResult.concat(response.result.artists)
                    this.page+=1
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .singer-container{
    overflow: hidden;
    .body{
      padding-bottom: 0.1rem;
      background-color: white;
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