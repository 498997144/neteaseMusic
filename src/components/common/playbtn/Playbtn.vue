<template>
  <div :class="['playbtn-container',{active:active}]" @click="$emit('click')"></div>
</template>

<script>
    export default {
        name: "Playbtn",
        props:{
            active:{
                type:Boolean,
                default:false,
            },
        },
    }
</script>

<style lang="less" scoped>
.playbtn-container{
    position: relative;
    width:0.5rem;
    height: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #666666;
    &.active::after{
      content: '';
      position: absolute;
      left: 0.14rem;
      top:0.14rem;
      width: 0;
      height: 0;
      display: block;
      border: 0.1rem solid red;
      transition: all 0.3s ease-in-out;
    }
    &::after{
      content: '';
      position: absolute;
      left: 0.18rem;
      top:0.08rem;
      width: 0;
      height: 0;
      display: block;
      border: 0.15rem solid transparent;
      border-left-color: red;
    }
  }
</style>