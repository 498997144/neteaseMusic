<template>
  <div class="singerbox-container">
    <div class="image">
      <img v-lazy="singer.picUrl || singer.img1v1Url">
    </div>
    <div class="singerinfo">
      <span>{{singer.name}}</span>
      <i v-if="!singer.followed" class="ali-iconzhongjianren">已入驻</i>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Singerbox",
        props:['singer'],
    }
</script>

<style lang="less" scoped>
  .singerbox-container {
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
    .singerinfo{
      flex: 1;
      display: flex;
      padding-right: 0.4rem;
      justify-content: space-between;
      align-items: center;
      span{
        font-size: 13px;
        font-weight: 600;
        color: black;
      }
      i::before{
        color: red;
      }
    }
  }
</style>