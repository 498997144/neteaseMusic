<template>
  <div v-show="isShow" class="toast-container">
    {{message}}
  </div>
</template>

<script>
    export default {
        name: "Toast",
        data(){
            return {
                message:'',
                isShow:false,
            }
        },
    }
</script>

<style lang="less" scoped>
.toast-container{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 4rem;
  height: 1rem;
  animation: Display 3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  color: white;
  font-size: 14px;
  z-index: 999;
}
@keyframes Display {
  from{
    opacity: 1;
  }
  to{
    opacity: 0.5;
  }
}
</style>