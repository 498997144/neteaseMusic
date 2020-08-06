<template>
  <div class="rsquare-container">
    <swiper :options="squareOptions">
      <swiper-slide style="width: 3.2rem" v-for="item in squareList" :key="item.id">
        <Square :squareItem="item"></Square>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
    import Square from "../../../components/content/square/Square";
    export default {
        name: "Rsquare",
        components:{Square,},
        props:{
            squareList:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        data(){
            return {
                squareOptions:{
                    slidesPerView: 'auto',
                    freeMode: true,
                }, //滑动配置
            }
        },
    }
</script>

<style lang="less" scoped>
</style>