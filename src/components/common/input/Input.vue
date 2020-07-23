<template>
  <div class="input-container">
    <input ref="input" :type="type" maxlength="20" :placeholder="placeholder" :value="value" @blur="$emit('blur')"
           @input="$emit('input',$event.target.value)">
    <p class="error">{{error}}</p>
    <div class="clear" v-if="clear && value" @click="$emit('clearClick')">X</div>
    <button @click="btnToggle" v-if="showpassword">明文</button>
    <button @click="getVerifycode" v-if="btnTitle">{{btnTitle}}</button>
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
            value: null,
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
                default: ''
            }
        },
        data() {
            return {
                flag: true,
                timer: 60,
            }
        },
        methods: {
            btnToggle(event) {
                if (this.flag) {
                    event.target.innerText = '密文'
                    this.$refs.input.type = 'text'
                    this.flag = !this.flag
                } else {
                    event.target.innerText = '明文'
                    this.$refs.input.type = 'password'
                    this.flag = !this.flag
                }
            },
            getVerifycode(event) {
                this.$emit('btnClick')
                event.target.disabled = true
                const timer = setInterval(() => {
                    event.target.innerText = this.timer
                    this.timer--
                    if (this.timer === 0) {
                        this.timer = 60
                        clearInterval(timer)
                        event.target.innerText = this.btnTitle
                        event.target.disabled = false
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
    
    input {
      width: 100%;
      height: 0.6rem;
      outline: none;
      border: 1px solid #999999;
      padding: 0 0.2rem;
    }
    
    .error {
      margin-top: 3px;
      height: 12px;
      color: black;
    }
    
    .clear {
      position: absolute;
      font-size: 0.22rem;
      right: 0.6rem;
      top: 50%;
      transform: translateY(-110%);
    }
    
    button {
      position: absolute;
      padding: 2px 5px;
      background-color: #ff281c;
      color: white;
      outline: none;
      top: 50%;
      transform: translateY(-85%);
      right: -0.2rem;
    }
  }
</style>