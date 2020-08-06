<template>
  <div class="reg-container">
    <Input class="reg" type="tel" v-model="regForm.phone" @clearClick="regForm.phone = ''" :error="error.phone"
           placeholder="请输入手机号码"/>
    <Input class="password" :type="ptype" :showpassword="true" v-model="regForm.password" :error="error.password"
           @clearClick="regForm.password = ''" placeholder="请输入密码"/>
    <Input class="captcha" type="tel" v-model="regForm.captcha" btnTitle="获取验证码" @btnClick="getVerifycode"
           @clearClick="regForm.captcha = ''" :error="error.captcha" placeholder="请输入验证码"/>
    <div class="rigster" @click="rigster">注册</div>
  </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                //注册表单
                regForm: {
                    phone: '',
                    password: '',
                    captcha: '',
                    nickname: Date.now() + '哈哈红红火火'
                },
                //错误信息
                error: {
                    phone: '',
                    password: '',
                    captcha: ''
                },
                captcha: false, //验证码是否正确
                isRegister: false, //手机号是未被注册
                ptype:'password',
            }
        },
        watch: {
            //防抖1.5秒,正则验正手机号并发送请求获取手机号是否被注册！
            'regForm.phone'(data) {
                clearTimeout(this.ptimer)
                this.ptimer = setTimeout(() => {
                    const reg = /(13|14|15|17|18|19)[0-9]{9}/
                    if (!reg.test(data)) {
                        this.error.phone = '请输入正确的手机号码!'
                    } else {
                        this.existencePhone()
                    }
                }, 1500)
            },
            //防抖1.5秒,检测密码是否为空！
            'regForm.password'(data) {
                clearTimeout(this.mtimer)
                this.mtimer = setTimeout(() => {
                    if (data.length === 0) {
                        this.error.password = '不能为空!'
                    } else {
                        this.error.password = ''
                    }
                }, 1500)
            },
            //防抖1.5秒,发送请求检测验证码是否正确！
            'regForm.captcha'(data) {
                clearTimeout(this.ctimer)
                this.ctimer = setTimeout(() => {
                    if (data.length === 4) {
                        this.validate()
                    }
                }, 1500)
            },
        },
        computed: {
            //检测手机号是否为符合规则！
            phone() {
                const reg = /(13|14|15|17|18|19)[0-9]{9}/
                return reg.test(this.regForm.phone)
            },
            //检测密码是否符合规则！
            password() {
                return this.regForm.password.length !== 0
            },
        },
        methods: {
            //检测手机是否注册
            async existencePhone() {
                const response = await this.axios.get('/cellphone/existence/check', {params: {phone: this.regForm.phone}})
                if (response.exist === 1) {
                    this.error.phone = '手机号已被注册!'
                    this.isRegister = false
                } else {
                    this.error.phone = '手机号可以使用!'
                    this.isRegister = true
                }
            },
            //获取验证码
            async getVerifycode() {
                if (this.phone && this.password){
                    const response = await this.axios.get(`/captcha/sent?phone=${this.regForm.phone}`)
                    if (response.code === 200) {
                        this.error.captcha = '验证码发送成功!'
                    } else {
                        this.error.captcha = '验证码发送失败!'
                    }
                }
            },
            //校验验证码
            async validate() {
                const response = await this.axios.get(`/captcha/verify?phone=${this.regForm.phone}&captcha=${this.regForm.captcha}`)
                if (response.code === 200) {
                    this.error.captcha = '验证码正确!'
                    this.captcha = true
                } else {
                    this.error.captcha = '验证码错误!'
                    this.captcha = false
                }
            },
            //手机号、密码、验证码正确并且手机号没有被注册时发送请求，注册帐号
            async rigster() {
                if (this.phone && this.password && this.captcha && this.isRegister) {
                    const response = await this.axios.post('/register/cellphone', this.regForm);
                    console.log(response)
                    if (response.code === 200) {
                        this.$router.push({name: 'phone'})
                        this.toast('注册成功')
                    } else {
                        this.toast('注册失败')
                    }
                } else {
                    this.toast('请输入正确的手机号、密码、验证码!')
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .reg-container {
    .reg,.password,.captcha {
      margin: 0 auto;
      margin-top: 1rem;
    }
    
    /*.password {*/
    /*  margin: 0 auto;*/
    /*  margin-top: 0.2rem;*/
    /*}*/
    
    /*.captcha {*/
    /*  margin: 0 auto;*/
    /*  margin-top: 0.2rem;*/
    /*}*/
    
    .rigster {
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