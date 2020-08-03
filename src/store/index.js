import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        playList: [],
    },
    mutations: {
        //保存用户信息
        saveUserinfo(state, userInfo) {
            console.log('用户信息:',userInfo)
            if(userInfo === null) userInfo = {}
            state.userInfo = userInfo
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        //保存播放列表
        savePlaylist(state, playList) {
            console.log('播放列表:',playList)
            if(playList === null) playList = []
            state.playList = playList
            localStorage.setItem('playList', JSON.stringify(playList))
        },
        //清空播放列表
        clearPlaylist(state){
            state.playList = []
            localStorage.setItem('playList', JSON.stringify(state.playList))
        },
        //添加单首歌曲到播放列表
        addSong(state, song) {
            const songId = song.resourceExtInfo.songData.id
            const flag = state.playList.find((item)=>{
                const itemId = item.resourceExtInfo.songData.id
                return songId === itemId
            })
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
    },
    actions: {},
    modules: {}
})
