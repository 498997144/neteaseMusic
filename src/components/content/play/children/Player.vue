<template>
  <div class="player-container">
    <div class="left">
      <img :src="imageUrl">
    </div>
    <div class="middle" @click="$emit('middleClick')">
      <p class="song">
        <span>{{songName}}</span>
      </p>
      <p class="name">
        <span>{{names}}</span>
      </p>
    </div>
    <div class="btn">
      <div @click="$emit('playClick')" :class="{active:isPlay}"></div>
    </div>
    <div class="listbtn" @click="$emit('listClick',1)">
      <i class="ali-iconnav-list"></i>
    </div>
    <audio preload :src="url" @canplay="$emit('canplay',$event.target)"
           @progress="$emit('progress',$event.target)"
           ref="audio" @ended="$emit('ended')" @timeupdate="$emit('timeupdate',$event.target)">
      
    </audio>
  </div>
</template>

<script>
    export default {
        name: "Player",
        props: ['imageUrl', 'songName', 'names', 'url', 'isPlay'],
        
    }
</script>

<style lang="less" scoped>
  .player-container {
    display: flex;
    width: 7.5rem;
    height: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: 9;
    .left {
      width: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      
      img {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 0.4rem;
      }
    }
    
    .middle {
      flex: 1;
      display: flex;
      flex-direction: column;
      
      .song {
        flex: 1;
        display: flex;
        align-items: center;
        color: black;
        font-size: 14px;
        
        span {
          width: 4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      .name {
        flex: 1;
        display: flex;
        align-items: center;
        
        span {
          width: 4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    
    .btn {
      width: 1rem;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      div {
        position: relative;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.25rem;
        border: 1px solid #666666;
        
        &.active::after {
          content: '';
          position: absolute;
          left: 0.15rem;
          top: 0.14rem;
          width: 0;
          height: 0;
          display: block;
          border: 0.1rem solid red;
          transition: all 0.3s ease-in-out;
        }
        
        &::after {
          content: '';
          position: absolute;
          left: 0.18rem;
          top: 0.08rem;
          width: 0;
          height: 0;
          display: block;
          border: 0.15rem solid transparent;
          border-left-color: red;
        }
      }
    }
    
    .listbtn {
      width: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: black;
      }
    }
  }

</style>