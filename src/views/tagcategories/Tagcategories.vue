<template>
  <div class="tagcategories-container">
    <!--    头部区域-->
    <Header class="header">
      <i slot="left" class="ali-iconarrow-lift" @click="$router.go(-1)"></i>
      <div slot="middle" class="center">分类标签</div>
    </Header>
<!--    分类标签-->
    <div class="cate">
      <ul v-for="(item,key) in tags.categories" :key="key">
        <li>
          <div class="title">{{item}}</div>
          <ul>
            <Tag :class="[{'ali-iconhot':tag.hot},'tag']" @click="$router.push({name:'othercate',params:{tag:tag.name}})"
                 v-for="tag in tagList(key)" :key="tag.name">{{tag.name}}</Tag>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Tagcategories",
        data(){
            return {
                tags:{
                    tagList:[],
                    categories:{},
                },
            }
        },
        computed:{
            tagList(){
                return function (key) {
                    return this.tags.tagList.filter(item => item.category == key)
                }
            },
        },
        methods:{
            //分类和标签
            async getTags() {
                const response = await this.axios.get(`/playlist/catlist`)
                if(response.code === 200){
                    this.tags.tagList = response.sub
                    this.tags.categories = response.categories
                }
                // console.log(this.tags.categories)
                // console.log(this.tags.tagList)
            },
        },
        created() {
            this.getTags()
        }
    }
</script>

<style lang="less" scoped>
.tagcategories-container{
  background-color: white;
  .header {
    .center {
      font-size: 14px;
      color: black;
      font-weight: 600;
    }
  }
  .cate{
    margin-top: 0.9rem;
    padding-bottom: 0.2rem;
    ul{
      li{
        .title{
          display: flex;
          justify-content: center;
          align-items: center;
          height: 0.9rem;
          font-size: 14px;
          font-weight: 600;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          .tag{
            /*margin-left:0.64rem;*/
            margin: 0.1rem 0;
            margin-left: 0.46rem;
            &::before{
              margin-left: -0.1rem;
              color: red;
              font-size: 0.35rem;
            }
          }
          
        }
      }
    }
  }
}
</style>