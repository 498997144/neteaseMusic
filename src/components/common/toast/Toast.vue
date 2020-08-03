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
  width: 5rem;
  min-height: 1.4rem;
  padding: 0.2rem 0.4rem;
  animation: Display 3.5s ease-in-out;
  /*background-color: rgba(0, 0, 0, 0.5);*/
  background-color: black;
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