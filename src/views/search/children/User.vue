<template>
  <div class="user-container">
    <div class="body" v-if="searchResult.length">
      <div class="user" v-for="item in searchResult" :key="item.id">
        <div class="image">
          <img v-lazy="item.avatarUrl">
        </div>
        <ul class="userinfo">
          <li class="username">
            <span>{{item.nickname}}</span>
            <i :class="{'ali-iconnan':item.gender == 1,'ali-iconnv1':item.gender == 2}"></i>
          </li>
          <li class="tag" v-if="item.description||item.signature">
            <span class="elli">{{item.description||item.signature}}</span>
          </li>
        </ul>
        <div class="btn">
          <div> + 关注</div>
        </div>
      </div>
    </div>
    <div class="notfound" v-show="notfountShow">没有找到关于{{keyword}}的内容</div>
  </div>
</template>

<script>
    import {loadMore} from "../../../assets/js/mixin"
    export default {
        name: "User",
        mixins:[loadMore],
        methods:{
            async getsearchResult(page=this.page,limit=this.limit,keyword=this.keyword){
                if(!keyword) return
                if(page * limit > this.total) return this.toast('没有更多数据了')
                let url = `/search?keywords=${keyword}&type=1002&limit=${limit}&offset=${page * limit}`
                const response = await this.axios.get(url)
                console.log(response)
                if(!response.result.userprofileCount){
                    return this.notfountShow = true
                }else {
                    this.notfountShow = false
                }
                if(response.code === 200){
                    this.total = response.result.userprofileCount
                    this.searchResult = this.searchResult.concat(response.result.userprofiles)
                    this.page+=1
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .user-container{
    overflow: hidden;
    .body{
      padding-bottom: 0.1rem;
      background-color: white;
      .user {
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
            border-radius: 50%;
          }
        }
        .userinfo{
          flex: 1;
          display: flex;
          flex-direction: column;
          .username{
            flex: 1;
            display: flex;
            align-items: center;
            i::before{
              margin-left: 0.1rem;
              font-size: 0.3rem;
            }
            i.ali-iconnan{
              color: blue;
            }
            i.ali-iconnv1{
              color: hotpink;
            }
          }
          .tag{
            flex: 1;
            display: flex;
            align-items: center;
            span{
              width: 4rem;
            }
          }
        }
        .btn{
          flex:1.6rem 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
          div{
            display: flex;
            width: 1.2rem;
            justify-content: center;
            align-items: center;
            height: 0.5rem;
            border-radius: 0.25rem;
            border: 1px solid red;
            color: red;
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