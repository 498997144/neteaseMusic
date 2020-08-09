<template>
  <div class="tag-container" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "Tag"
    }
</script>

<style lang="less" scoped>
.tag-container{
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: #c6c6c6;
  border-radius:0.3rem;
  width: 1.3rem;
  height: 0.55rem;
}
</style>