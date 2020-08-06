<template>
  <div class="slides-container">
    <swiper :options="slidesOptions">
      <swiper-slide style="width: auto" v-for="(item,index) in slidesData" :key="item.id">
            <div class="item">
              <div @click="to(index)">
                <span v-if="index === 0">{{+new Date().getDate()}}</span>
                <img :src="item.iconUrl">
              </div>
              <span>{{item.name}}</span>
            </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
    export default {
        name: "Slides",
        data(){
            return {
                slidesData:[],//滑块数据
                slidesOptions:{
                    slidesPerView: 'auto',
                    freeMode: true,
                }, //滑动配置
            }
        },
        methods:{
            //获取导航数据
            async getSlides(){
                const response = await this.axios.get(`/homepage/dragon/ball`)
                if(response.code ===200){
                    this.slidesData = response.data
                }
            },
            //页面跳转
            to(index){
                switch (index) {
                    case 0:
                        return this.$router.push({name:'recommendsong'})
                }
                
            },
        },
        created(){
            this.getSlides()
        },
    }
</script>

<style lang="less" scoped>
  .item{
    display: flex;
    width: 1.4rem;
    height: 1.4rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height:0.8rem;
      width: 0.8rem;
      border-radius: 0.4rem;
      background-color: red;
      span{
        position: absolute;
        font-weight: 600;
        color: red;
      }
      img{
        width: 0.6rem;
      }
    }
    span{
      color: black;
      margin-top: 0.05rem;
    }
  }
</style>