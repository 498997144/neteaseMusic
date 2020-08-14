<template>
  <div class="searchhot-container">
    <div class="title">热搜榜</div>
    <ul class="hotlist" v-for="(item,index) in hotList" :key="index" @click="$emit('click',item.searchWord)">
      <li :class="['index',{active:index+1 > 0 && index+1 < 4}]">{{index+1}}</li>
      <li class="info">
        <p>
          {{item.searchWord}}
          <img v-if="item.iconUrl" :src="item.iconUrl">
        </p>
        <span>{{item.content}}</span>
      </li>
      <li class="count">{{item.score}}</li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Searchhot",
        props:['hotList'],
    }
</script>

<style lang="less" scoped>
  .searchhot-container{
    background-color: white;
    padding-bottom: 0.01rem;
    &.active{
      margin-top: 0.9rem;
    }
    .title{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.9rem;
      color: black;
      font-size: 14px;
      font-weight: 600;
    }
    .hotlist{
      display: flex;
      height: 1rem;
      margin: 0.2rem 0;
      .index{
        flex: 15% 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        &.active{
          color: red;
        }
      }
      .info{
        flex: 1;
        display: flex;
        flex-direction: column;
        p{
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 600;
          color: black;
          img{
            margin-left: 0.2rem;
            height: 0.2rem;
          }
        }
        span{
          flex: 1;
          display: flex;
          align-items: center;
        }
        
      }
      .count{
        display: flex;
        flex: 20% 0 0;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>