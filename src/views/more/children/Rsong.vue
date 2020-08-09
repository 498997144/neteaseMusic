<template>
  <div class="rsong-container">
    <swiper :options="slidesOptions">
      <swiper-slide  v-for="(item,index) in songList" :key="index">
        <Hsong v-for="(song,index) in item.resources" :key="index" :song="song"></Hsong>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import Hsong from "../../../components/content/hsong/Hsong";
    export default {
        name: "Rsong",
        components:{Hsong,},
        props:{
            songList:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        data(){
            return {
                slidesOptions:{
                    // slidesPerView: 'auto',
                    // freeMode: true,
                }, //滑动配置
            }
        }
    }
</script>

<style lang="less" scoped>
.rsong-container{
  min-height: 4.2rem;
}
</style>