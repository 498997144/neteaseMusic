<template>
  <div class="songsheet-container" @click="$emit('click')">
    <div>
      <img v-lazy="url?url:picUrl">
      <span class="ali-iconarrow-right-filling">{{playCount | playCountFilter}}</span>
    </div>
    <p>{{name}}</p>
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
            picUrl:{
                type:String,
                default:'',
            },
        },
        computed:{
            playCount(){
                return this.songItem.playCount
            },
            name(){
                return this.songItem.name
            },
            url(){
                return this.songItem.coverImgUrl
            },
            id(){
                return this.songItem.id
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
      height: 2rem;
    }
    span{
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      color: white;
      font-size:12px;
      &::before{
        font-size: 0.4rem;
      }
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