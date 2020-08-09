<template>
  <div class="othercate-container">
    <!--    头部区域-->
    <Header class="header">
      <i slot="left" class="ali-iconarrow-lift" @click="$router.go(-1)"></i>
      <div slot="middle" class="center">{{tag}}</div>
    </Header>
    <!--    歌单列表-->
    <div class="songsheetlist">
      <Songsheet class="songsheetitem" v-for="(item,index) in songsheetList"
                 :songItem="item" :key="index">
      </Songsheet>
    </div>
  </div>
</template>

<script>
  import Songsheet from "../../components/content/songsheet/Songsheet";
    export default {
        name: "Othercate",
        components:{Songsheet},
        data() {
            return {
                songsheetList: [],
                total: 1,
                page: 0,
                limit: 30,
                tag: this.$route.params.tag
            }
        },
        methods: {
            async getAll(tag = this.tag, limit = this.limit, page = this.page) {
                if ((limit * page) >= this.total) return this.toast('没有更多歌单了')
                const response = await this.axios.get(`/top/playlist?limit=${limit}&offset=${limit * page}&cat=${tag}`)
                if (response.code === 200) {
                    this.songsheetList = this.songsheetList.concat(response.playlists)
                    this.page += 1
                    this.total = response.total
                    console.log(this.songsheetList)
                }
            },
            loadmoreData(){
                clearTimeout(this.loadTimer)
                this.loadTimer = setTimeout(()=>{
                    const scrollHeight = document.documentElement.scrollTop ||window.pageYOffset
                    const clientHeight = document.documentElement.clientHeight
                    const totalHeight = document.documentElement.scrollHeight
                    if ((scrollHeight + clientHeight) >= totalHeight) {
                        this.getAll()
                    }
                },500)
            }
        },
        created() {
            this.getAll()
        },
        mounted() {
            window.addEventListener('scroll',this.loadmoreData)
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.loadmoreData)
        },
    }
</script>

<style lang="less" scoped>
  .othercate-container {
    .header {
      border-bottom: 1px solid #c2c2c2;
      
      .center {
        font-size: 14px;
        color: black;
        font-weight: 600;
      }
    }
    
    .songsheetlist {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 0.2rem;
      
      .songsheetitem {
        margin-left: 0.36rem;
        margin-top: 0.2rem;
      }
    }
    
  }

</style>