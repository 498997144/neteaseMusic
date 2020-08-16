import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../network'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        playList: [],
        likeList:[],
        userSongsheet:[],
    },
    mutations: {
        //保存用户信息
        saveUserinfo(state, userInfo) {
            state.userInfo = userInfo === null?{}:userInfo
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        //保存播放列表
        savePlaylist(state, playList) {
            state.playList = playList === null?[]:playList
            localStorage.setItem('playList', JSON.stringify(playList))
        },
        //清空播放列表
        clearPlaylist(state){
            state.playList = []
            localStorage.setItem('playList', JSON.stringify(state.playList))
        },
        //添加单首歌曲到播放列表
        addSong(state, song) {
            const flag = state.playList.find(item => song.id === item.id)
            if(!flag){
                state.playList.push(song)
                localStorage.setItem('playList', JSON.stringify(state.playList))
            }
        },
        //删除单首歌曲
        removeSong(state, index) {
            state.playList.splice(index,1)
            localStorage.setItem('playList', JSON.stringify(state.playList))
        },
        //从当前播放歌曲后追加至播放队列
        Additional(state,{index,songs}){
            state.playList.splice(index+1,0,...songs)
            localStorage.setItem('playList', JSON.stringify(state.playList))
        },
        //保存用户歌单
        saveusersongSheet(state,userSongsheet){
            state.userSongsheet = userSongsheet === null?[]:userSongsheet
            localStorage.setItem('userSongsheet', JSON.stringify(state.userSongsheet))
        },
        //保存喜欢歌曲
        savelikeList(state,likeList){
            state.likeList = likeList === null?[]:likeList
            localStorage.setItem('likeList', JSON.stringify(state.likeList))
        },
    },
    actions: {
        //获取用户歌单
        async getusersongSheet({commit},id){
            const response = await axios.get(`/user/playlist?uid=${id}&timestamp=${Date.now()}`)
            if(response.code === 200){
                commit('saveusersongSheet',response.playlist)
                return Promise.resolve({code:1,msg:'获取成功'})
            }else {
                return Promise.resolve({code:0,msg:response.msg})
            }
        },
        //获取喜欢歌曲id
        async getlikeList({commit},id){
            const response = await axios.get(`/likelist?uid=${id}&timestamp=${Date.now()}`)
            if(response.code === 200){
                commit('savelikeList',response.ids)
                return Promise.resolve({code:1,msg:'获取成功'})
            }else {
                return Promise.resolve({code:0,msg:response.msg})
            }
        },
    },
    // getters:{},
    // modules:{}
})
