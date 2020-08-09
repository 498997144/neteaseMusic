<template>
  <div class="tabctrl-container">
    <slot>
      <Tabctrlitem v-for="(item,index) in tabList" :key="index"  @click.native="toogle(index,item.type)">
        <p :class="{active:mycurrentIndex === index}">
          <span>{{item.name}}</span>
        </p>
      </Tabctrlitem>
    </slot>
  </div>
</template>

<script>
  import Tabctrlitem from "./Tabctrlitem";
    export default {
        name: "Tabctrl",
        components:{Tabctrlitem,},
        props:{
            tabList: {
                type:Array,
                default() {
                    return [{name:'手机登陆',type:'email'},{name:'邮箱登陆',type:'email'},{name:'注册',type:'register'}]
                }
            },
            currentIndex:{
                type:Number,
                default:0,
            },
        },
       data(){
            return {
                mycurrentIndex:this.currentIndex
            }
       },
       methods:{
            toogle(index,type){
                this.mycurrentIndex = index
                this.$emit('click',index,type)
            },
       },
    }
</script>

<style lang="less" scoped>
.tabctrl-container{
  display: flex;
  height: 0.9rem;
  background-color: white;
  color: #666666;
}
</style>