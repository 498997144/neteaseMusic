<template>
  <ul class="buttons-container">
    <li v-for="(item,index) in buttonList" :key="index" @click="$emit('click',index)">
      <i v-if="item.icon" :class="item.icon"></i>
      <span v-if="item.text">{{item.text}}</span>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Buttons",
        props:{
            buttonList:{
                type:Array,
                default(){
                    return []
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .buttons-container {
      display: flex;
      height: 1rem;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
</style>