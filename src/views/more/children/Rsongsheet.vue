<template>
  <div class="rsongsheet-container">
    <swiper ref="slides" :options="slidesOptions" class="slides">
      <swiper-slide  v-for="item in songSheet" :key="item.creativeId" class="slides-item">
        <Hsongsheet :songItem="item"></Hsongsheet>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import Hsongsheet from "../../../components/content/hsongsheet/Hongsheet";
    export default {
        name: "Rsongsheet",
        components:{Hsongsheet,},
        props:{
            songSheet:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        data(){
            return {
                slidesOptions:{
                    slidesPerView: 'auto',
                    freeMode: true,
                }, //滑动配置
            }
        },
    }
</script>

<style lang="less" scoped>
  .rsongsheet-container{
    min-height: 2.6rem;
    .slides-item{
      flex: 2.2rem 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>