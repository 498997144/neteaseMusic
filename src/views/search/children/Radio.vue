<template>
  <div class="radio-container">
    <div class="body" v-if="searchResult.length">
      <Radiobox v-for="item in searchResult" :key="item.id" :radio="item"></Radiobox>
    </div>
    <div class="notfound" v-show="notfountShow">没有找到关于{{keyword}}的内容</div>
  </div>
</template>

<script>
    import {loadMore} from "../../../assets/js/mixin"
    import Radiobox from "../../../components/content/radiobox/Radiobox";
    export default {
        name: "Radio",
        components:{Radiobox,},
        mixins:[loadMore],
        methods:{
            async getsearchResult(page=this.page,limit=this.limit,keyword=this.keyword){
                if(!keyword) return
                if(page * limit > this.total) return this.toast('没有更多数据了')
                let url = `/search?keywords=${keyword}&type=1009&limit=${limit}&offset=${page * limit}`
                const response = await this.axios.get(url)
                if(!response.result.djRadiosCount){
                    return this.notfountShow = true
                }else {
                    this.notfountShow = false
                }
                if(response.code === 200){
                    this.total = response.result.djRadiosCount
                    this.searchResult = this.searchResult.concat(response.result.djRadios)
                    this.page+=1
                }
                console.log(response)
            },
        },
    }
</script>

<style lang="less" scoped>
  .radio-container{
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