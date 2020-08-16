<template>
  <Dialog v-show="isShow" :isShow="isShow" title="新建歌单" @click.native.self="$emit('update:isShow',false)">
    <div slot="body">
      <Input placeholder="请输入歌单标题" v-model.trim="title" id="input"/>
      <div class="setting">
        <Checkbtn @pushitem="pushitem" @removeitem="removeitem" :value="10"></Checkbtn>
        <span>设置为隐私歌单</span>
        <i>{{title.length}}/20</i>
      </div>
    </div>
    <div class="newbtn" slot="footer">
      <div class="no" @click="$emit('update:isShow',false)">取消</div>
      <div class="ok" @click="createSongsheet">确认</div>
    </div>
  </Dialog>
</template>

<script>
    export default {
        name: "Newsheet",
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                title: '',
                privacy:'',
            }
        },
        methods: {
            //发送新建歌单请求
            async createSongsheet() {
                if(this.title.length){
                    const response = await this.axios.get(`/playlist/create?name=${this.title}&privacy=${this.privacy}`)
                    if (response.code === 200) {
                        this.$emit('success', response.id)
                        this.title = ''
                        this.$emit('update:isShow', false)
                    } else {
                        this.toast(response.msg)
                    }
                }else {
                    this.toast('请输入歌单标题')
                }
                
            },
            //选择是否设置为隐私歌单
            pushitem(value){
                this.privacy = value
            },
            removeitem(){
                this.privacy = ''
            },
        },
    }
</script>

<style lang="less" scoped>
  #input{
    width: 80%;
  }
  .setting{
    width: 80%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 0.7rem;
    span{
      margin: 0 0.1rem;
    }
    i{
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  .newbtn {
    display: flex;
    justify-content: space-around;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0.8rem;
      width: 1.2rem;
      color: red;
    }
  }
</style>