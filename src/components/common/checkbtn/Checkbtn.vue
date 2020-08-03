<template>
  <div :class="['checkbtn-container',{x:x},{y:y}]">
      <input :class="{'ali-iconseleted':isChecked}" :checked="isChecked" :value="value"
             @change="change" type="checkbox">
  </div>
</template>

<script>
    export default {
        name: "Checkbtn",
        model:{
            event:'change',
            prop:'checked',
        },
        props: {
            value: {
                default: '',
            },
            isChecked:{
                type:Boolean,
                default: false,
            },
            x:{
                type:Boolean,
                default:true
            },
            y:{
                type:Boolean,
                default:false,
            },
        },
        data() {
            return {
                checkList:[],
            }
        },
        methods: {
            change(event) {
                const {checked,value} = event.target
                // console.log(checked,value)
                if(checked){
                    this.checkList.push(value)
                    this.$emit('update:isChecked',checked)
                }else {
                    this.$emit('update:isChecked',checked)
                    const index = this.checkList.findIndex(item => item === value)
                    this.checkList.splice(index,1)
                }
                this.$emit('change',this.checkList)
            },
        },
        mounted() {
            if(this.isChecked){
                this.checkList.push(this.value)
                this.$emit('change',this.checkList)
            }
        }
    }
</script>

<style lang="less" scoped>
    .checkbtn-container{
        &.y{
            width: 0.4rem;
            display: flex;
            flex-direction: column;
        }
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