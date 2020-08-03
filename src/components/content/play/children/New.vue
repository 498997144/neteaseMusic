<template>
  <div class="new-container">
    <div>
      <div class="ali-iconadd-select"></div>
    </div>
    <p>新建歌单</p>
  </div>
</template>

<script>
    export default {
        name: "New",
    }
</script>

<style lang="less" scoped>
  .new-container{
    display: flex;
    height: 1rem;
    margin: 0.1rem 0;
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.4rem;
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        border-radius: 0.1rem;
        background-color: #999999;
        color: red;
        &:before{
          font-size: 0.6rem;
        }
      }
    }
    p{
      display: flex;
      flex: 1;
      align-items: center;
      font-size: 14px;
      color: black;
    }
  }
</style>