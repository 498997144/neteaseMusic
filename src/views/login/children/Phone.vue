<template>
  <div class="phone-container">
    <Input class="phone" type="tel" v-model="loginForm.phone" :error="error.phone"
           placeholder="请输入手机号码"/>
    <Input class="password" :type="ptype" :showpassword="true" v-model="loginForm.password" :error="error.password"
           placeholder="请输入密码"/>
    <div class="login" @click="login">登陆</div>
  </div>
</template>

<script>
    export default {
        name: "Phone",
        data() {
            return {
                //登陆表单
                loginForm: {
                    phone: '',
                    password: ''
                },
                //错误信息
                error: {
                    phone: '',
                    password: ''
                },
                ptype: 'password',
            }
        },
        watch: {
            //防抖1.5秒,正则验正手机号！
            'loginForm.phone'(data) {
                clearTimeout(this.ptimer)
                this.ptimer = setTimeout(() => {
                    const reg = /(13|14|15|17|18|19)[0-9]{9}/
                    if (!reg.test(data)) {
                        this.error.phone = '请输入正确的手机号码!'
                    } else {
                        this.error.phone = ''
                    }
                }, 1500)
            },
            //防抖1.5秒,检测密码是否为空！
            'loginForm.password'(data) {
                clearTimeout(this.mtimer)
                this.mtimer = setTimeout(() => {
                    if (data.length === 0) {
                        this.error.password = '不能为空!'
                    } else {
                        this.error.password = ''
                    }
                }, 1500)
            },
        },
        computed: {
            //检测手机号是否为符合规则！
            phone() {
                const reg = /(13|14|15|17|18|19)[0-9]{9}/
                return reg.test(this.loginForm.phone)
            },
            //检测密码是否符合规则！
            password() {
                return this.loginForm.password.length !== 0
            },
        },
        methods: {
            //手机号、密码符合规则发送登陆请求
            async login() {
                if (this.phone && this.password) {
                    const response = await this.axios.post('/login/cellphone', this.loginForm)
                    if (response.code === 200) {
                        localStorage.setItem('token', response.token)
                        this.$router.push('/more')
                        this.getuserDetail(response.account.id)
                    } else {
                        this.toast(response.msg)
                    }
                } else {
                    this.toast('请输入正确的手机号和密码')
                }
            },
            // 获取用户祥情信息
            async getuserDetail(id) {
                const response = await this.axios.get(`/user/detail?uid=${id}`)
                if (response.code === 200) {
                    this.$store.commit('saveUserinfo', response)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .phone-container {
    .phone, .password {
      margin: 0 auto;
      margin-top: 0.6rem;
    }
    
    /*.password {*/
    /*  margin: 0 auto;*/
    /*  margin-top: 0.4rem;*/
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