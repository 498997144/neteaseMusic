<template>
  <Dialog v-show="isShow" :isShow="isShow" title="新建歌单" @click.native.self="$emit('update:isShow',false)">
    <div slot="body">
      <Input placeholder="请输入歌单标题" v-model="title" class="input"/>
      <div class="setting">
        <Checkbtn v-model="type" :value="10" :isChecked.sync="isChecked"></Checkbtn>
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
    import Dialog from "../../../common/dialog/Dialog";
    import Input from "../../../common/input/Input";
    import Checkbtn from "../../../common/checkbtn/Checkbtn";
    
    export default {
        name: "Newsheet",
        components: {Dialog, Input, Checkbtn},
        props: {
            isShow: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                title: '',
                isChecked: false,
                type: [],
            }
        },
        watch: {},
        methods: {
            async createSongsheet() {
                const type = this.type.length?this.type[0]:''
                const response = await this.axios.get(`/playlist/create?name=${this.title}&privacy=${type}`)
                if (response.code === 200) {
                    this.$emit('success', response.id)
                    this.title = ''
                    this.$emit('update:isShow', false)
                } else {
                    this.toast(response.msg)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
  .input{
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