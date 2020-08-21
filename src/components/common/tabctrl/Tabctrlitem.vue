<template>
  <div class="tabctrlitem">
    <slot>
      <p>
        <span></span>
      </p>
    </slot>
  </div>
</template>

<script>
    export default {
        name: "Tabctrlitem"
    }
</script>

<style lang="less" scoped>
.tabctrlitem{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  p{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.9rem;
    width: 80%;
    font-size: 14px;
    &.active{
      border-bottom: 2px solid #C20C0C;
      color: red;
    }
  }
}
</style>