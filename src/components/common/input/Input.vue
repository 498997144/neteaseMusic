<template>
  <div class="input-container">
    <input :type="type" maxlength="20" :placeholder="placeholder" :value="value" @blur="$emit('blur')"
           @input="$emit('input',$event.target.value)">
    <p class="error" v-if="error">{{error}}</p>
    <div :class="['ali-iconclose','clear',{active:showpassword},{code:btnTitle}]" v-show="value" @click="$emit('input','')"></div>
    <div :class="[flag?'ali-iconbrowse':'ali-iconNotvisible','pbtn']" @click="btnToggle" v-if="showpassword"></div>
    <div class="cbtn" @click="getVerifycode" v-if="btnTitle">{{btnTitle}}</div>
  </div>
</template>

<script>
    export default {
        name: "Input",
        props: {
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            },
            value: {
                default:'',
            },
            clear: {
                type: Boolean,
                default: true
            },
            error: String,
            showpassword: {
                type: Boolean,
                default: false
            },
            btnTitle: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                flag: true,
                timer: 60,
            }
        },
        methods: {
            btnToggle() {
                if (this.flag) {
                    this.type = 'text'
                    this.$emit('update:type',this.type)
                    this.flag = !this.flag
                } else {
                    this.type = 'password'
                    this.$emit('update:type',this.type)
                    this.flag = !this.flag
                }
            },
            getVerifycode(event) {
                this.$emit('btnClick')
                clearInterval(this.btimer)
                event.target.classList.toggle('disable')
                this.btimer = setInterval(() => {
                    event.target.innerText = this.timer
                    this.timer--
                    if (this.timer === 0) {
                        this.timer = 60
                        clearInterval(this.btimer)
                        event.target.innerText = this.btnTitle
                        event.target.classList.toggle('.disable')
                    }
                }, 1000)
            },
        },
    }
</script>

<style lang="less" scoped>
  .input-container {
    position: relative;
    width: 60%;
    margin: 0 auto;
    input {
      width: 100%;
      height: 0.5rem;
      outline: none;
      background-color: transparent;
      border-bottom: 1px solid #e3e3e3;
      color: black;
      text-indent: 0.2rem;
      caret-color:red;
      &::-webkit-input-placeholder{
        color: #c6c6c6;
      }
    }
    
    .error {
      position: absolute;
      left: 0;
      bottom: -0.4rem;
      display: flex;
      align-items: center;
      height: 0.4rem;
      width: 100%;
      color: #e3e3e3;
      text-indent: 0.1rem;
    }
    
    .clear {
      position: absolute;
      right: 0;
      color: #e3e3e3;
      top: 50%;
      transform: translateY(-50%);
      &.active{
        right: 0.5rem;
      }
      &.code{
        right: 1.8rem;
      }
    }
    
    .pbtn {
      position: absolute;
      color: #e3e3e3;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
    .cbtn{
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.5rem;
      width: 1.6rem;
      color: #e3e3e3;
      background-color: red;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      border-radius: 0.05rem;
      &.disable {
        pointer-events: none;
        background-color: #999999;
        color: #666666;
      }
    }
  }
</style>