// import Backtop from "../components/common/backtop/Backtop";
export const backTop = {
    data(){
        return{
            backTop:false,      //返回顶部控制
        }
    },
    components:{
        // Backtop,
    },
    methods:{
        backClick(){
            window.scroll(0,0);
        },
        windowScroll(){
            if(window.pageYOffset >= 3000) {
                this.backTop = true;
            }
            else {
                this.backTop = false;
            }
        },
    },
    mounted(){
        //  显示返回顶部按钮以及吸顶效果
        window.addEventListener("scroll",this.windowScroll);
    },
    destroyed(){
        window.removeEventListener("scroll", this.windowScroll);
    },
}


import New from "../../components/content/play/children/New";
import Newsheet from "../../components/content/play/children/Newsheet";
import Collsongsheet from "../../components/content/play/children/Collsongsheet";
export const collsongSheet = {
    
    components:{New,Newsheet,Collsongsheet},
    
    data(){
        return{
            collShow:false,  //收藏到歌单显示
            newsheetShow:false, //新建歌显示
            checkShow:false,//选择框显示控制
            checkList:[],  //选中的歌单
            checkFlag:true, //选择控制
            collOption:{
                // scrollbar: {
                //     el: '.swiper-scrollbar',
                //     // hide: true,
                // },
                direction:'vertical',
                slidesPerView:'auto',
                freeMode:true,
                mousewheel: true,
                observeParents:true,
                observer:true,
                // roundLengths: true,
            }, //滑动配置
        }
    },
    methods:{
        //发送收藏歌单请求
        async coll(sheetId){
            if(this.collsongsid.length){
                const response = await this.axios.get(`/playlist/tracks?op=add&pid=${sheetId}&tracks=${this.collsongsid.join()}&timestamp=${Date.now()}`)
                    .catch(()=>{
                        this.toast('暂不支持多选!')
                    })
                if(response.code === 200){
                    this.toast('收藏成功')
                    const status =  await this.$store.dispatch('getusersongSheet', this.userId)
                    if(!status.code){
                        this.toast(status.msg)
                    }
                }else{
                    this.toast(response.message || response.msg)
                }
                console.log(response)
            }else{
                this.toast('请选择歌曲')
            }
        },
        toogleCheck(){
            if(this.checkFlag){
                this.checkShow = true
                this.$refs.checkBtn.textContent = '完成'
                this.checkFlag = false
            }else {
                this.checkShow = false
                this.$refs.checkBtn.textContent = '多选'
                this.checkFlag = true
                this.$refs.collSheet.forEach(item => item.reset())
                if(this.checkList.length){
                    this.coll(this.checkList.join()).catch((error)=>{
                        console.log(error)
                    })
                }else {
                    this.toast('请选择歌单')
                }
                this.checkList = []
            }
        },
    
    },
    computed:{
        //用户id
        userId(){
            return this.$store.state.userInfo.profile.userId
        },
        //用户歌单
        userSongheet(){
            return this.$store.state.userSongsheet
        },
    },
}

import Song from "../../components/content/song/Song";
import Buttons from "../../components/common/buttons/Buttons";
export const slectAction = {
    components:{Song,Buttons},
    data(){
        return{
            buttonList:[
                {icon:'ali-iconplay',text:'下一首播放'},
                {icon:'ali-iconadd',text:'加入歌单'},
                {icon:'ali-icondownload',text:'下载'},
                {icon:'ali-iconashbin',text:'删除下载'},
            ],//按钮
            currentSong:0, //当前正在播放第几首歌曲
            checkSongs:[], //选中的歌曲
            checkbtnShow:false, //选择歌曲显示隐藏
        }
    },
    computed:{
        //收藏歌曲的Id
        collsongsid(){
            return this.checkSongs
        },
    },
    methods:{
        //选择歌曲
        pushitem(value){
            this.checkSongs.push(value)
        },
        removeitem(value){
            const index = this.checkSongs.findIndex((item)=>{
                return item === value
            })
            this.checkSongs.splice(index,1)
        },
        //按钮点击
        btnCliick(index){
            switch (index) {
                case 0:
                    if(this.checkSongs.length){
                        //取出选中的歌曲
                        const checkSongs = []
                        this.checkSongs.forEach((id)=>{
                            const song =  this.playList.find((item)=>{
                                return item.id == id
                            })
                            checkSongs.push(song)
                        })
                        //检查重复
                        const repeatSongs = []
                        checkSongs.forEach((item)=>{
                            const song = this.$store.state.playList.find((song)=>{
                                return item.id == song.id
                            })
                            if(song){
                                repeatSongs.push(song)
                            }
                        })
                        if(repeatSongs.length){
                            this.toast('重复歌曲')
                        }else {
                            this.$store.commit('Additional',{index:this.currentSong,songs:checkSongs})
                        }
                    }
                    break
                case 1:
                    this.checkbtnShow = false
                    this.collShow = true
                    break
            }
        },
        //播放全部
        playAll(){
            this.$store.commit('savePlaylist',this.playList)
            this.bus.$emit('toogleSong',0)
        },
        //显示选择按钮
        showCheck(){
            this.checkbtnShow = !this.checkbtnShow
            if(!this.checkbtnShow){
                this.checkSongs = []
                this.$refs.selectBtn.forEach(item => item.reset())
            }
        },
    },
    mounted() {
        //接收播放列表id改变,记录当前播放歌曲的id
        this.bus.$on('changeSong',(currentSong)=>{
            this.currentSong = currentSong
        })
    }
}

export const loadMore = {
    props:['keyword'],
    data(){
        return {
            searchResult:[],
            limit:30,
            page:0,
            total:1,
            notfountShow:false,
        }
    },
    watch:{
        keyword(keyword){
            if(!keyword) return
            this.page = 0
            this.searchResult = []
            this.total = 1
            clearTimeout(this.searchTimer)
            this.searchTimer = setTimeout(this.getsearchResult,1500)
        },
    },
    methods:{
        loadmoreData(){
            clearTimeout(this.loadTimer)
            this.loadTimer = setTimeout(()=>{
                const scrollHeight = document.documentElement.scrollTop ||window.pageYOffset
                const clientHeight = document.documentElement.clientHeight
                const totalHeight = document.documentElement.scrollHeight
                if ((scrollHeight + clientHeight) >= totalHeight) {
                    this.getsearchResult()
                }
            },500)
        },
    },
    created() {
        this.getsearchResult()
    },
    mounted() {
        window.addEventListener('scroll',this.loadmoreData)
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.loadmoreData)
    }
    
}