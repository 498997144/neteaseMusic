<template>
  <div class="csong-container">
    <div class="image">
      <i class="ali-iconsound-filling" v-if="currentId == song.id"></i>
      <img v-else :src="song.al.picUrl">
    </div>
    <ul class="songinfo" @click="addSong">
      <li class="name">
        <span class="elli">{{song.name}}</span>
        <i v-if="reason">{{reason.reason}}</i>
      </li>
      <li class="singer">
        <em v-if="song.privilege.flag < 128 && song.privilege.flag > 4">独家</em>
        <i v-if="song.privilege.maxbr === 999000">SQ</i>
        <span class="elli">{{names + ' - ' + song.al.name}}</span>
      </li>
    </ul>
    <div class="video">
      <i class="ali-iconvideo" v-if="song.mv"></i>
    </div>
    <div class="btn">
      <i class="ali-iconmore"></i>
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
                },
            },
            reasons:{
                type:Array,
                default() {
                    return []
                }
            },
        },
        data(){
            return {
                currentId:'',
            }
        },
        computed:{
            names(){
                let names = ''
                this.song.ar.forEach((item)=>{
                    names += item.name + '/'
                })
                names = names.slice(0,names.length - 1)
                return names
            },
            reason(){
               return this.reasons.find((item)=>{
                   return item.songId === this.song.id
                })
            },
            
        },
        methods:{
            //添加歌曲到播放列表
            addSong(){
                if(this.currentId !== this.song.id){
                    const song = {}
                    song.id = this.song.id
                    song.name = this.song.name
                    song.ar = this.song.ar
                    song.al = this.song.al
                    song.privilege = this.song.privilege
                    this.$store.commit('addSong',song)
                    this.bus.$emit('play',this.song.id)
                }else {
                    this.bus.$emit('showDetail')
                }
                
            },
        },
        mounted() {
            //接收播放列表id改变,如果相同则在次点击时显示祥情
            this.bus.$on('changeId',(id)=>{
                this.currentId = id
            })
        }
    }
</script>

<style lang="less" scoped>
.csong-container{
  display: flex;
  height: 1rem;
  margin: 0.1rem 0;
  .image{
    display: flex;
    justify-content: center;
    flex: 1.4rem 0 0;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 0.1rem;
    }
    i{
      color: red;
    }
  }
  .songinfo{
    display: flex;
    flex-direction: column;
    flex: 1;
    .name{
      display: flex;
      align-items: center;
      flex: 1;
      span{
        width:1.8rem;
        font-size: 14px;
        color: black;
      }
      i{
        color: red;
        border: 1px solid red;
        padding: 2px 4px;
        margin-left: 0.15rem;
      }
    }
    .singer{
      display: flex;
      align-items: center;
      flex: 1;
      span{
        width: 2.4rem;
        }
      em{
        padding: 2px 4px;
        margin-right: 0.15rem;
        color: red;
        border: 1px solid red;
      }
      i{
        padding: 2px 4px;
        margin-right: 0.15rem;
        color: red;
        border: 1px solid red;
      }
    }
  }
  .video{
    display: flex;
    justify-content: center;
    flex: 0.8rem 0 0;
  }
  .btn{
    display: flex;
    justify-content: center;
    flex: 0.8rem 0 0;
  }
}
</style>