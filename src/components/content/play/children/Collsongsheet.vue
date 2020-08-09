<template>
  <div class="collsongsheet-container">
    <div class="image">
      <img :src="songSheet.coverImgUrl">
    </div>
    <div class="center" @click="$emit('coll',songSheet.id)">
      <p class="name">{{index?songSheet.name:'我喜欢的音乐'}}</p>
      <p class="count">{{songSheet.trackCount}}首</p>
    </div>
    <div class="check">
      <Checkbtn v-show="checkShow" :value="songSheet.id"
                @pushitem="pushitem" @removeitem="removeitem"></Checkbtn>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Collsongsheet",
        props:{
            songSheet:{
                type:Object,
                default(){
                    return {}
                }
            },
            index:Number,
            checkShow:{
                type:Boolean,
                default:false,
            },
            checkList:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        watch:{
            checkList(data){
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.$emit('update:checkList',data)
                },500)
            },
        },
        methods:{
            //选择歌曲
            pushitem(value){
                this.checkList.push(value)
            },
            
            removeitem(value){
                const index = this.checkList.findIndex((item)=>{
                    return item === value
                })
                this.checkList.splice(index,1)
            },
        },
    }
</script>

<style lang="less" scoped>
  .collsongsheet-container{
    display: flex;
    height: 1rem;
    margin: 0.1rem 0;
    .image{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.4rem;
      img{
        height: 1rem;
        height: 1rem;
        border-radius: 0.1rem;
      }
    }
    .check{
      flex: 20% 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .center{
      display: flex;
      flex: 1;
      flex-direction: column;
      .name{
        display: flex;
        flex: 1;
        align-items: center;
        font-size: 14px;
        color: black;
      }
      .count{
        display: flex;
        flex: 1;
        align-items: center;
      }
    }
  }
</style>