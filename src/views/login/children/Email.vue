<template>
  <div class="email-container">
    <Input class="email" type="text" v-model="loginForm.email" :error="error.email" placeholder="请输入网易邮箱帐号"/>
    <Input class="password" :type.sync="ptype" :showpassword="true" v-model="loginForm.password" :error="error.password"
           placeholder="请输入密码"/>
    <div class="login" @click="login">登陆</div>
  </div>
</template>

<script>
    import Input from "../../../components/common/input/Input";
    
    export default {
        name: "Email",
        components: {Input,},
        data() {
            return {
                //登陆表单
                loginForm: {
                    email: '',
                    password: ''
                },
                //错误信息
                error: {
                    email: '',
                    password: ''
                },
                etype: 'text',
                ptype: 'password',
            }
        },
        watch: {
            //防抖1.5秒,正则验证邮箱！
            'loginForm.email'(data) {
                clearTimeout(this.etimer)
                this.etimer = setTimeout(() => {
                    const reg = /^([a-zA-Z0-9_-])+@163(\.[a-zA-Z-9_-])+/
                    if (!reg.test(data)) {
                        this.error.email = '邮箱必须为163的邮箱!'
                    } else {
                        this.error.email = ''
                    }
                }, 1500)
            },
            //防抖1.5秒,检测密码是否为空！
            'loginForm.password'(data) {
                clearTimeout(this.ptimer)
                this.ptimer = setTimeout(() => {
                    if (data.length === 0) {
                        this.error.password = '不能为空!'
                    } else {
                        this.error.password = ''
                    }
                }, 1500)
            },
        },
        computed: {
            //检测邮箱是否为符合规则！
            email() {
                const reg = /^([a-zA-Z0-9_-])+@163(\.[a-zA-Z-9_-])+/
                return reg.test(this.loginForm.email)
            },
            //检测密码是否符合规则！
            password() {
                return this.loginForm.password.length !== 0
            },
        },
        methods: {
            //邮箱、密码符合规则发送登陆请求
            async login() {
                if (this.email && this.password) {
                    const response = await this.axios.post('/login', this.loginForm)
                    console.log(response)
                    if (response.code === 200) {
                        localStorage.setItem('token', response.token)
                        this.$store.commit('saveUserinfo', response)
                        this.$router.push('/more')
                    } else {
                        this.toast(response.msg)
                    }
                } else {
                    this.toast('请输入正确的邮箱号码和密码')
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .email-container {
    .email, .password {
      margin: 0 auto;
      margin-top: 1rem;
    }
    
    /*.password{*/
    /*  margin: 0 auto;*/
    /*  margin-top:0.2rem ;*/
    /*}*/
    
    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.1rem;
      margin: 0 auto;
      margin-top: 0.7rem;
      width: 3rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      background-color: white;
      color: red;
      font-size: 14px;
      letter-spacing: 3px;
    }
  }
</style>