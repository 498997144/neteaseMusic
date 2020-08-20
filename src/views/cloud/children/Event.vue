<template>
  <div class="event-container">
    <div class="event" v-for="(item) in eventList" :key="item.id">
      <div class="header">
        <div class="avatar">
          <img :src="item.user.avatarUrl">
        </div>
        <div class="info">
          <p>
            <span>{{item.user.nickname}}</span>
          </p>
          <p>{{item.showTime | dateFormat}}</p>
        </div>
      </div>
      <div class="body">
        <div class="content" v-html="linkFilter(item.json.msg)"></div>
        <div class="images" v-if="item.pics">
          <p v-for="image in item.pics" :key="image.originUrl">
            <img :src="image.originUrl">
          </p>
        </div>
        <div class="song" v-if="item.json.song">
          <div class="image">
            <img :src="item.json.song.album.blurPicUrl">
          </div>
          <div class="info">
            <p class="name">{{item.json.song.name}}</p>
            <p class="singer">{{item.json.song.artists[0].name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Event",
        data(){
            return {
                lastTime:-1,
                eventList:[],
            }
        },
        methods: {
            async getEvent() {
                const response = await this.axios.get(`/event?pagesize=5&lasttime=${this.lastTime}`)
                if (response.code === 200) {
                    response.event.forEach(item => {
                        item.json = JSON.parse(item.json)
                    })
                    const index =  response.event.findIndex(item => item.id === 12809628730)
                    if(index >= 0){
                        response.event.splice(index,1)
                    }
                    this.lastTime = response.lasttime
                    this.eventList = this.eventList.concat(response.event)
                    console.log(this.eventList)
                }
            },
            loadmoreData() {
                const scrollHeight = document.documentElement.scrollTop || window.pageYOffset
                const clientHeight = document.documentElement.clientHeight
                const totalHeight = document.documentElement.scrollHeight
                if ((scrollHeight + clientHeight) >= totalHeight) {
                    this.getEvent()
                }
            },
            linkFilter(str){
                str = str.replace(/#.+?#/g,function (result) {
                    return `<a style="color: blue" javascript:;>${result}</a>`
                })
                str = str.replace(/@.+?\s/g,function (result) {
                    return `<a style="color: blue" javascript:;>${result}</a>`
                })
                const reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
                str = str.replace(reg,function (result) {
                    return `<a style="color: blue" javascript:; href="${result}">网页链接</a>`
                })
                return str
            },
        },
        created() {
            this.getEvent()
        },
        updated() {
            window.addEventListener('scroll',this.loadmoreData)
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.loadmoreData)
        }
    }
</script>

<style lang="less" scoped>
  .event-container{
    background-color: white;
    .event{
      .header{
        display: flex;
        height: 0.8rem;
        .avatar{
          display: flex;
          flex: 1rem 0 0;
          justify-content: center;
          align-items: center;
          img{
            height: 0.7rem;
            width: 0.7rem;
            border-radius: 0.35rem;
          }
        }
        .info{
          display: flex;
          flex: 1;
          flex-direction:column;
          p{
            display: flex;
            flex: 1;
            align-items: center;
          }
        }
      }
      .body{
        padding-left: 1rem;
        padding-right: 0.2rem;
        .content{
          margin: 0.2rem 0;
          line-height: 0.3rem;
          color: black;
        }
        .images{
          display: flex;
          flex-wrap: wrap;
          p{
            width: 2rem;
            height: 2rem;
            overflow:hidden;
            margin-right: 0.1rem;
            margin-top: 0.1rem;
            img{
              width: 2rem;
            }
          }
        }
        .song{
          display: flex;
          background-color: #e2e2e2;
          padding: 0.1rem 0.1rem;
          margin: 0.2rem 0;
          .image{
            display: flex;
            flex:0.8rem 0 0;
            justify-content: center;
            align-items: center;
            img{
              width: 0.6rem;
              height: 0.6rem;
              border-radius: 5px;
            }
          }
          .info{
            display: flex;
            flex: 1;
            flex-direction:column;
            .singer{
              display: flex;
              flex:1;
              align-items: center;
            }
            .name{
              display: flex;
              flex: 1;
              align-items: center;
              color: black;
              font-weight: 600;
            }
            
          }
        }
      }
    }
  }
</style>