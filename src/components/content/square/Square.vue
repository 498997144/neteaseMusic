<template>
  <div class="square-container">
    <div>
      <img :src="squareItem.resource.mlogBaseData.coverUrl">
      <span class="ali-icongood">{{squareItem.resource.mlogExt.likedCount}}</span>
    </div>
    <p>{{squareItem.resource.mlogBaseData.text}}</p>
  </div>
</template>

<script>
    export default {
        name: "Square",
        props:{
            squareItem:{
                type:Object,
                default(){
                    return {}
                }
            },
        }
    }
</script>

<style lang="less" scoped>
  .square-container{
    width: 3rem;
    border-radius:0.1rem;
    overflow: hidden;
    div{
      position: relative;
      img{
        width: 3rem;
        height: 4.2rem;
      }
      span{
        position: absolute;
        bottom: 0.1rem;
        left: 0.1rem;
        color: white;
        font-size:12px;
        &::before{
          font-size: 0.4rem;
        }
      }
    }
    p{
      color: black;
      background-color: #989898;
      padding: 0 0.1rem;
      line-height: 0.32rem;
      height: 0.64rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow:ellipsis
    }
  }
</style>