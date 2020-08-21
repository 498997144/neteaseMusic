<template>
  <div class="video-container" v-if="Object.keys(video).length > 0" :key="video.coverUrl">
    <video :src="url" controls :poster="video.coverUrl" @click.prevent="$emit('click',$event.target,index)" ref="video"></video>
    <p>{{video.title}}</p>
    <ul class="creator">
      <li class="avatar">
        <img :src="avatarUrl">
      </li>
      <li class="name">
        <span class="elli">{{video.creator.nickname}}</span>
      </li>
      <li class="praised">
        <i class="ali-icongood"><span>{{video.praisedCount | commentCountFilter}}</span></i>
      </li>
      <li class="comment">
        <i class="ali-iconcomments"><span>{{video.commentCount | commentCountFilter}}</span></i>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Video",
        props:['index','video'],
        data(){
            return {
                url:'',
            }
        },
        computed:{
            vdo(){
                return this.$refs.video
            },
            avatarUrl(){
                if(Object.keys(this.video).length > 0){
                    return this.video.creator.avatarUrl
                }
                return false
            },
        },
        methods:{
           async getUrl(){
               const response = await this.axios.get(`/video/url?id=${this.video.vid}`)
               if(response.code === 200){
                   if(response.urls.length) this.url = response.urls[0].url
               }
           },
            play(){
               this.vdo.play()
            },
            pause(){
                if(this.vdo.paused) return false
                this.vdo.pause()
            }
        },
        created() {
            this.getUrl()
        },
    }
</script>

<style lang="less" scoped>
.video-container{
  margin-top: 0.1rem;
  padding:0 0.2rem;
  background-color: white;
  video{
    width: 100%;
    height: 4rem;
    margin-top: 0.1rem;
    outline: none;
  }
  p{
    display: flex;
    align-items: center;
    height: 0.8rem;
    font-size: 14px;
    color: black;
    line-height: 0.3rem;
  }
  .creator{
    display: flex;
    height: 1rem;
    align-items: center;
    .avatar{
      display: flex;
      width:1rem;
      justify-content: center;
      align-items: center;
      img{
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
      }
    }
    .name{
      display: flex;
      flex: 1;
      align-items: center;
      span{
        font-size: 14px;
        color: black;
        max-width: 3.5rem;
      }
    }
    .praised,.comment{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.2rem;
      i{
        position: relative;
        span{
          position: absolute;
          background-color: white;
          top: 0;
          left: 0.32rem;
        }
      }
    }
  }
}
</style>