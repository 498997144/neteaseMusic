<template>
  <div class="songdetail-container musk">
<!--    头部区域-->
    <Header class="header">
      <i slot="left" class="ali-iconarrow-lift" @click="$emit('update:isShow',false)"></i>
      <div slot="middle" class="center">
        <div class="song">
          <span>{{songName}}</span>
        </div>
        <div class="name">
          <i>{{names}}></i>
        </div>
      </div>
      <i slot="right" class="ali-iconshare"></i>
    </Header>
<!--    图片动画区-->
    <div :class="[{active:isPlay},'animation']">
      <img :src="imageUrl" :class="{active:isPlay}">
      <p></p>
      <p class="b2"></p>
      <p class="b3"></p>
      <p class="b4"></p>
    </div>
<!--    底部区域-->
    <div class="footer">
      <!--    按钮-->
      <ul>
        <li>
          <i class="ali-iconfavorites like"  @click="likeSong"></i>
        </li>
        <li><i class="ali-icondownload"></i></li>
        <li><i class="ali-iconremind"></i></li>
        <li>
          <i class="ali-iconcomments comment">
            <span>{{commentCount | countFilter}}</span>
          </i>
        </li>
        <li><i class="ali-iconmore" ></i></li>
      </ul>
      <!--    进度条-->
      <ul class="progress">
        <li class="current">{{currentTime | timeFilter}}</li>
        <li class="mid">
          <input type="range" min="0" :max="totalTime" :value="currentTime"
          :style="{backgroundSize:`${currentTime / totalTime * 100}%`}"
          @input="$emit('input',$event.target)">
          <div class="loading" :style="{backgroundSize:`${loadingTime / totalTime * 100}%`}"></div>
        </li>
        <li class="total">{{totalTime | timeFilter}}</li>
      </ul>
      <!--   播放控制 -->
      <div class="player">
        <div class="left">
          <i class="ali-iconarrow-lift" @click="$emit('update:isShow',false)"></i>
        </div>
        <ul class="middle">
          <li class="prev">
            <i class="ali-iconarrow-right-filling" @click="$emit('prev')"></i>
          </li>
          <li class="center">
            <i :class="[{'ali-iconstop':isPlay},'ali-iconplay']" @click="$emit('playClick')"></i>
          </li>
          <li class="next">
            <i class="ali-iconarrow-right-filling" @click="$emit('next')"></i>
          </li>
        </ul>
        <div class="listbtn" @click="$emit('listClick',2)">
          <i class="ali-iconnav-list"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Songdetail",
        props:['imageUrl', 'songName', 'names','isShow','isPlay',
            'totalTime','currentTime','loadingTime','id'],
        filters:{
            timeFilter(time){
                let f = Math.floor(time / 60)
                f =  f>10?`${f}`:`0${f}`
                let m = parseInt(time % 60)
                m = m>10?`${m}`:`0${m}`
                return `${f}:${m}`
            },
            countFilter(number){
                if(number > 999 && number < 10000){
                    return '999+'
                }
                if(number > 9999 && number < 100000){
                    return '1w+'
                }
                if(number > 99999 && number < 1000000){
                    return '10w+'
                }
                return number
            },
        },
        data(){
            return {
                likeFlag:true,
                commentCount:'',
            }
        },
        methods:{
           // 喜欢与不喜欢
           async likeSong(event){
               if(this.likeFlag){
                   this.likeFlag = false
                   const response = await this.axios.get(`/like?id=${this.id}`)
                   if(response.code === 200){
                       this.toast('已添加到喜欢的歌曲列表')
                       event.target.classList.toggle('active')
                   }else {
                       this.toast('添加失败')
                   }
               }else{
                   const response = await this.axios.get(`/like?id=${this.id}&like=false`)
                   if(response.code === 200){
                       this.toast('取消喜欢成功')
                       event.target.classList.toggle('active')
                   }else{
                       this.toast('取消失败')
                   }
                   this.likeFlag = true
               }
              
           },
           //获取评论个数
            async getcommentCount(){
               const response = await this.axios.get(`/comment/music`,{params:{id:this.id}})
                console.log('评论数据',response)
                if(response.code === 200){
                    this.commentCount = response.total
                }
                
            }
        },
        created() {
          this.getcommentCount()
        }
    
    }
</script>

<style lang="less" scoped>
  .songdetail-container {
    background: linear-gradient(45deg, orangered, #a77989, #93618a);
  
    .header {
      background-color: transparent;
      border: none;
    
      i {
        color: white
      }
    
      .center {
        display: flex;
        flex: 1;
        height: 0.9rem;
        flex-direction: column;
      
        .name {
          align-items: center;
        }
      
        div {
          display: flex;
          flex: 1;
          align-items: flex-end;
        
          span {
            font-size: 14px;
            font-weight: 600;
            color: white;
            width: 4.8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        
          i {
            color: #aaaaaa;
            width: 4.8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  
    .animation {
      display: flex;
      height: 7rem;
      justify-content: center;
      align-items: center;
      position: relative;
      &.active p{
        animation-play-state:running;
      }
      img {
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 4.5/2rem;
        border: 3px solid #666666;
        animation: rotate 30s linear infinite forwards paused;
        &.active{
          animation-play-state: running;
        }
      }
    
      p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 50%;
        animation: bowen 6s linear infinite forwards paused;
        box-shadow: 0px -50px 60px -20px #ff0a00;
      }
    
      .b2 {
        animation-delay: 1.5s;
        box-shadow: 0 -50px 60px -20px #ff7a00;
      }
    
      .b3 {
        animation-delay: 3s;
        box-shadow: 0 -50px 60px -20px #ffda0c;
      }
    
      .b4 {
        animation-delay: 4.5s;
        box-shadow: 0 -50px 60px -20px #ff10ed;
      }
    }
  
    .footer {
      position: fixed;
      width: 7.5rem;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    
      ul {
        display: flex;
        height: 0.8rem;
        background-color: transparent;
      
        li {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            color: white;
          }
          .like{
            &.active{
              color: red;
            }
          }
          .comment{
            position: relative;
            span{
              position: absolute;
              left: 0.35rem;
              top: 0;
              color: white;
              font-weight: 600;
            }
          }
        }
      }
    
      .progress {
        display: flex;
        position: relative;
        height: 0.8rem;
        background-color: transparent;
        .current{
          display: flex;
          flex:1.4rem 0 0;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 14px;
        }
        .mid{
          display: flex;
          position: relative;
          flex: 1;
          justify-content: center;
          align-items: center;
          input{
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 0.2rem;
            outline: 0;
            border-radius: 0.1rem;
            -webkit-appearance: none;
            background: linear-gradient(to right, #ff090e, #a01101) no-repeat;
            background-size: 0% 100%;
            &::-webkit-slider-runnable-track {
              height: 0.2rem;
              border-radius: 0.1rem;
              box-shadow: 0 1px 1px #def3f8, inset 1px 1px 1px #050505;
            }
            &::-webkit-slider-thumb{
              -webkit-appearance: none;
              width: 0.4rem;
              height: 0.4rem;
              margin-top: -0.1rem;
              border-radius: 50%;
              background-color: #f9f9f9;
              box-shadow: 0 0 5px 0px black;
            }
          }
        }
        .total{
          display: flex;
          flex:1.4rem 0 0;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 14px;
        }
        .loading{
          position: absolute;
          left: 0.06rem;
          transition: all 2s linear;
          transform: translateY(2px);
          height: 0.2rem;
          width: 100%;
          background:linear-gradient(to right,blue,#0086b3) no-repeat;
          background-size: 0% 100%;
          border-radius: 0.1rem;
        }
      }
    
      .player {
        height: 1.2rem;
        background-color: transparent;
        display: flex;
      
        .left {
          width: 1.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            color: white;
            &:before{
              font-size: 0.8rem;
            }
          }
        }
      
        .middle {
          flex: 1;
          display: flex;
          height: 100%;
          .prev {
            flex: 28%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            i{
              color: white;
              transform: rotateY(180deg);
              &:before{
                font-size: 0.8rem;
              }
            }
          }
        
          .center {
            flex: 44%;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              color: white;
              &:before{
                font-size: 1.1rem;
              }
            }
          }
        
          .next {
            flex: 28%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            i{
              color: white;
              &:before{
                font-size: 0.8rem;
              }
            }
          }
        }
        .listbtn {
          width: 1.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            color: white;
            &:before{
              font-size: 0.8rem;
            }
          }
        }
      }
    
      @keyframes rotate {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
      @keyframes bowen {
        50% {
          height: 6rem;
          width: 6rem;
          opacity: 0.5;
        }
        100% {
          width: 7.5rem;
          height: 7.5rem;
          opacity: 0;
        }
      }
    
    }
  }
</style>