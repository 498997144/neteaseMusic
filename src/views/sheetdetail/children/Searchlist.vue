<template>
  <div class="searchlist-container">
    <div class="tip" v-if="tipShow">
      此歌单没有找到您想要的歌曲!
      <span @click="$router.push({name:'search',params:{keyword}})">去云音乐库试试!</span>
    </div>
    <swiper v-else :options="swiperOption" style="height:100%">
      <swiper-slide style="height:auto;">
        <Song v-for="item in searchList" :key="item.id" :song="item"></Song>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import Song from "../../../components/content/song/Song";
    export default {
        name: "Searchlist",
        components:{Song},
        props: {
            searchList: {
                type: Array,
                default() {
                    return []
                },
            },
            keyword:{
                type:String,
                default:'',
            },
            tipShow:{
              type:Boolean,
              default:false,
            },
        },
        data(){
            return {
                swiperOption:{
                    direction:'vertical',
                    slidesPerView:'auto',
                    freeMode:true,
                    mousewheel: true,
                    setWrapperSize: true,
                    // roundLengths: true,
                }, //滑动配置
            }
        },
    }
</script>

<style lang="less" scoped>
  .searchlist-container{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 0.9rem;
    width: 7.5rem;
    height:calc(100% - 1.8rem);
    background-color: white;
    z-index: 5;
    .tip{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: black;
      height: 3rem;
      span{
        color: red;
      }
    }
  }
</style>