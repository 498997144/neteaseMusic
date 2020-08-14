<template>
  <div class="sheet-container">
    <div class="body" v-if="searchResult.length">
      <div class="sheet" @click="$router.push({name:'sheetdetail',params:{id:item.id}})" v-for="item in searchResult" :key="item.id">
        <div class="image">
          <img v-lazy="item.coverImgUrl">
        </div>
        <ul class="sheetinfo">
          <li class="name">
            <span class="elli">{{item.name}}</span>
          </li>
          <li class="detail">
            <span class="count">{{item.trackCount}}首</span>
            <span class="nickname elli">by{{item.creator.nickname}}</span>
            <i class="playcount">播放{{item.playCount | playCountFilter}}次</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="notfound" v-show="notfountShow">没有找到关于{{keyword}}的内容</div>
  </div>
</template>

<script>
    import {loadMore} from "../../../assets/js/mixin"
    export default {
        name: "Sheet",
        mixins:[loadMore],
        methods:{
            async getsearchResult(page=this.page,limit=this.limit,keyword=this.keyword){
                if(!keyword) return
                if(page * limit > this.total) return this.toast('没有更多数据了')
                let url = `/search?keywords=${keyword}&type=1000&limit=${limit}&offset=${page * limit}`
                const response = await this.axios.get(url)
                console.log(response)
                if(!response.result.playlistCount){
                    return this.notfountShow = true
                }else {
                    this.notfountShow = false
                }
                if(response.code === 200){
                    this.total = response.result.playlistCount
                    this.searchResult = this.searchResult.concat(response.result.playlists)
                    this.page+=1
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .sheet-container{
    overflow: hidden;
    .body{
      padding-bottom: 0.1rem;
      background-color: white;
      .sheet {
        display: flex;
        height: 1rem;
        margin: 0.1rem 0;
    
        .image {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1.4rem 0 0;
      
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 0.1rem;
          }
        }
        .sheetinfo{
          display: flex;
          flex-direction: column;
          flex: 1;
          .name{
            display: flex;
            align-items: center;
            flex: 1;
            span{
              width: 6rem;
              font-size: 14px;
              color: #081aff;
            }
          }
          .detail{
            display: flex;
            align-items: center;
            flex: 1;
            .count{
          
            }
            .nickname{
              width: 2rem;
              margin-left: 0.2rem;
            }
            .playcount{
              margin-left: 0.2rem;
            }
          }
        }
      }
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