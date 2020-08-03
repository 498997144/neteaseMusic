<template>
  <div class="song-container" v-if="length">
    <div class="img">
      <img :src="url">
    </div>
    <div class="name">
      <p class="title">
        <span>{{mainTitle}}</span>
        <i>{{names}}</i>
      </p>
      <p class="desc" v-if="song.uiElement.subTitle">
        <i :class="{active:titleType}">{{subTitle}}</i>
      </p>
    </div>
    <div class="btn" @click="addSong">
      <div :class="{active:currentId === id}" ref="playBtn"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Song",
        props:{
            song:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        data(){
            return {
                currentId:null,
            }
        },
        computed:{
            //拼接歌多个歌手名字
            names(){
                let names = '-'
                this.song.resourceExtInfo.artists.forEach((item)=>{
                    names += item.name + '/'
                })
                names = names.substring(0,names.length-1)
                return names
            },
            url(){
                return this.song.uiElement.image.imageUrl
            },
            mainTitle(){
                return this.song.uiElement.mainTitle.title
            },
            subTitle(){
                return this.song.uiElement.subTitle.title
            },
            titleType(){
                return this.song.uiElement.subTitle.titleType === 'songRcmdTag'
            },
            length(){
                return  Object.keys(this.song).length > 0
            },
            id(){
                return this.song.resourceExtInfo.songData.id
            },
            
        },
        methods:{
            //添加歌曲到播放列表
            addSong(){
                this.$store.commit('addSong',this.song)
                this.bus.$emit('play',this.id)
            },
        },
        mounted() {
            //接收播放列表id改变,如果id相同则收变播放按钮为播放状态
            this.bus.$on('changeId',(id)=>{
                this.currentId = id
            })
        }
    }
</script>

<style lang="less" scoped>
.song-container{
  display: flex;
  width: 7.5rem;
  height: 1.4rem;
  padding: 0 0.2rem;
  align-items: center;
  .name{
    flex: 60%;
    height: 1rem;
    display: flex;
    flex-direction: column;
    p{
      flex: 1;
    }
    .title{
      display: flex;
      align-items: center;
      span{
        width: 2rem;
        color: black;
        font-size: 14px;
        margin-right: 0.05rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i{
        width: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .desc{
      display: flex;
      align-items: center;
      i{
        width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &.active{
          color: red;
        }
      }
    }
  }
  .img,.btn{
    flex: 20% 0 0.1;
  }
  .img{
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 0.05rem;
    }
  }
  .btn{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
      position: relative;
      width:0.5rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      border: 1px solid #666666;
      &.active::after{
        content: '';
        position: absolute;
        left: 0.14rem;
        top:0.14rem;
        width: 0;
        height: 0;
        display: block;
        border: 0.1rem solid red;
        transition: all 0.3s ease-in-out;
      }
      &::after{
        content: '';
        position: absolute;
        left: 0.18rem;
        top:0.08rem;
        width: 0;
        height: 0;
        display: block;
        border: 0.15rem solid transparent;
        border-left-color: red;
      }
    }
  }
}
</style>