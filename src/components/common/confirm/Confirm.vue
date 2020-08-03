<template>
  <div class="confirm-container musk" v-show="isShow" @click.self="isShow = false">
    <div class="confirm-box">
      <div class="message">{{message}}</div>
      <div class="btn">
        <div class="no" @click="isShow = false">取消</div>
        <div class="ok" @click="ok">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Confirm",
        data(){
            return {
                isShow:false,
                message:'',
            }
        },
        methods:{
            ok(){},
        },
    }
</script>

<style lang="less" scoped>
.confirm-container{
  .confirm-box{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 5.5rem;
    background-color: white;
    border-radius:0.1rem;
    overflow: hidden;
    .message{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1rem;
    }
    .btn{
      display: flex;
      justify-content: space-around;
      div{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.6rem;
        width: 1.2rem;
        color: red;
      }
    }
  }
}
</style>