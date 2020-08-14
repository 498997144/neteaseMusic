<template>
  <div class="radiobox-container">
    <div class="image">
      <img v-lazy="radio.picUrl">
    </div>
    <ul class="radioinfo">
      <li class="title">
        <span class="elli">{{radio.name}}</span>
      </li>
      <li class="user">
        <span class="username">{{radio.dj.nickname}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Radiobox",
        props:['radio'],
    }
</script>

<style lang="less" scoped>
  .radiobox-container {
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
    .radioinfo{
      display: flex;
      flex-direction: column;
      flex: 1;
      .title{
        display: flex;
        align-items: center;
        flex: 1;
        span{
          width: 6rem;
          font-size: 14px;
          color: #081aff;
        }
      }
      .user{
        display: flex;
        align-items: center;
        flex: 1;
        .username{
        
        }
      }
    }
  }
</style>