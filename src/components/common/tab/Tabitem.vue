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
      color: black;
      transform: scale(1.2);
    }
  }
}
</style>