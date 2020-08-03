<template>
  <div class="rsong-container">
    <swiper :options="slidesOptions">
      <swiper-slide  v-for="(item,index) in songList" :key="index">
        <Song v-for="(song,index) in item.resources" :key="index" :song="song"></Song>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import Song from "../../../components/content/song/Song";
    export default {
        name: "Rsong",
        components:{Song,},
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