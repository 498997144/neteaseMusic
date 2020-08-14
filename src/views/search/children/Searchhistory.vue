<template>
  <div class="history-container">
    <swiper :options="swiperOption" style="height:100%">
      <swiper-slide style="height:auto;">
        <Title class="history" title="搜索历史">
          <i class="ali-iconashbin" @click="$emit('clear')"></i>
        </Title>
        <Title class="history" @click.native="$emit('click',item)" v-for="(item,index) in historyList" :title="item" :key="index">
          <i class="ali-iconclose" @click.stop="$emit('remove',index)"></i>
        </Title>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import Title from "../../../components/content/title/Title";
    export default {
        name: "Searchhistory",
        props:['historyList'],
        components:{Title},
        data(){
            return {
                swiperOption:{
                    direction:'vertical',
                    slidesPerView:'auto',
                    freeMode:true,
                    mousewheel: true,
                    // setWrapperSize: true,
                    observer:true,
                    observeParents:true,
                }, //滑动配置
            }
        },
    }
</script>

<style lang="less" scoped>
.history-container{
  margin-top: 0.9rem;
  height: 3rem;
  background-color: white;
  .history{
    height: 0.6rem;
    padding: 0 0.4rem;
    color: black;
    i::before{
      font-size: 0.4rem;
    }
  }
}
</style>