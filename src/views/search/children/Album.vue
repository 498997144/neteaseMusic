<template>
  <div class="album-container">
    <div class="body" v-if="searchResult.length">
      <Albumbox v-for="item in searchResult" :key="item.id" :album="item"></Albumbox>
    </div>
    <div class="notfound" v-show="notfountShow">没有找到关于{{keyword}}的内容</div>
  </div>
</template>

<script>
    import {loadMore} from "../../../assets/js/mixin"
    import Albumbox from "../../../components/content/albumbox/Albumbox";
    export default {
        name: "Album",
        components:{Albumbox,},
        mixins:[loadMore],
        methods:{
            async getsearchResult(page=this.page,limit=this.limit,keyword=this.keyword){
                if(!keyword) return
                if(page * limit > this.total) return this.toast('没有更多数据了')
                let url = `/search?keywords=${keyword}&type=10&limit=${limit}&offset=${page * limit}`
                const response = await this.axios.get(url)
                if(!response.result.albumCount){
                    return this.notfountShow = true
                }else {
                    this.notfountShow = false
                }
                if(response.code === 200){
                    this.total = response.result.albumCount
                    this.searchResult = this.searchResult.concat(response.result.albums)
                    this.page+=1
                }
                console.log(response)
            },
        },
    }
</script>

<style lang="less" scoped>
  .album-container{
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