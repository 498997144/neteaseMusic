<template>
  <div class="banner-container">
    <swiper ref="banner" :options="bannerOptions">
      <swiper-slide v-for="(item,index) in banners" :key="index">
        <a class="banner">
          <img :src="item.pic">
          <div :style="{backgroundColor:item.titleColor}">{{item.typeTitle}}</div>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
    export default {
        name: "Banner",
        data(){
            return {
                banners:[],//轮播图数据
                bannerOptions:{
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    speed: 500,
                    initialSlide: 1,
                }, //轮播图配置
            }
        },
        methods:{
           async getBanner(){
               const response = await this.axios.get(`/banner?type=1`)
               if(response.code === 200){
                   this.banners = response.banners
               }
           },
        },
        created(){
            this.getBanner()
        },
    }
</script>

<style lang="less" scoped>
.banner{
  min-height: 2.9rem;
  img{
    width: 7.5rem;
    min-height: 2.9rem;
  }
  div{
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0.15rem;
    color: white;
  }
}
</style>