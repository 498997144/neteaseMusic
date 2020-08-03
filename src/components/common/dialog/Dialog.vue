<template>
  <div class="dialog-container musk" v-show="isShow" @click.self="$emit('update:isShow', false)">
    <ul class="dialog-box">
      <li class="title">
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="middle">
          <slot name="middle">{{title}}</slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </li>
      <li class="body">
        <slot name="body"></slot>
      </li>
      <li class="footer">
        <slot name="footer"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "Dialog",
        props:{
            isShow:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:'title'
            },
        },
        methods:{
        },
    }
</script>

<style lang="less" scoped>
.dialog-container{
  .dialog-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 6.5rem;
    background-color: white;
    border-radius: 0.1rem;
    box-shadow: 1px 4px 5px 2px rgba(95, 89, 89, 0.76);
    .title{
      display: flex;
      height: 0.8rem;
      .left,.right{
        display: flex;
        flex: 20% 0 0;
        justify-content: center;
        align-items: center;
      }
      .middle{
        display: flex;
        flex:1;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        color: black;
      }
      
    }
  }
}
</style>