<template>
  <ul class="user-container">
    <li class="avatar">
      <img :src="avatarUrl">
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
        data(){
            return {
            
            }
        },
        computed:{
            avatarUrl(){
                return this.$store.state.userInfo.profile.avatarUrl
            },
            nickName(){
              return this.$store.state.userInfo.profile.nickname
            },
            level(){
                return this.$store.state.userInfo.level
            },
            
        },
        methods:{
            //获取DJ,MV,等数,歌单数量
            async getsubCount(){
                const response = await this.axios.get(`/user/subcount`)
                console.log(response)
            },
        },
        created() {
            this.getsubCount()
        },
    }
</script>

<style lang="less" scoped>
.user-container{
  display: flex;
  height:1.6rem;
  background-color: #282828;
  .avatar{
    flex: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      height: 1.2rem;
      border-radius: 0.6rem;
    }
  }
  .info{
    flex: 70%;
    display: flex;
    flex-direction: column;
    div{
      flex: 1
    }
    .nickname{
      display: flex;
      align-items: center;
      color: white;
    }
    .level{
      display: flex;
      align-items: center;
      span{
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