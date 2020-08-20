<template>
  <ul class="user-container">
    <li class="avatar">
      <img :src="avatarUrl" @click="$refs.avatar.click()">
      <input ref="avatar" type="file" accept="image/jpeg,image/png" @change="upload">
    </li>
    <li class="info">
      <div class="nickname">呢称:{{nickName}}</div>
      <div class="level">
        <span>Lv.{{level}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Userinfo",
        computed: {
            avatarUrl() {
                return this.$store.state.userInfo.profile.avatarUrl
            },
            nickName() {
                return this.$store.state.userInfo.profile.nickname
            },
            level() {
                return this.$store.state.userInfo.level
            },
            file() {
                return this.$refs.avatar.files[0]
            },
            //用户id
            userId() {
                return this.$store.state.userInfo.profile.userId
            },
        },
        methods: {
            //上传图像
            async upload() {
                const config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                const data = new FormData()
                data.append('imgFile', this.file)
                const imgSize = await this.getImgSize(this.file)
                const response = await this.axios.post(`/avatar/upload?imgSize=${imgSize.width}`, data, config)
                // console.log(response)
                if (response.code === 200) this.$store.dispatch('getuserDetail', this.userId)
            },
            //获取上传图片的大小
            getImgSize(file) {
                return new Promise((resolve) => {
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = function (event) {
                        let image = new Image()
                        image.src = event.target.result
                        image.onload = function () {
                            resolve({
                                width: this.width,
                                height: this.height
                            })
                        }
                    }
                })
            },
        },
    }
</script>

<style lang="less" scoped>
  .user-container {
    display: flex;
    height: 1.6rem;
    
    .avatar {
      position: relative;
      flex: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      img {
        height: 1.2rem;
        width: 1.2rem;
        border-radius: 0.6rem;
      }
      
      input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
    
    .info {
      flex: 70%;
      display: flex;
      flex-direction: column;
      
      div {
        flex: 1
      }
      
      .nickname {
        display: flex;
        align-items: center;
        color: white;
      }
      
      .level {
        display: flex;
        align-items: center;
        
        span {
          display: inline-block;
          color: white;
          background-color: #666666;
          padding: 0.05rem 0.2rem;
          border-radius: 0.2rem;
          margin-top: 5px;
        }
      }
    }
  }
</style>