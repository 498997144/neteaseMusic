<template>
  <div class="tabctrl-container">
    <slot>
      <Tabctrlitem v-for="(item,index) in tabList" :key="index"  @click.native="$router.push({name:item.path})">
        <p :class="{active:$route.name == item.path}">
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
                    return [{name:'手机登陆',path:'phone'},{name:'邮箱登陆',path:'email'},{name:'注册',path:'register'}]
                }
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