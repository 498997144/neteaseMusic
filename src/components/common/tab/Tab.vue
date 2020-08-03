<template>
  <div class="tab-container">
   <slot>
     <Tabitem v-for="(item,index) in tabList" :key="index" @click.native="$router.push({name:item.path})">
       <i v-if="item.icon" :class="item.icon"></i>
       <span :class="{active:$route.name === item.path}">{{item.name}}</span>
     </Tabitem>
   </slot>
  </div>
</template>

<script>
  import Tabitem from "./Tabitem";
    export default {
        name: "Tab",
        components:{Tabitem,},
        props:{
            tabList:{
                type:Array,
                default(){
                    return [{name:'我的',path:'my'},{name:'发现',path:'more'},{name:'云村',path:'cloud'},{name:'视频',path:'movie'}]
                }
            },
        },
    }
</script>

<style lang="less" scoped>
.tab-container{
  display: flex;
  width: 100%;
  height: 0.9rem;
}
</style>