<template>
  <div class="albumbox-container">
    <div class="image">
      <img v-lazy="album.picUrl">
    </div>
    <ul class="albuminfo">
      <li class="name">
        <span class="elli">{{album.name}}</span>
      </li>
      <li class="singer">
        <span class="singername">{{album.artist.name}}</span>
        <span class="time" v-if="album.publishTime">{{album.publishTime | dateFormat('YYYY.MM.DD')}}</span>
        <i v-if="album.containedSong" class="elli">包含单曲{{album.containedSong}}</i>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Albumbox",
        props:['album'],
    }
</script>

<style lang="less" scoped>
.albumbox-container {
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
  .albuminfo{
    display: flex;
    flex-direction: column;
    flex: 1;
    .name{
      display: flex;
      align-items: center;
      flex: 1;
      span{
        width: 6rem;
        font-size: 14px;
        color: #081aff;
      }
    }
    .singer{
      display: flex;
      align-items: center;
      flex: 1;
      .singername{
      
      }
      .time{
        margin-left: 0.2rem;
      }
      i{
        width: 2.5rem;
        margin-left: 0.2rem;
        color: blue;
      }
    }
  }
}
</style>