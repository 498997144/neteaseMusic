<template>
  <div class="songsheet-container">
    <div>
      <img :src="url">
      <span class="ali-iconhot">{{playCount | playCountFilter}}</span>
    </div>
    <p>{{title}}</p>
  </div>
</template>

<script>
    export default {
        name: "Songsheet",
        props:{
            songItem:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        computed:{
            playCount(){
                return this.songItem.resources[0].resourceExtInfo.playCount
            },
            title(){
              return this.songItem.uiElement.mainTitle.title
            },
            url(){
               return this.songItem.uiElement.image.imageUrl
            },
            id(){
                return this.songItem.creativeId
            },
        },
    }
</script>

<style lang="less" scoped>
.songsheet-container{
  width: 2rem;
  div{
    position: relative;
    border-radius:0.1rem;
    overflow: hidden;
    img{
      width: 2rem;
    }
    span{
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      color: white;
      font-size:12px;
    }
  }
  p{
    color: black;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow:ellipsis
  }
}
</style>