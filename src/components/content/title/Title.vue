<template>
  <div class="title-container">
    <span>{{title}}</span>
    <slot>
      <div @click="$emit('btnClick')">{{btnText}}</div>
    </slot>
  </div>
</template>

<script>
    export default {
        name: "Title",
        props:{
            title:{
                type:String,
                default:'title'
            },
            btnText:{
                type:String,
                default:'text'
            },
        },
    }
</script>

<style lang="less" scoped>
.title-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  padding: 0 0.2rem;
  span{
    font-size: 14px;
    font-weight: 600;
  }
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.2rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    border: 1px solid #999999;
  }
}
</style>