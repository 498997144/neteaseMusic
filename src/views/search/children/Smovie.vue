<template>
  <div class="smovie-container">
    <div class="body" v-if="searchResult.length">
      <div class="movie" v-for="item in searchResult" :key="item.id">
        <div class="image">
          <img v-lazy="item.coverUrl">
          <i class="ali-iconarrow-right-filling">{{item.playTime | playCountFilter}}</i>
        </div>
        <ul class="info">
          <li class="title">
            
            <span><i v-if="item.vid.length < 20">MV</i>{{item.title}}</span>
          </li>
          <li class="name">
            <span>{{item.durationms | dateFormat('mm:ss')}}</span>
            <i>by{{item.creator[0].userName}}</i>
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
        name: "Smovie",
        mixins:[loadMore],
        methods:{
            async getsearchResult(page=this.page,limit=this.limit,keyword=this.keyword){
                if(!keyword) return
                if(page * limit > this.total) return this.toast('没有更多数据了')
                let url = `/search?keywords=${keyword}&type=1014&limit=${limit}&offset=${page * limit}`
                const response = await this.axios.get(url)
                console.log(response)
                if(!response.result.videoCount){
                    return this.notfountShow = true
                }else {
                    this.notfountShow = false
                }
                if(response.code === 200){
                    this.total = response.result.videoCount
                    this.searchResult = this.searchResult.concat(response.result.videos)
                    this.page+=1
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .smovie-container{
    overflow: hidden;
    .body{
      padding-bottom: 0.1rem;
      background-color: white;
      .movie{
        display: flex;
        height: 1.4rem;
        margin: 0.2rem 0;
        .image {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 3rem 0 0;
          img {
            width: 2.5rem;
            height: 1.4rem;
            border-radius:5px;
          }
          i{
            position: absolute;
            top: 0.1rem;
            right: 0.5rem;
            color: white;
            font-size:12px;
            &::before{
              font-size: 0.4rem;
            }
          }
        }
        .info{
          display: flex;
          flex: 1;
          flex-direction: column;
          padding-right: 0.2rem;
          .title{
            display: flex;
            align-items: center;
            flex: 65%;
            span{
              width: 4.3rem;
              font-size: 14px;
              color: black;
              line-height: 0.44rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow:ellipsis;
              i{
                padding:0 5px;
                margin-right: 0.1rem;
                color: red;
                border: 1px solid red;
              }
            }
          }
          .name{
            flex: 35%;
            display: flex;
            align-items: center;
            span{}
            i{
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