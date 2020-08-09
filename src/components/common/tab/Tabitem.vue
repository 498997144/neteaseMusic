<template>
  <div class="tab-item">
    <slot>
      <i></i>
      <span></span>
    </slot>
  </div>
</template>

<script>
    export default {
        name: "Tabitem"
    }
</script>

<style lang="less" scoped>
.tab-item{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span{
    font-size: 14px;
    color: #707070;
    &.active{
      display: flex;
      width: 60%;
      height:99%;
      align-items: center;
      justify-content: center;
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>