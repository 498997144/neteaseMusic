<template>
  <ul class="header-container">
    <li class="left">
      <slot name="left">
      </slot>
    </li>
    <li class="middle">
      <slot name="middle">
        <span></span>
      </slot>
    </li>
    <li class="right">
      <slot name="right">
      </slot>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="less" scoped>
.header-container{
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  width: 7.5rem;
  height: 0.9rem;
  background-color: white;
  z-index: 5;
  .middle{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left,.right{
    flex: 18% 0 0.1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>