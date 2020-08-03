<template>
  <div class="square-container">
    <div>
      <img :src="squareItem.resource.mlogBaseData.coverUrl">
      <span class="ali-icongood">{{squareItem.resource.mlogExt.likedCount | countFilter}}</span>
    </div>
    <p>{{squareItem.resource.mlogBaseData.text}}</p>
  </div>
</template>

<script>
    export default {
        name: "Square",
        filters:{
            countFilter(number){
                if(number > 10000){
                    return `${parseInt((number / 10000))}万`
                }
                if(number > 10000000){
                    return `${(number / 100000000).toFixed(2)}亿`
                }
                return number
            },
        },
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
    width: 2rem;
    border-radius:0.1rem;
    overflow: hidden;
    div{
      position: relative;
      img{
        width: 2rem;
        height: 2.8rem;
      }
      span{
        position: absolute;
        bottom: 0.1rem;
        left: 0.1rem;
        color: white;
        font-size:12px;
      }
    }
    p{
      color: black;
      background-color: #989898;
      padding: 0 0.1rem;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow:ellipsis
    }
  }
</style>