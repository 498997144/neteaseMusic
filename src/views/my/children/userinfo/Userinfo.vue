<template>
  <ul class="user-container" v-if="Object.keys(userDetail).length > 0">
    <li class="avatar">
      <img :src="userDetail.profile.avatarUrl">
    </li>
    <li class="info">
      <div class="nickname">呢称:{{userDetail.profile.nickname}}</div>
      <div class="level">
        <span>Lv.{{userDetail.level}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "Userinfo",
        data(){
            return {
                userDetail:{},
            }
        },
        computed:{
            userId(){
                return this.$store.state.userInfo.userId
            },
        },
        methods:{
            async getuserDetail() {
                const response = await this.axios.get(`/user/detail?uid=${this.userId}`)
                if(response.code === 200){
                    this.userDetail = response
                }
            },
            async getuserInfo(){
                const response = await this.axios.get(`/user/subcount`)
                console.log(response)
            },
        },
        created() {
            this.getuserDetail()
            this.getuserInfo()
        }
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
      align-items: flex-end;
      color: white;
    }
    .level{
      display: flex;
      align-items: flex-start;
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