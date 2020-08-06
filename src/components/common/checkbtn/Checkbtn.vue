<template>
  <div class="checkbtn-container">
      <input :class="{'ali-iconseleted':isChecked}"
             @change="change" :value="value" type="checkbox">
  </div>
</template>

<script>
    export default {
        name: "Checkbtn",
        props: {
            value: {
                default: '',
            },
        },
        data(){
            return {
                isChecked:false,
            }
        },
        methods: {
            change(event) {
                const {value,checked} = event.target
                if(checked){
                    this.isChecked = true
                    this.$emit('pushitem',value)
                }else {
                    this.isChecked = false
                    this.$emit('removeitem',value)
                }
            },
            reset(){
                this.isChecked = false
            },
        },
    }
</script>

<style lang="less" scoped>
    .checkbtn-container{
      width: 0.4rem;
      height: 0.4rem;
      background-color: transparent;
      border-radius: 0.2rem;
        input {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 0.4rem;
            height: 0.4rem;
            background-color: transparent;
            border-radius: 0.2rem;
            border: 2px solid #aeaeae;
            transition: all 0.2s linear;
            outline: 0;
            margin: 0;
            
            &.ali-iconseleted {
                background-color: red;
                border-color: red;
                color: white;
                font-weight: 600;
                &:before {
                    color: white;
                    font-weight: 600;
                    font-size: 0.36rem;
                    transform: translate(-1px,2px);
                }
            }
        }
    }
</style>